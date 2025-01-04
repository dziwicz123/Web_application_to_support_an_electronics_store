package com.example.web_application_to_support_electronics_store.controller;

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
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/add")
    public ResponseEntity<?> createBasket(@RequestBody Map<String, Object> payload) {
        // Odczytaj userId z ciała żądania
        if (!payload.containsKey("userId")) {
            return ResponseEntity.badRequest().body("userId is required");
        }
        Number userIdNumber = (Number) payload.get("userId");
        Long userId = userIdNumber.longValue();

        // Znajdź użytkownika
        Optional<User> userOpt = userRepository.findById(userId);
        if (!userOpt.isPresent()) {
            return ResponseEntity.status(404).body("User not found");
        }
        User user = userOpt.get();

        // Stwórz nowy koszyk
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
