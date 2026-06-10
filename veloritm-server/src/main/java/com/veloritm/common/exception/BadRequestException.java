package com.veloritm.common.exception;

import org.springframework.http.HttpStatus;

/** Thrown when the request is semantically invalid beyond field validation. Maps to HTTP 400. */
public class BadRequestException extends ApiException {

    public BadRequestException(String message) {
        super(HttpStatus.BAD_REQUEST, message);
    }
}
