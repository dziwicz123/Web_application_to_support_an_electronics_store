package com.example.web_application_to_support_electronics_store.controller;

import com.example.web_application_to_support_electronics_store.DTO.CategoryProductsDTO;
import com.example.web_application_to_support_electronics_store.DTO.ProductDTO;
import com.example.web_application_to_support_electronics_store.config.model.Category;
import com.example.web_application_to_support_electronics_store.config.model.Product;
import com.example.web_application_to_support_electronics_store.service.CategoryService;
import com.example.web_application_to_support_electronics_store.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/categories")
public class CategoryController {

    private static final Logger LOGGER = Logger.getLogger(CategoryController.class.getName());

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private ProductService productService;

    @GetMapping("/{categoryId}/products")
    public CategoryProductsDTO getProductsByCategory(@PathVariable Long categoryId) {
        try {
            // Fetch category
            Category category = categoryService.getCategoryById(categoryId);
            if (category == null) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Kategoria nie istnieje.");
            }

            // Fetch products
            List<Product> products = productService.getProductsByCategory(categoryId);

            // Convert Product to ProductDTO
            List<ProductDTO> productDTOs = products.stream()
                    .map(product -> new ProductDTO(
                            product.getId(),
                            product.getProductName(),
                            productService.calculateAverageRating(product),
                            product.getPrice(),
                            product.getImage(),
                            product.getCutPrice(),
                            product.getComments() != null ? product.getComments().size() : 0,
                            category.getCategoryName(),
                            product.getDescription()
                    ))
                    .toList();

            // Build and return CategoryProductsDTO
            CategoryProductsDTO dto = new CategoryProductsDTO();
            dto.setCategoryName(category.getCategoryName());
            dto.setProducts(productDTOs);
            return dto;
        } catch (Exception e) {
            LOGGER.log(Level.SEVERE, "Error fetching products for category ID: " + categoryId, e);
            throw e;
        }
    }


    @GetMapping
    public List<Category> getAllCategories() {
        return categoryService.getAllCategories();
    }
}
