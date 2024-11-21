package com.example.web_application_to_support_electronics_store.controller;

import com.example.web_application_to_support_electronics_store.config.model.ApiResponse;
import com.example.web_application_to_support_electronics_store.config.model.Basket;
import com.example.web_application_to_support_electronics_store.config.model.User;
import com.example.web_application_to_support_electronics_store.config.model.UserType;
import com.example.web_application_to_support_electronics_store.service.UserService;
import jakarta.servlet.http.HttpSession;
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

    @PostMapping("/api/login")
    public ResponseEntity<ApiResponse> loginUser(@RequestBody User loginRequest, HttpSession session) {
        ApiResponse response = new ApiResponse();
        try {
            User user = userService.authenticate(loginRequest.getEmail(), loginRequest.getPassword());

            if (user != null) {
                session.setAttribute("user", user);
                response.setMessage("Login successful");
                response.setStatus(true);
                response.setUser(user);

                // Fetch active basket ID
                Basket activeBasket = user.getBaskets()
                        .stream()
                        .filter(basket -> !basket.isState())
                        .findFirst()
                        .orElse(null);

                if (activeBasket != null) {
                    response.setBasketId(activeBasket.getId());
                } else {
                    response.setBasketId(null);
                }

                return ResponseEntity.ok(response);
            } else {
                response.setMessage("Invalid email or password");
                response.setStatus(false);
                return ResponseEntity.status(401).body(response);
            }
        } catch (IllegalStateException e) {
            // Return 403 Forbidden for banned users with a custom message
            response.setMessage(e.getMessage());
            response.setStatus(false);
            return ResponseEntity.status(403).body(response);
        } catch (Exception e) {
            response.setMessage("An error occurred during login");
            response.setStatus(false);
            return ResponseEntity.status(500).body(response);
        }
    }




    @GetMapping("/api/logout")
    public ResponseEntity<ApiResponse> logoutUser(HttpSession session) {
        session.invalidate();
        ApiResponse response = new ApiResponse();
        response.setMessage("Logout successful");
        response.setStatus(true);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/api/user")
    public ResponseEntity<User> getUser(HttpSession session) {
        User user = (User) session.getAttribute("user");
        if (user != null) {
            return ResponseEntity.ok(user);
        }
        return ResponseEntity.status(401).build();
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
