package com.example.web_application_to_support_electronics_store.repo;

import com.example.web_application_to_support_electronics_store.model.Basket;
import com.example.web_application_to_support_electronics_store.model.OrderDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderDetailsRepository extends JpaRepository<OrderDetails, Long> {
    OrderDetails findByBasket(Basket basket);
}
