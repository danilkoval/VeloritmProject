package com.veloritm.common.web;

import com.veloritm.common.exception.ApiException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.ConstraintViolationException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.List;

/**
 * Translates exceptions into a uniform {@link ApiError} response.
 * Logging policy: client errors (4xx) are logged at WARN without a stack trace (expected, noisy),
 * server errors (5xx) at ERROR with the stack trace. Every line carries the request {@code traceId}
 * via the MDC, so a failure can be traced end-to-end.
 */
@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

    @ExceptionHandler(ApiException.class)
    public ResponseEntity<ApiError> handleApiException(ApiException ex, HttpServletRequest request) {
        HttpStatus status = ex.getStatus();
        if (status.is5xxServerError()) {
            log.error("API exception {} at {}: {}", status.value(), request.getRequestURI(), ex.getMessage(), ex);
        } else {
            log.warn("API exception {} at {}: {}", status.value(), request.getRequestURI(), ex.getMessage());
        }
        return ResponseEntity.status(status)
                .body(ApiError.of(status, ex.getMessage(), request.getRequestURI()));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiError> handleValidation(MethodArgumentNotValidException ex, HttpServletRequest request) {
        List<ApiError.FieldErrorItem> fieldErrors = ex.getBindingResult().getFieldErrors().stream()
                .map(this::toFieldError)
                .toList();
        log.warn("Validation failed at {}: {} field error(s)", request.getRequestURI(), fieldErrors.size());
        return ResponseEntity.badRequest()
                .body(ApiError.of(HttpStatus.BAD_REQUEST, "Validation failed", request.getRequestURI(), fieldErrors));
    }

    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<ApiError> handleConstraintViolation(ConstraintViolationException ex, HttpServletRequest request) {
        List<ApiError.FieldErrorItem> fieldErrors = ex.getConstraintViolations().stream()
                .map(v -> new ApiError.FieldErrorItem(v.getPropertyPath().toString(), v.getMessage()))
                .toList();
        log.warn("Constraint violation at {}: {} violation(s)", request.getRequestURI(), fieldErrors.size());
        return ResponseEntity.badRequest()
                .body(ApiError.of(HttpStatus.BAD_REQUEST, "Validation failed", request.getRequestURI(), fieldErrors));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiError> handleUnexpected(Exception ex, HttpServletRequest request) {
        log.error("Unhandled exception at {}: {}", request.getRequestURI(), ex.getMessage(), ex);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ApiError.of(HttpStatus.INTERNAL_SERVER_ERROR, "Internal server error", request.getRequestURI()));
    }

    private ApiError.FieldErrorItem toFieldError(FieldError fieldError) {
        String message = fieldError.getDefaultMessage() != null ? fieldError.getDefaultMessage() : "invalid";
        return new ApiError.FieldErrorItem(fieldError.getField(), message);
    }
}
