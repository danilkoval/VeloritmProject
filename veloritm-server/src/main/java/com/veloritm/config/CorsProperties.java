package com.veloritm.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

import java.util.List;

/**
 * CORS configuration, bound from {@code app.cors.*}.
 *
 * @param allowedOrigins exact origins allowed to call the API (the Next.js client). Credentials are
 *                       enabled for the refresh-token cookie, so wildcard origins are not permitted.
 */
@ConfigurationProperties(prefix = "app.cors")
public record CorsProperties(List<String> allowedOrigins) {

    public CorsProperties {
        if (allowedOrigins == null || allowedOrigins.isEmpty()) {
            allowedOrigins = List.of("http://localhost:3000");
        }
    }
}
