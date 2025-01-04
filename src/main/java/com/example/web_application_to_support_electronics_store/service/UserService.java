package com.example.web_application_to_support_electronics_store.service;

import com.example.web_application_to_support_electronics_store.config.model.Basket;
import com.example.web_application_to_support_electronics_store.config.model.User;
import com.example.web_application_to_support_electronics_store.config.model.UserType;
import com.example.web_application_to_support_electronics_store.repo.BasketRepository;
import com.example.web_application_to_support_electronics_store.repo.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
@Transactional
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final BasketRepository basketRepository;

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, BasketRepository basketRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.basketRepository = basketRepository;
    }

    public User createUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setUserType(UserType.USER);
        User savedUser = userRepository.save(user);

        // Create and save a basket for the new user
        Basket basket = new Basket();
        basket.setUser(savedUser);
        basket.setState(false);
        basket.setTotalPrice(0.0f);
        basketRepository.save(basket);

        return savedUser;
    }

    public User authenticate(String email, String password) {
        User user = userRepository.findByEmail(email);
        if (user != null) {
            if (user.isBan()) {
                throw new IllegalStateException("User is banned.");
            }
            if (passwordEncoder.matches(password, user.getPassword())) {
                // Fetch active basket
                Basket activeBasket = user.getBaskets()
                        .stream()
                        .filter(basket -> !basket.isState())
                        .findFirst()
                        .orElse(null);

                if (activeBasket != null) {
                    user.setBaskets(Collections.singletonList(activeBasket));
                }

                return user;
            }
        }
        return null;
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User banUser(Long id) {
        User user = userRepository.findById(id).orElseThrow(() -> new UsernameNotFoundException("User not found"));
        user.setBan(true);
        return userRepository.save(user);
    }

}
