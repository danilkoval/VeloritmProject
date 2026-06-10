package com.veloritm.common.exception;

import org.springframework.http.HttpStatus;

/**
 * Base type for all domain/business exceptions that map to a specific HTTP status.
 * Handled centrally by {@code GlobalExceptionHandler}, which turns it into an {@code ApiError}.
 */
public abstract class ApiException extends RuntimeException {

    private final transient HttpStatus status;

    protected ApiException(HttpStatus status, String message) {
        super(message);
        this.status = status;
    }

    public HttpStatus getStatus() {
        return status;
    }
}
