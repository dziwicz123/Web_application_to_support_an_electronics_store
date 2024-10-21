package com.example.web_application_to_support_electronics_store.repo;

import org.springframework.stereotype.Repository;
import com.example.web_application_to_support_electronics_store.config.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface CommentRepository  extends JpaRepository<Comment, Long>{
}
