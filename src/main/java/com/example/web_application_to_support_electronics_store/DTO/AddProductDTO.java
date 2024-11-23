package com.example.web_application_to_support_electronics_store.DTO;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class AddProductDTO {
    private String productName;
    private String description;
    private String image;
    private float price;
    private Long categoryId; // Ensure it's not null

    public boolean isValid() {
        return productName != null && !productName.isEmpty()
                && description != null && !description.isEmpty()
                && image != null && !image.isEmpty()
                && price > 0
                && categoryId != null;
    }
}
