package com.veloritm;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.ActiveProfiles;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * Smoke test: the full application context boots under the {@code test} profile (H2),
 * and the core foundation beans are present and functional.
 */
@SpringBootTest
@ActiveProfiles("test")
class VeloritmServerApplicationTests {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Test
    void contextLoads() {
    }

    @Test
    void passwordEncoderHashesAndMatches() {
        String hash = passwordEncoder.encode("s3cret");
        assertThat(hash).isNotBlank().isNotEqualTo("s3cret");
        assertThat(passwordEncoder.matches("s3cret", hash)).isTrue();
        assertThat(passwordEncoder.matches("wrong", hash)).isFalse();
    }
}
