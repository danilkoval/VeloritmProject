package com.veloritm.module.system;

import com.veloritm.module.system.dto.SystemStatus;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.OffsetDateTime;

/**
 * Public, unauthenticated system endpoints. Useful as a frontend/load-balancer reachability check
 * and as a smoke test of the web + security + tracing stack (distinct from actuator's deep checks).
 */
@RestController
@RequestMapping("/api/system")
@Tag(name = "System", description = "Service health and metadata")
@Slf4j
public class SystemController {

    private final String appName;
    private final String appVersion;

    public SystemController(@Value("${spring.application.name}") String appName,
                            @Value("${app.version:dev}") String appVersion) {
        this.appName = appName;
        this.appVersion = appVersion;
    }

    @GetMapping("/ping")
    @Operation(summary = "Service reachability check")
    public SystemStatus ping() {
        log.debug("System ping");
        return new SystemStatus("UP", appName, appVersion, OffsetDateTime.now());
    }
}
