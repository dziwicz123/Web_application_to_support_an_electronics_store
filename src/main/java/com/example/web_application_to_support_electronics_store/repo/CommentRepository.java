package com.example.web_application_to_support_electronics_store.repo;

import com.example.web_application_to_support_electronics_store.config.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByProductId(Long productId);
    List<Comment> findByUserId(Long userId);
    List<Comment> findByUserEmail(String email);
}