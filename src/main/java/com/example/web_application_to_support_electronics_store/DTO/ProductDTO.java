package com.example.web_application_to_support_electronics_store.DTO;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ProductDTO {
    private Long id;
    private String productName;
    private float rating;
    private float price;
    private String image;
    private Float cutPrice;
    private int reviewCount;
    private String categoryName;
    private String description; // Add this line

    // Update constructors to include description
    public ProductDTO(Long id, String productName, float rating, float price, String image, Float cutPrice, int reviewCount, String categoryName, String description) {
        this.id = id;
        this.productName = productName;
        this.rating = rating;
        this.price = price;
        this.image = image;
        this.cutPrice = cutPrice;
        this.reviewCount = reviewCount;
        this.categoryName = categoryName;
        this.description = description; // Add this line
    }
}
