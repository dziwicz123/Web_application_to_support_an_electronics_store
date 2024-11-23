package com.example.web_application_to_support_electronics_store.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors().and()
                .csrf().disable()
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers(
                                "/login",
                                "/register",
                                "/api/register",
                                "/api/login",
                                "/api/categories",
                                "/api/categories/**",
                                "/api/products",
                                "/api/products/**",
                                "/api/products/search",
                                "/api/basket",
                                "/api/basket/user/**",
                                "/api/basket/addProduct",
                                "/api/basket/add",
                                "/api/order",
                                "/api/order/**",
                                "/api/order/update/**",
                                "/api/users",
                                "/api/users/**",
                                "/api/payment",
                                "/api/payment/**",
                                "/api/shop",
                                "/api/shop/**",
                                "/api/comments",
                                "/api/comments/**"
                        ).permitAll()
                        .anyRequest().authenticated()
                )
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.ALWAYS)
                        .invalidSessionUrl("/login")
                );

        return http.build();
    }
}
