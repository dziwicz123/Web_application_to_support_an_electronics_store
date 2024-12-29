package com.example.web_application_to_support_electronics_store.repo;

import com.example.web_application_to_support_electronics_store.config.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    @Query("SELECT c FROM Category c WHERE c.CategoryName = :CategoryName")
    Optional<Category> findByCategoryName(@Param("CategoryName") String CategoryName);
}
