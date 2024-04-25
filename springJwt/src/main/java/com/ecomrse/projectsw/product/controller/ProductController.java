package com.ecomrse.projectsw.product.controller;

import com.ecomrse.projectsw.product.model.Product;
import com.ecomrse.projectsw.product.repository.ProductRepository;
import com.ecomrse.projectsw.product.service.ProductService;
import com.ecomrse.projectsw.product.service.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductRepository productRepository;
    private ProductService productService;

    @GetMapping
    public List<Product> getAllProducts() {
        return productService.getproducts();
    }

    @PostMapping("/create_product")
    public ResponseEntity<String> createProduct(@RequestBody Product product) {
        return productService.addproduct(product);
    }

    @PutMapping("/{id}/delete")
    public ResponseEntity<String> updateProduct(@PathVariable(value = "id") Long productId,
            @RequestBody Product productDetails) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + productId));

        product.setName(productDetails.getName());
        return productService.updateProduct(product);
    }

    @DeleteMapping("/{id}/update")
    public Map<String, Boolean> deleteProduct(@PathVariable(value = "id") Long productId) {
        productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + productId));

        productService.deleteproduct(productId);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }

    @GetMapping("/get_using_categorie")
    public List<Product> getAllProductsCategorie() {
        return productService.getproducts();
    }
}
