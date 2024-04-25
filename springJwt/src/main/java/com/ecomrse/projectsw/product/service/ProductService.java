package com.ecomrse.projectsw.product.service;

import com.ecomrse.projectsw.categorie.module.Categorie;
import com.ecomrse.projectsw.product.model.Product;
import com.ecomrse.projectsw.product.repository.ProductRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
@Service
public class ProductService {
    private ProductRepository productRepository ;
    public List<Product> getproducts() {
        List<Product> result = new ArrayList<>();
        productRepository.findAll().forEach(result::add);
        return result;
    }
    public ResponseEntity<String> addproduct(Product product) {
        // for validation
        if (product.getName() == null) {
            throw new IllegalStateException("Name of the product cannot by Empty");
        }
        if (product.getDescription() == null) {
            throw new IllegalStateException("Description of the product cannot by Empty");
        }
        if (product.getPrice() <= 0) {
            throw new IllegalStateException("the price cant be less than or equal to zero");
        }
        if (product.getPrice() == null) {
            throw new IllegalStateException("price of the product cannot by Empty");
        }
        if (product.getImageName() == null) {
            throw new IllegalStateException("the image of the product cannot by Empty");
        }

        productRepository.save(product);
        return ResponseEntity.ok("product saved successfully");
    }
    public ResponseEntity<String> updateProduct(Product product) {
        // for validation
        if (product.getName() == null) {
            throw new IllegalStateException("Name of the product cannot by Empty");
        }
        if (product.getDescription() == null) {
            throw new IllegalStateException("Description of the product cannot by Empty");
        }
        if (product.getPrice() == null) {
            throw new IllegalStateException("price of the product cannot by Empty");
        }
        if (product.getPrice() <=0) {
            throw new IllegalStateException("the price cant be less than or equal to zero");
        }
        if (product.getImageName() == null) {
            throw new IllegalStateException("the image of the product cannot by Empty");
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

}
