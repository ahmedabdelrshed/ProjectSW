package com.ecomrse.projectsw.security.service;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ecomrse.projectsw.security.model.AuthenticationResponse;
import com.ecomrse.projectsw.security.model.User;
import com.ecomrse.projectsw.security.repository.UserRepository;

@Service
public class AuthenticationService {

    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    private final AuthenticationManager authenticationManager;

    public AuthenticationService(UserRepository repository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService,
            AuthenticationManager authenticationManager) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }

    public AuthenticationResponse register(User request) {

        // check if user already exist. if exist than authenticate the user
        if (repository.findByUsername(request.getUsername()).isPresent()) {
            return new AuthenticationResponse("User already exist");
        }
        // For validation Data of the user
        // validateEmail(request.getUsername());
        validatePassword(request.getPassword());
        validateName(request.getFirstName());
        validateName(request.getLastName());
        User user = new User();
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        user.setRole(request.getRole());

        user = repository.save(user);

        String jwt = jwtService.generateToken(user);
        System.out.println(jwt);

        return new AuthenticationResponse(jwt);

    }

    public void validateEmail(String username){
        String regex = "[a-z][a-zA-z0-9]+@(gmail | yahoo) .com";
        Pattern pattern = Pattern.compile(regex);
        Matcher matcherEmail = pattern.matcher(username);
        if (!matcherEmail.matches()) {
            throw new IllegalStateException("Please Enter a valid Email Address");
        }
    }
    public void validatePassword(String password){
        if (password.length() < 8) {
            throw new IllegalStateException("Password Must be at Least 8 Character");
        }
    }
    public void validateName(String name){
        String regex = "[a-zA-z]+";
        Pattern pattern = Pattern.compile(regex);
        Matcher matcherName = pattern.matcher(name);
        if (!matcherName.matches()) {
            throw new IllegalStateException("Please Enter a valid Name");
        }
    }

    public AuthenticationResponse authenticate(User request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()));

        User user = repository.findByUsername(request.getUsername()).orElseThrow();
        String jwt = jwtService.generateToken(user);

        return new AuthenticationResponse(jwt);

    }
}
