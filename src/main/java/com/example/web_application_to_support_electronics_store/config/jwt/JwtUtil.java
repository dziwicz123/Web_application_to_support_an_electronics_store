package com.example.web_application_to_support_electronics_store.config.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.example.web_application_to_support_electronics_store.config.model.User;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtUtil {

    // Nie może być 'static'
    @Value("${jwt.secret}")
    private String secretKey;

    // Przykładowa ważność 1 godzina
    private static final long EXPIRATION_TIME = 3600_000; // ms (1 godzina)

    public String generateToken(User user) {
        // Tutaj 'secretKey' jest już wstrzyknięty przez Spring,
        // o ile klasa jest 'Component' i nie jest static.
        return JWT.create()
                .withSubject(user.getEmail())
                .withClaim("userType", user.getUserType().name())
                .withClaim("userId", user.getId())
                .withClaim("name", user.getName())
                .withExpiresAt(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .sign(Algorithm.HMAC256(secretKey));
    }

    // (Opcjonalnie) metody do validateToken, getSubject, itp.
}
