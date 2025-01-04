package com.example.web_application_to_support_electronics_store.config.model;

public class ApiResponse {
    private String message;
    private boolean status;
    private Long basketId;
    private String token;

    // Getters and Setters
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public boolean isStatus() { return status; }
    public void setStatus(boolean status) { this.status = status; }

    public Long getBasketId() { return basketId; }
    public void setBasketId(Long basketId) { this.basketId = basketId; }

    public String getToken() {
        return token;
    }
    public void setToken(String token) {
        this.token = token;
    }
}
