package com.ecomrse.projectsw.order.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Map;
import java.util.Optional;

import com.ecomrse.projectsw.order.model.order;
import com.ecomrse.projectsw.order.service.orderService;
import com.ecomrse.projectsw.product.repository.ProductRepository;
import com.ecomrse.projectsw.product.service.ProductService;
import com.ecomrse.projectsw.security.model.User;
import com.ecomrse.projectsw.security.repository.UserRepository;

@RestController
@RequestMapping("/orders")
public class orderController {

    @Autowired
    private orderService OrderService;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private ProductService productService;

    @CrossOrigin(origins = "*")
    @GetMapping("/get-allorders")
    public ResponseEntity<List<order>> getAllOrders() {
        List<order> orders = OrderService.getAllOrders();
        return ResponseEntity.ok(orders);
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/createorder")
    public ResponseEntity<String> createOrder(@RequestBody Map<String, String> request) {
        order order = new order();
        // order.setProduct();
        order.setProduct(productRepository.getById(Long.parseLong(request.get("product_id"))));
        order.setItemPrice(Double.parseDouble(request.get("price")));
        order.setQuantity(Long.parseLong(request.get("quantity")));
        order.setTotalPrice(Double.parseDouble(request.get("total")));
        productService.updateAmount(Long.parseLong(request.get("product_id")), request.get("quantity"));
        return OrderService.createOrder(order);

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrder(@PathVariable Long id) {
        OrderService.deleteOrder(id);
        return ResponseEntity.noContent().build();
    }
}
