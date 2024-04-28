package com.ecomrse.projectsw.security.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.ecomrse.projectsw.security.model.AuthenticationResponse;
import com.ecomrse.projectsw.security.model.Role;
import com.ecomrse.projectsw.security.model.User;
import com.ecomrse.projectsw.security.service.AuthenticationService;

@RestController
public class AuthenticationController {

    private final AuthenticationService authService;
    
    public AuthenticationController(AuthenticationService authService) {
        this.authService = authService;
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody User request
            ) {
        return ResponseEntity.ok(authService.register(request));
    }
    @CrossOrigin(origins = "*")
    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login(
            @RequestBody User request
    ) {
        return ResponseEntity.ok(authService.authenticate(request));
    }
    @CrossOrigin(origins = "*")
    @GetMapping("/{role}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<List<User>> getUsersByRole(@PathVariable Role role) throws Exception {
        List<User> users = authService.getUsersByRole(role);
        if (users.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(users, HttpStatus.OK);
    }
}
