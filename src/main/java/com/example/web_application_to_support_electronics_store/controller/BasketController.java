package com.example.web_application_to_support_electronics_store.controller;

import com.example.web_application_to_support_electronics_store.config.jwt.JwtUtil;
import com.example.web_application_to_support_electronics_store.config.model.Basket;
import com.example.web_application_to_support_electronics_store.config.model.User;
import com.example.web_application_to_support_electronics_store.repo.BasketRepository;
import com.example.web_application_to_support_electronics_store.repo.ProductRepository;
import com.example.web_application_to_support_electronics_store.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/basket")
public class BasketController {

    @Autowired
    private BasketRepository basketRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/add")
    public ResponseEntity<?> createBasket(@RequestHeader("Authorization") String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(401).body("Unauthorized");
        }

        String token = authHeader.substring(7); // Usuń "Bearer "
        if (!jwtUtil.validateToken(token)) {
            return ResponseEntity.status(401).body("Invalid token");
        }

        String email = jwtUtil.getSubject(token);
        User user = userRepository.findByEmail(email);
        if (user == null) {
            return ResponseEntity.status(404).body("User not found");
        }

        // Sprawdź, czy istnieje otwarty koszyk
        Basket existingBasket = basketRepository.findByUserAndState(user, false);
        if (existingBasket != null) {
            return ResponseEntity.ok(existingBasket);
        }

        // Utwórz nowy koszyk
        Basket basket = new Basket();
        basket.setUser(user);
        basket.setState(false);
        basket.setTotalPrice(0.0f);
        basketRepository.save(basket);

        return ResponseEntity.ok(basket);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<Basket> getUserNewBasket(@PathVariable Long userId) {
        Optional<User> userOptional = userRepository.findById(userId);
        if (!userOptional.isPresent()) {
            return ResponseEntity.status(404).body(null);
        }

        User user = userOptional.get();
        Basket newBasket = basketRepository.findByUserAndState(user, false);

        if (newBasket == null) {
            return ResponseEntity.status(404).body(null);
        }

        return ResponseEntity.ok(newBasket);
    }


}
