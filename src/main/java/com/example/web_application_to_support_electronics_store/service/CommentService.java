package com.example.web_application_to_support_electronics_store.service;

import com.example.web_application_to_support_electronics_store.config.model.Comment;
import com.example.web_application_to_support_electronics_store.DTO.CommentDTO;
import com.example.web_application_to_support_electronics_store.config.model.Product;
import com.example.web_application_to_support_electronics_store.repo.CommentRepository;
import com.example.web_application_to_support_electronics_store.repo.ProductRepository;
import com.example.web_application_to_support_electronics_store.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    public List<CommentDTO> getCommentsByProductId(Long productId) {
        List<Comment> comments = commentRepository.findByProductId(productId);

        return comments.stream().map(comment -> {
            CommentDTO dto = new CommentDTO();
            dto.setId(comment.getId());
            dto.setRating(comment.getRating());
            dto.setDescription(comment.getDescription());
            dto.setUsername(comment.getUser().getName());
            dto.setProductName(comment.getProduct().getProductName());
            dto.setProductImage(comment.getProduct().getImage());
            dto.setProductId(comment.getProduct().getId()); // Set productId
            return dto;
        }).collect(Collectors.toList());
    }

    public List<CommentDTO> getCommentsByUserEmail(String userEmail) {
        List<Comment> comments = commentRepository.findByUserEmail(userEmail);

        return comments.stream()
                .map(comment -> {
                    CommentDTO dto = new CommentDTO();
                    dto.setId(comment.getId());
                    dto.setRating(comment.getRating());
                    dto.setDescription(comment.getDescription());

                    // Ustawiamy wszystkie potrzebne pola
                    dto.setProductId(comment.getProduct().getId());
                    dto.setProductName(comment.getProduct().getProductName());

                    // Ustawiamy ścieżkę do obrazu produktu
                    dto.setProductImage(comment.getProduct().getImage());

                    // Jeśli chcesz też ustawiać username, możesz to zrobić tak:
                    dto.setUsername(comment.getUser().getName());

                    return dto;
                })
                .collect(Collectors.toList());
    }

    private void recalcProductRating(Long productId) {
        // Pobierz wszystkie komentarze danego produktu
        List<Comment> comments = commentRepository.findByProductId(productId);

        // Oblicz średnią ocen
        if (comments.isEmpty()) {
            // Jeśli nie ma komentarzy, rating = 0
            Optional<Product> productOpt = productRepository.findById(productId);
            productOpt.ifPresent(prod -> {
                prod.setRating(0f);
                productRepository.save(prod);
            });
        } else {
            float sum = 0f;
            for (Comment c : comments) {
                sum += c.getRating();
            }
            float avg = sum / comments.size();

            // Zaktualizuj pole rating w encji Product
            Optional<Product> productOpt = productRepository.findById(productId);
            if (productOpt.isPresent()) {
                Product product = productOpt.get();
                product.setRating(avg);
                productRepository.save(product);
            }
        }
    }

    public void updateProductRatingAfterComment(Long productId) {
        recalcProductRating(productId);
    }
}