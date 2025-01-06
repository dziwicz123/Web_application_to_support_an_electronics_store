package com.example.web_application_to_support_electronics_store.config.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.auth0.jwt.interfaces.JWTVerifier;
import com.example.web_application_to_support_electronics_store.config.model.User;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtUtil {

    @Value("${jwt.secret}")
    private String secretKey;

    // Przykładowa ważność tokenu - 1 godzina
    private static final long EXPIRATION_TIME = 3600_000; // ms (1 godzina)

    // Generowanie tokena JWT
    public String generateToken(User user) {
        return JWT.create()
                .withSubject(user.getEmail()) // `sub` w tokenie to email użytkownika
                .withClaim("userType", user.getUserType().name())
                .withClaim("userId", user.getId())
                .withClaim("name", user.getName())
                .withExpiresAt(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .sign(Algorithm.HMAC256(secretKey));
    }

    // Weryfikacja tokena JWT
    public boolean validateToken(String token) {
        try {
            getVerifier().verify(token);
            return true;
        } catch (JWTVerificationException e) {
            return false; // Token jest nieprawidłowy lub wygasł
        }
    }

    // Pobieranie `sub` (email) z tokena
    public String getSubject(String token) {
        DecodedJWT decodedJWT = getVerifier().verify(token);
        return decodedJWT.getSubject();
    }

    // Pobieranie innych pól (np. userId)
    public Long getUserId(String token) {
        DecodedJWT decodedJWT = getVerifier().verify(token);
        return decodedJWT.getClaim("userId").asLong();
    }

    // Konfiguracja weryfikatora JWT
    private JWTVerifier getVerifier() {
        return JWT.require(Algorithm.HMAC256(secretKey)).build();
    }
}
