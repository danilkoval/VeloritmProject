package com.veloritm.module.system.dto;

import java.time.OffsetDateTime;

/**
 * Lightweight application status returned by the public ping endpoint.
 *
 * @param status  always {@code "UP"} when the application is serving requests
 * @param name    application name
 * @param version application version
 * @param time    server time (UTC offset) at the moment of the response
 */
public record SystemStatus(String status, String name, String version, OffsetDateTime time) {
}
