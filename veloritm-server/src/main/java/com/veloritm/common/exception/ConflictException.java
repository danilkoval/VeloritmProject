package com.veloritm.common.exception;

import org.springframework.http.HttpStatus;

/**
 * Thrown when a request conflicts with current state — e.g. duplicate email on registration,
 * or losing the race for the last item in stock. Maps to HTTP 409.
 */
public class ConflictException extends ApiException {

    public ConflictException(String message) {
        super(HttpStatus.CONFLICT, message);
    }
}
