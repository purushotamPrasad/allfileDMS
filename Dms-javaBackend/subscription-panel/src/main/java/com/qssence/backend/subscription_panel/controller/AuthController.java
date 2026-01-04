package com.qssence.backend.subscription_panel.controller;

import com.qssence.backend.subscription_panel.dto.request.LoginRequest;
import com.qssence.backend.subscription_panel.dto.response.LoginResponse;
import com.qssence.backend.subscription_panel.jwt.JwtUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v2/auth")
public class AuthController {

    private final JwtUtil jwtUtil;

    public AuthController(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        // Hardcoded credentials
        final String hardcodedEmail = "admin@example.com";
        final String hardcodedPassword = "admin123";
        final String hardcodedRole = "admin";

        if (hardcodedEmail.equals(loginRequest.getEmail()) &&
                hardcodedPassword.equals(loginRequest.getPassword())) {

            // Generate access and refresh tokens
            String accessToken = jwtUtil.generateToken(hardcodedEmail, hardcodedRole);
            String refreshToken = jwtUtil.generateRefreshToken(hardcodedEmail);

            return ResponseEntity.ok(Map.of(
                    "accessToken", accessToken,
                    "refreshToken", refreshToken,
                    "accessTokenExpiresAt", jwtUtil.getAccessTokenExpiration(),
                    "refreshTokenExpiresAt", jwtUtil.getRefreshTokenExpiration()
            ));
        } else {
            return ResponseEntity.status(401).body("Invalid email or password");
        }
    }

    @PostMapping("/refresh")
    public ResponseEntity<?> refreshToken(@RequestBody Map<String, String> request) {
        String refreshToken = request.get("refreshToken");

        if (jwtUtil.validateToken(refreshToken)) {
            String username = jwtUtil.getUsernameFromToken(refreshToken);
            String newAccessToken = jwtUtil.generateToken(username, "admin"); // Replace with dynamic role if available

            return ResponseEntity.ok(Map.of(
                    "accessToken", newAccessToken,
                    "accessTokenExpiresAt", jwtUtil.getAccessTokenExpiration()
            ));
        } else {
            return ResponseEntity.status(403).body("Invalid refresh token");
        }
    }
}
