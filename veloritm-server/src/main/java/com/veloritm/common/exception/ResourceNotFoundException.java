package com.veloritm.common.exception;

import org.springframework.http.HttpStatus;

/** Thrown when a requested entity does not exist. Maps to HTTP 404. */
public class ResourceNotFoundException extends ApiException {

    public ResourceNotFoundException(String message) {
        super(HttpStatus.NOT_FOUND, message);
    }

    /** Convenience for the common "{Entity} with id {id} not found" message. */
    public static ResourceNotFoundException of(String entity, Object id) {
        return new ResourceNotFoundException("%s not found: %s".formatted(entity, id));
    }
}
