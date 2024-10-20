package com.example.web_application_to_support_electronics_store.repo;

import com.example.web_application_to_support_electronics_store.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    public User findByEmail(String email);
}
