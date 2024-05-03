package com.ecomrse.projectsw.product.controller;

import com.ecomrse.projectsw.categorie.module.Categorie;
import com.ecomrse.projectsw.categorie.repo.CategorieRepo;
import com.ecomrse.projectsw.categorie.service.CategorieService;
import com.ecomrse.projectsw.product.model.Product;
import com.ecomrse.projectsw.product.repository.ProductRepository;
import com.ecomrse.projectsw.product.service.ProductService;
import com.ecomrse.projectsw.product.service.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;

import java.util.Map;

@RestController
@RequestMapping("/products")
public class ProductController {

    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private ProductService productService;
    @Autowired
    private CategorieRepo categorieRepo;
    @CrossOrigin(origins = "*")
    @GetMapping("/get")
    public List<Product> getAllProducts() {
        return productService.getproducts();
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/manage/create_product")
    public ResponseEntity<String> createProduct(
            @RequestParam("name") String name,
            @RequestParam("price") Double price,
            @RequestParam("amount") int amount,
            @RequestParam("categorie") long categorie,
            @RequestParam("description") String description,
            @RequestParam("file") MultipartFile file) {
        try {
            byte[] imageData = file.getBytes();
            Product product = new Product();
            product.setName(name);
            product.setPrice(price);
            product.setDescription(description);
            product.setImage(imageData);
            product.setAmount(amount);
            product.setCategory(categorieRepo.getById(categorie));
            return productService.addproduct(product);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @CrossOrigin(origins = "*")
    @PutMapping("/manage/{id}/update")
    public ResponseEntity<String> updateProduct(@PathVariable Long id,
    @RequestParam("name") String name,
    @RequestParam("price") Double price,
    @RequestParam("amount") int amount,
    @RequestParam("categorie") long categorie,
    @RequestParam("description") String description,
    @RequestParam("file") MultipartFile file) {
try {
    byte[] imageData = file.getBytes();
    Product product = new Product();
    product.setName(name);
    product.setPrice(price);
    product.setId(id);
    product.setDescription(description);
    product.setImage(imageData);
    product.setAmount(amount);
    product.setCategory(categorieRepo.getById(categorie));
        return productService.updateProduct(product);
    }
 catch (IOException e) {
    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
}
}

    @CrossOrigin(origins = "*")
    @DeleteMapping("/manage/{id}/delete")
    public Map<String, Boolean> deleteProduct(@PathVariable(value = "id") Long productId) {
        productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + productId));

        productService.deleteproduct(productId);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }
    
    @CrossOrigin(origins = "*")
    @GetMapping("/count")
    public int count() {
        return productService.countUserUsers();
    }

    
}
