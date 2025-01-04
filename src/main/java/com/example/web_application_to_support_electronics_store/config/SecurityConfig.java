package com.example.web_application_to_support_electronics_store.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    // Haszowanie haseł - BCrypt
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // Główna konfiguracja Spring Security
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                // Włącza CORS i wyłącza CSRF (jeśli nie używasz tokenów CSRF)
                .cors().and()
                .csrf().disable()

                // Konfiguracja, które requesty są dozwolone bez autentykacji
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers(
                                "/login",
                                "/register",
                                "/api/register",
                                "/api/login",
                                "/api/categories",
                                "/api/categories/**",
                                "/api/products",
                                "/api/products/admin",
                                "/api/products/admin/**",
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

                        .requestMatchers(HttpMethod.PUT, "/api/products/**").permitAll()
                        .requestMatchers(HttpMethod.DELETE, "/api/products/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/products/**").permitAll()

                        // Każde inne żądanie wymaga autentykacji
                        .anyRequest().authenticated()
                )

                // Ustawianie zasad sesji
                // Jeśli używasz sesji do przechowywania zalogowanego usera:
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.ALWAYS)
                        .invalidSessionUrl("/login")
                );
        return http.build();
    }
}
