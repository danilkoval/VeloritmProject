package com.veloritm.web;

import com.veloritm.common.exception.ConflictException;
import com.veloritm.common.exception.ResourceNotFoundException;
import com.veloritm.common.web.TraceIdFilter;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.WebApplicationContext;

import static org.hamcrest.Matchers.is;
import static org.hamcrest.Matchers.notNullValue;
import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
 * Verifies {@code GlobalExceptionHandler} maps domain exceptions and validation failures to the
 * uniform {@code ApiError} shape (status, error, message, path, traceId, fieldErrors). A test-only
 * controller (imported, not component-scanned in production) exercises each branch.
 */
@SpringBootTest
@ActiveProfiles("test")
@Import(GlobalExceptionHandlerTest.ThrowingController.class)
@WithMockUser
class GlobalExceptionHandlerTest {

    @Autowired
    private WebApplicationContext context;

    @Autowired
    private TraceIdFilter traceIdFilter;

    private MockMvc mockMvc;

    @BeforeEach
    void setUp() {
        // Apply springSecurity() so the real SecurityFilterChain runs and @WithMockUser is honoured,
        // and register TraceIdFilter so responses carry the correlation id (webAppContextSetup does
        // not auto-register the application's servlet filter beans).
        mockMvc = MockMvcBuilders.webAppContextSetup(context)
                .addFilters(traceIdFilter)
                .apply(springSecurity())
                .build();
    }

    @Test
    void resourceNotFoundMapsTo404() throws Exception {
        mockMvc.perform(get("/api/_it/not-found"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.status", is(404)))
                .andExpect(jsonPath("$.error", is("Not Found")))
                .andExpect(jsonPath("$.message", is("Product not found: 42")))
                .andExpect(jsonPath("$.path", is("/api/_it/not-found")))
                .andExpect(jsonPath("$.traceId", notNullValue()));
    }

    @Test
    void conflictMapsTo409() throws Exception {
        mockMvc.perform(get("/api/_it/conflict"))
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.status", is(409)))
                .andExpect(jsonPath("$.error", is("Conflict")))
                .andExpect(jsonPath("$.message", is("Out of stock")));
    }

    @Test
    void invalidBodyMapsTo400WithFieldErrors() throws Exception {
        mockMvc.perform(post("/api/_it/validate")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"name\":\"\"}"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.status", is(400)))
                .andExpect(jsonPath("$.message", is("Validation failed")))
                .andExpect(jsonPath("$.fieldErrors[0].field", is("name")))
                .andExpect(jsonPath("$.fieldErrors[0].message", notNullValue()));
    }

    @Test
    void unexpectedExceptionMapsTo500() throws Exception {
        mockMvc.perform(get("/api/_it/boom"))
                .andExpect(status().isInternalServerError())
                .andExpect(jsonPath("$.status", is(500)))
                .andExpect(jsonPath("$.message", is("Internal server error")))
                .andExpect(jsonPath("$.traceId", notNullValue()));
    }

    @RestController
    @RequestMapping("/api/_it")
    static class ThrowingController {

        @GetMapping("/not-found")
        void notFound() {
            throw ResourceNotFoundException.of("Product", 42);
        }

        @GetMapping("/conflict")
        void conflict() {
            throw new ConflictException("Out of stock");
        }

        @PostMapping("/validate")
        void validate(@Valid @RequestBody Payload payload) {
            // reached only when valid
        }

        @GetMapping("/boom")
        void boom() {
            throw new IllegalStateException("kaboom");
        }

        record Payload(@NotBlank String name) {
        }
    }
}
