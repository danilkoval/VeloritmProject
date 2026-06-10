package com.veloritm.web;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpHeaders;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.Matchers.is;
import static org.hamcrest.Matchers.notNullValue;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
 * Verifies the web/security/tracing foundation against the real {@code SecurityConfig}:
 * public endpoints are open, protected ones return a uniform JSON 401, and every response
 * carries a correlation id.
 */
@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class WebFoundationTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void pingIsPublicAndReportsUp() throws Exception {
        mockMvc.perform(get("/api/system/ping"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status", is("UP")))
                .andExpect(jsonPath("$.name", is("veloritm-server")))
                .andExpect(jsonPath("$.version", notNullValue()))
                .andExpect(jsonPath("$.time", notNullValue()))
                .andExpect(header().exists("X-Trace-Id"));
    }

    @Test
    void traceIdFromClientIsEchoedBack() throws Exception {
        String clientTraceId = "test-trace-123";
        mockMvc.perform(get("/api/system/ping").header("X-Trace-Id", clientTraceId))
                .andExpect(status().isOk())
                .andExpect(header().string("X-Trace-Id", clientTraceId));
    }

    @Test
    void generatedTraceIdIsPresentWhenClientOmitsIt() throws Exception {
        mockMvc.perform(get("/api/system/ping"))
                .andExpect(header().string("X-Trace-Id", notNullValue()));
    }

    @Test
    void openApiDocsArePublic() throws Exception {
        mockMvc.perform(get("/v3/api-docs"))
                .andExpect(status().isOk());
    }

    @Test
    void protectedEndpointReturnsJsonUnauthorized() throws Exception {
        mockMvc.perform(get("/api/secured/anything"))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.status", is(401)))
                .andExpect(jsonPath("$.error", is("Unauthorized")))
                .andExpect(jsonPath("$.message", is("Authentication required")))
                .andExpect(jsonPath("$.path", is("/api/secured/anything")))
                .andExpect(jsonPath("$.traceId", notNullValue()))
                .andExpect(header().exists(HttpHeaders.CONTENT_TYPE));
    }
}
