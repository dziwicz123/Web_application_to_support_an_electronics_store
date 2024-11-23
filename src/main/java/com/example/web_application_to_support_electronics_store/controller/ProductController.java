package com.example.web_application_to_support_electronics_store.controller;

import com.example.web_application_to_support_electronics_store.DTO.AddProductDTO;
import com.example.web_application_to_support_electronics_store.DTO.ProductDTO;
import com.example.web_application_to_support_electronics_store.config.model.Product;
import com.example.web_application_to_support_electronics_store.service.CategoryService;
import com.example.web_application_to_support_electronics_store.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    @Autowired
    private CategoryService categoryService;

    @GetMapping("/search")
    public List<Product> searchProducts(@RequestParam String query) {
        return productService.searchProducts(query);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id) {
        Product product = productService.getProductById(id);
        return ResponseEntity.ok(product);
    }

    @GetMapping
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    @PostMapping("/add")
    public ResponseEntity<?> addProduct(@RequestBody AddProductDTO productDTO) {
        if (!productDTO.isValid()) {
            return ResponseEntity.badRequest().body("All fields are required and price must be greater than 0.");
        }

        try {
            // Create the Product object without explicitly setting the ID
            Product product = Product.builder()
                    .productName(productDTO.getProductName())
                    .description(productDTO.getDescription())
                    .image(productDTO.getImage())
                    .price(productDTO.getPrice())
                    .category(categoryService.getCategoryById(productDTO.getCategoryId()))
                    .build();

            // Save product; the database auto-generates the ID
            Product savedProduct = productService.addProduct(product);

            return ResponseEntity.ok(savedProduct);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Failed to add product: " + e.getMessage());
        }
    }



    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/dto")
    public List<ProductDTO> getAllProductDTOs() {
        return productService.getAllProductDTOs();
    }

    @GetMapping("/{id}/dto")
    public ResponseEntity<ProductDTO> getProductDTOById(@PathVariable Long id) {
        Product product = productService.getProductById(id);
        String categoryName = product.getCategory() != null ? product.getCategory().getCategoryName() : "Brak kategorii";

        ProductDTO productDTO = new ProductDTO(
                product.getId(),
                product.getProductName(),
                productService.calculateAverageRating(product),
                product.getPrice(),
                product.getImage(),
                product.getCutPrice(),
                product.getComments() != null ? product.getComments().size() : 0, // Liczenie komentarzy
                categoryName,
                product.getDescription()
        );

        return ResponseEntity.ok(productDTO);
    }
}
