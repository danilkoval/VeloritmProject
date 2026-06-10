package com.veloritm.common.web;

import org.slf4j.MDC;
import org.springframework.http.HttpStatus;

import java.time.OffsetDateTime;
import java.util.List;

/**
 * Uniform error payload returned by the API for every failure (4xx/5xx).
 * The {@code traceId} mirrors the {@code X-Trace-Id} response header so a user can quote it to support
 * and we can find the exact request in the logs.
 */
public record ApiError(
        OffsetDateTime timestamp,
        int status,
        String error,
        String message,
        String path,
        String traceId,
        List<FieldErrorItem> fieldErrors
) {

    /** A single field-level validation failure. */
    public record FieldErrorItem(String field, String message) {
    }

    public static ApiError of(HttpStatus status, String message, String path) {
        return of(status, message, path, null);
    }

    public static ApiError of(HttpStatus status, String message, String path, List<FieldErrorItem> fieldErrors) {
        return new ApiError(
                OffsetDateTime.now(),
                status.value(),
                status.getReasonPhrase(),
                message,
                path,
                MDC.get(TraceIdFilter.TRACE_ID),
                fieldErrors
        );
    }
}
