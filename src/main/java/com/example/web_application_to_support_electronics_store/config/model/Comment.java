package com.example.web_application_to_support_electronics_store.config.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "comment")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "comment_id")
    private Long id;

    @Column(columnDefinition = "TEXT")
    private String description;

    @ManyToOne
    @JoinColumn(name = "product_id")
    @JsonIgnoreProperties("comments")
    private Product product;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnoreProperties("comments")
    private User user;
}
