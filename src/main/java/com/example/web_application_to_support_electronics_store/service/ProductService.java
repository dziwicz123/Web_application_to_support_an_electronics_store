package com.example.web_application_to_support_electronics_store.service;

import com.example.web_application_to_support_electronics_store.DTO.ProductDTO;
import com.example.web_application_to_support_electronics_store.config.model.Comment;
import com.example.web_application_to_support_electronics_store.config.model.Product;
import com.example.web_application_to_support_electronics_store.repo.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public List<Product> getProductsByCategory(Long categoryId) {
        return productRepository.findByCategoryId(categoryId);
    }

    public List<Product> searchProducts(String query) {
        return productRepository.findByProductNameContainingIgnoreCase(query);
    }

    public Product getProductById(Long id) {
        return productRepository.findById(id).orElseThrow(() -> new RuntimeException("Product not found"));
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product addProduct(Product product) {
        return productRepository.save(product);
    }

    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }

    public List<ProductDTO> getAllProductDTOs() {
        List<Product> products = getAllProducts();
        return products.stream()
                .map(product -> {
                    int reviewCount = product.getComments() != null ? product.getComments().size() : 0;
                    float averageRating = calculateAverageRating(product);
                    String categoryName = product.getCategory() != null ? product.getCategory().getCategoryName() : "Brak kategorii";

                    return new ProductDTO(
                            product.getId(),
                            product.getProductName(),
                            averageRating, // Dynamically calculated rating
                            product.getPrice(),
                            product.getImage(),
                            product.getCutPrice(),
                            reviewCount,
                            categoryName,
                            product.getDescription()
                    );
                })
                .collect(Collectors.toList());
    }

    public float calculateAverageRating(Product product) {
        if (product.getComments() == null || product.getComments().isEmpty()) {
            return 0.0f; // No reviews, default to 0.0 rating
        }

        float sum = 0.0f;
        for (Comment comment : product.getComments()) {
            sum += comment.getRating(); // Access the rating field directly
        }

        return sum / product.getComments().size(); // Calculate average
    }

    public Long getMaxProductId() {
        return productRepository.findMaxId().orElse(0L);
    }

}
