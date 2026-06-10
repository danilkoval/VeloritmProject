package com.veloritm.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * OpenAPI/Swagger metadata. Declares a {@code bearerAuth} (JWT) scheme so protected endpoints can be
 * exercised from the Swagger UI once authentication lands in M1.
 */
@Configuration
public class OpenApiConfig {

    public static final String BEARER_SCHEME = "bearerAuth";

    @Bean
    public OpenAPI veloServerOpenAPI(@Value("${app.version:dev}") String appVersion) {
        return new OpenAPI()
                .info(new Info()
                        .title("VeloServer API")
                        .description("REST API for the VeloServer bicycle shop (veloritm).")
                        .version(appVersion)
                        .contact(new Contact().name("Veloritm").email("veloritm@gmail.com"))
                        .license(new License().name("Proprietary")))
                .components(new Components()
                        .addSecuritySchemes(BEARER_SCHEME, new SecurityScheme()
                                .type(SecurityScheme.Type.HTTP)
                                .scheme("bearer")
                                .bearerFormat("JWT")));
    }
}
