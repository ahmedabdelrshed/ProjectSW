package com.ecomrse.projectsw.security.service;

import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.DESedeKeySpec;
import javax.crypto.spec.IvParameterSpec;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ecomrse.projectsw.security.model.AuthenticationResponse;
import com.ecomrse.projectsw.security.model.Role;
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
        // Decrypt the username before saving it
        String decryptedUsername = null;
        try {
            decryptedUsername = decryptData(request.getUsername());
        } catch (Exception e) {
            // Handle decryption exception
            e.printStackTrace();
            return new AuthenticationResponse("Error decrypting username");
        }

        // Check if the decrypted username already exists
        if (repository.findByUsername(decryptedUsername).isPresent()) {
            return new AuthenticationResponse("User already exists");
        }

        // For validation Data of the user
        String regex = "[a-z][a-zA-z0-9]+@gmail.com";
        Pattern pattern = Pattern.compile(regex);
        Matcher matcherEmail = pattern.matcher(decryptedUsername);
        if (!matcherEmail.matches()) {
            return new AuthenticationResponse("Please Enter a valid Email Address");
        }
        if (request.getPassword().length() < 8) {
            return new AuthenticationResponse("Password Must be at Least 8 Character");
        }
        String regexn = "[a-zA-z]+";
        Pattern patternn = Pattern.compile(regexn);
        Matcher matcherfirstName = patternn.matcher(request.getFirstName());
        Matcher matcherlastName = patternn.matcher(request.getLastName());
        if ((!matcherfirstName.matches()) || (!matcherlastName.matches())) {
            return new AuthenticationResponse("Please Enter a valid Name");
        }

        User user = new User();
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setUsername(decryptedUsername); // Save decrypted username
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(request.getRole());
        user = repository.save(user);
        return new AuthenticationResponse("Regstiartion Succefully");
    }

    public AuthenticationResponse authenticate(User request) {
        String encryptedUsername = request.getUsername();
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(

                        encryptedUsername,
                        request.getPassword()));

        User user = repository.findByUsername(request.getUsername()).orElseThrow();
        String jwt = jwtService.generateToken(user);

        return new AuthenticationResponse(jwt);

    }

    public List<User> getUsersByRole(Role role) throws Exception {
        List<User> result = new ArrayList<User>();
        repository.findByRole(role).forEach(user -> {
            try {
                // Encrypt the category's name and description
                String encryptedName = encryptData(user.getUsername());
                String encryptedSName = encryptData(user.getFirstName());
                String encryptedLName = encryptData(user.getLastName());
                int id = user.getId();
                // Update the categorie object with encrypted data
                user.setUsername(encryptedName);
                user.setFirstName(encryptedSName);
                user.setLastName(encryptedLName);
                user.setId(id);

                // Add the updated categorie to the result list
                result.add(user);
            } catch (Exception e) {
                e.printStackTrace();
                // Handle encryption error, you can skip this category or log the error
            }
        });
        return result;
    }

    private static final String key = "ramzyashrafsaifashraf123";
    private static final String iv = "qwerqwer";

    public String decryptData(String encryptedData) throws Exception {
        byte[] keyBytes = key.getBytes(StandardCharsets.UTF_8);
        byte[] ivBytes = iv.getBytes(StandardCharsets.UTF_8);

        DESedeKeySpec keySpec = new DESedeKeySpec(keyBytes);
        SecretKeyFactory factory = SecretKeyFactory.getInstance("DESede");
        SecretKey secretKey = factory.generateSecret(keySpec);
        Cipher cipher = Cipher.getInstance("DESede/CBC/PKCS5Padding");
        cipher.init(Cipher.DECRYPT_MODE, secretKey, new IvParameterSpec(ivBytes));
        byte[] decryptedData = cipher.doFinal(Base64.getDecoder().decode(encryptedData));
        return new String(decryptedData);
    }

    public String encryptData(String name) throws Exception {
        byte[] keyBytes = key.getBytes(StandardCharsets.UTF_8);
        byte[] ivBytes = iv.getBytes(StandardCharsets.UTF_8);

        DESedeKeySpec keySpec = new DESedeKeySpec(keyBytes);
        SecretKeyFactory factory = SecretKeyFactory.getInstance("DESede");
        SecretKey secretKey = factory.generateSecret(keySpec);
        Cipher cipher = Cipher.getInstance("DESede/CBC/PKCS5Padding");
        cipher.init(Cipher.ENCRYPT_MODE, secretKey, new IvParameterSpec(ivBytes));
        byte[] encryptedData = cipher.doFinal(name.getBytes());
        return Base64.getEncoder().encodeToString(encryptedData);
    }
}
