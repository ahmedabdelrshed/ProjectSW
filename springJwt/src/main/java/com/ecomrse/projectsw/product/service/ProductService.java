package com.ecomrse.projectsw.product.service;

import com.ecomrse.projectsw.product.model.Product;
import com.ecomrse.projectsw.product.repository.ProductRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;

    public List<Product> getproducts() {
        List<Product> result = new ArrayList<>();
        productRepository.findAll().forEach(result::add);
        return result;
    }

    public ResponseEntity<String> addproduct(Product product) {
        // for validation
        if (product.getName() == null) {
            return ResponseEntity.badRequest().body("Name of the product cannot by Empty");
        }
        if (product.getDescription() == null) {
            return ResponseEntity.badRequest().body("Description of the product cannot by Empty");
        }
        if (product.getPrice() <= 0) {
            return ResponseEntity.badRequest().body("the price cant be less than or equal to zero");
        }
        if (product.getPrice() == null) {
            return ResponseEntity.badRequest().body("price of the product cannot by Empty");
        }

        productRepository.save(product);
        return ResponseEntity.ok("product saved successfully");
    }

    public ResponseEntity<String> updateProduct(Product product) {
        // for validation
        if (product.getName() == null) {
            return ResponseEntity.badRequest().body("Name of the product cannot by Empty");
        }
        if (product.getDescription() == null) {
            return ResponseEntity.badRequest().body("Description of the product cannot by Empty");
        }
        if (product.getPrice() == null) {
            return ResponseEntity.badRequest().body("price of the product cannot by Empty");
        }
        if (product.getPrice() <= 0) {
            return ResponseEntity.badRequest().body("the price cant be less than or equal to zero");
        }

        productRepository.save(product);
        return ResponseEntity.ok("product Updated successfully");
    }

    public ResponseEntity<String> deleteproduct(long id) {
        productRepository.deleteById(id);
        return ResponseEntity.ok("product Deleted successfully");
    }

    public List<Product> getProductsCategorie() {
        List<Product> result = new ArrayList<>();
        productRepository.findAll().forEach(result::add);
        return result;
    }

    public void updateAmount(long id, String amount) {
        Product product = new Product();
        product = productRepository.getById(id);
        int newAmount = product.getAmount() - Integer.parseInt(amount);
        product.setAmount(newAmount);
        productRepository.save(product);
    }

}
