package com.example.web_application_to_support_electronics_store.repo;

import com.example.web_application_to_support_electronics_store.config.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    public User findByEmail(String email);
}
