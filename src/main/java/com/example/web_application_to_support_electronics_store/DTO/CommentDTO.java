package com.example.web_application_to_support_electronics_store.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CommentDTO {
    private Long id;
    private int rating;
    private String description;
    private String username;
    private String productName;
    private String productImage;
    private Long productId;
}
