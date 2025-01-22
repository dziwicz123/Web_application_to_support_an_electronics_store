package com.example.web_application_to_support_electronics_store.controller;

import com.example.web_application_to_support_electronics_store.config.jwt.JwtUtil;
import com.example.web_application_to_support_electronics_store.config.model.Comment;
import com.example.web_application_to_support_electronics_store.config.model.Product;
import com.example.web_application_to_support_electronics_store.config.model.User;
import com.example.web_application_to_support_electronics_store.repo.CommentRepository;
import com.example.web_application_to_support_electronics_store.repo.ProductRepository;
import com.example.web_application_to_support_electronics_store.repo.UserRepository;
import com.example.web_application_to_support_electronics_store.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.web_application_to_support_electronics_store.DTO.CommentDTO;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/comments")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping
    public ResponseEntity<?> addComment(
            @RequestHeader(name = "Authorization", required = false) String authHeader,
            @RequestBody Map<String, Object> payload
    ) {
        try {
            // 1. Sprawdź, czy mamy nagłówek i czy zaczyna się od "Bearer "
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                return ResponseEntity.status(401).body("Missing or invalid Authorization header");
            }

            // 2. Wyciągamy token i weryfikujemy
            String token = authHeader.substring(7); // "Bearer ".length() = 7
            if (!jwtUtil.validateToken(token)) {
                return ResponseEntity.status(401).body("Invalid or expired token");
            }

            // 3. Odczytujemy email (sub) z tokena i wyszukujemy usera w bazie
            String userEmail = jwtUtil.getSubject(token);
            User user = userRepository.findByEmail(userEmail);
            if (user == null) {
                return ResponseEntity.status(404).body("User not found");
            }

            // 4. Odczyt parametrów z payload (ale już nie userId!)
            Long productId = Long.valueOf(payload.get("productId").toString());
            int rating = Integer.parseInt(payload.get("rating").toString());
            String description = payload.get("description").toString();

            // 5. Walidacja productId
            Optional<Product> productOpt = productRepository.findById(productId);
            if (!productOpt.isPresent()) {
                return ResponseEntity.status(404).body("Produkt o podanym ID nie istnieje");
            }
            Product product = productOpt.get();

            // 6. Zbuduj obiekt komentarza
            Comment comment = new Comment();
            comment.setProduct(product);
            comment.setUser(user);
            comment.setRating(rating);
            comment.setDescription(description);

            // 7. Zapis w repo
            commentRepository.save(comment);

            return ResponseEntity.ok("Komentarz został dodany");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Błąd podczas dodawania komentarza");
        }
    }


    @GetMapping("/product/{productId}")
    public ResponseEntity<List<CommentDTO>> getCommentsByProductId(@PathVariable Long productId) {
        List<CommentDTO> comments = commentService.getCommentsByProductId(productId);
        return ResponseEntity.ok(comments);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateComment(
            @RequestHeader(name = "Authorization", required = false) String authHeader,
            @PathVariable Long id,
            @RequestBody CommentDTO commentDTO
    ) {
        try {
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                return ResponseEntity.status(401).body("Missing or invalid Authorization header");
            }
            String token = authHeader.substring(7);
            if (!jwtUtil.validateToken(token)) {
                return ResponseEntity.status(401).body("Invalid or expired token");
            }
            String userEmail = jwtUtil.getSubject(token);
            User user = userRepository.findByEmail(userEmail);
            if (user == null) {
                return ResponseEntity.status(404).body("User not found");
            }

            // 1. Znajdź istniejący komentarz
            Optional<Comment> existingComment = commentRepository.findById(id);
            if (!existingComment.isPresent()) {
                return ResponseEntity.status(404).body("Komentarz nie istnieje");
            }
            Comment comment = existingComment.get();

            // 2. Sprawdź, czy autorem komentarza jest aktualnie zalogowany user
            if (!comment.getUser().getId().equals(user.getId())) {
                return ResponseEntity.status(403).body("Nie masz uprawnień do edycji tego komentarza");
            }

            // 3. Zaktualizuj pola
            comment.setRating(commentDTO.getRating());
            comment.setDescription(commentDTO.getDescription());
            commentRepository.save(comment);

            return ResponseEntity.ok("Komentarz został zaktualizowany");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Błąd podczas edycji komentarza");
        }
    }

    @GetMapping("/user/{userEmail}")
    public ResponseEntity<List<CommentDTO>> getCommentsByUserEmail(@PathVariable String userEmail) {
        List<CommentDTO> comments = commentService.getCommentsByUserEmail(userEmail);
        return ResponseEntity.ok(comments);
    }
}