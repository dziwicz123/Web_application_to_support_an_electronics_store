package com.example.web_application_to_support_electronics_store.repo;

import com.example.web_application_to_support_electronics_store.config.model.Address;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AddressRepository extends JpaRepository<Address, Long> {
}
