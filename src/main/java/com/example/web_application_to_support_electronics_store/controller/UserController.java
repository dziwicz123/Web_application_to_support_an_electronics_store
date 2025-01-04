package com.example.web_application_to_support_electronics_store.controller;

import com.example.web_application_to_support_electronics_store.config.jwt.JwtUtil;
import com.example.web_application_to_support_electronics_store.config.model.ApiResponse;
import com.example.web_application_to_support_electronics_store.config.model.Basket;
import com.example.web_application_to_support_electronics_store.config.model.User;
import com.example.web_application_to_support_electronics_store.config.model.UserType;
import com.example.web_application_to_support_electronics_store.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;


    @GetMapping("/api")
    public ApiResponse homeController() {
        ApiResponse res = new ApiResponse();
        res.setMessage("Welcome to API");
        res.setStatus(true);
        return res;
    }

    @PostMapping("/api/register")
    public ResponseEntity<User> registerUser(@RequestBody User user) {
        User savedUser = userService.createUser(user);
        return ResponseEntity.ok(savedUser);
    }

    /**
     * Logowanie JWT (bez zapisywania usera w sesji).
     */
    @PostMapping("/api/login")
    public ResponseEntity<ApiResponse> loginUser(@RequestBody User loginRequest) {
        ApiResponse response = new ApiResponse();
        try {
            User user = userService.authenticate(loginRequest.getEmail(), loginRequest.getPassword());

            if (user != null) {
                // Generujemy token
                String token = jwtUtil.generateToken(user);

                response.setMessage("Login successful");
                response.setStatus(true);
                response.setToken(token);

                Basket activeBasket = user.getBaskets()
                        .stream()
                        .filter(basket -> !basket.isState())
                        .findFirst()
                        .orElse(null);
                if (activeBasket != null) {
                    response.setBasketId(activeBasket.getId());
                }

                return ResponseEntity.ok(response);

            } else {
                response.setMessage("Invalid email or password");
                response.setStatus(false);
                return ResponseEntity.status(401).body(response);
            }

        } catch (IllegalStateException e) {
            // Banned user
            response.setMessage(e.getMessage());
            response.setStatus(false);
            return ResponseEntity.status(403).body(response);
        } catch (Exception e) {
            response.setMessage("An error occurred during login");
            response.setStatus(false);
            return ResponseEntity.status(500).body(response);
        }
    }

    /**
     * Jeśli chcesz używać JWT, to /api/logout zazwyczaj
     * jest niepotrzebne w stylu "unieważnij sesję".
     * Możesz po prostu usunąć ten endpoint
     * lub ewentualnie utrzymywać listę zablokowanych tokenów.
     */
    @GetMapping("/api/logout")
    public ResponseEntity<ApiResponse> logoutUser() {
        ApiResponse response = new ApiResponse();
        response.setMessage("No real logout in stateless JWT.");
        response.setStatus(true);
        return ResponseEntity.ok(response);
    }

    /**
     * Przykładowy endpoint, który kiedyś pobierał usera z sesji.
     * Teraz, w stylu JWT, powinieneś pobierać usera z tokenu (SecurityContext)
     * w filtrze/konfiguracji Spring Security, np. z principal.
     */
    @GetMapping("/api/user")
    public ResponseEntity<String> getUser() {
        return ResponseEntity.ok("In JWT flow, you'd decode the token to get user info.");
    }

    @GetMapping("/api/users")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers()
                .stream()
                .filter(user -> user.getUserType() != UserType.ADMIN) // Filtrujemy administratorów
                .collect(Collectors.toList());
        return ResponseEntity.ok(users);
    }

    @PutMapping("/api/users/{id}/ban")
    public ResponseEntity<User> banUser(@PathVariable Long id) {
        User user = userService.banUser(id);
        return ResponseEntity.ok(user);
    }
}
