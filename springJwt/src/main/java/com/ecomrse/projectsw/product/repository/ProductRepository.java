package com.ecomrse.projectsw.product.repository;

import com.ecomrse.projectsw.product.model.Product;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
    // Optional<Product> findByCategory(String name);
    
}
