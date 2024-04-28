package com.ecomrse.projectsw.categorie.service;

import java.util.List;

import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.DESedeKeySpec;
import javax.crypto.spec.IvParameterSpec;

import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Base64;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.ecomrse.projectsw.categorie.module.Categorie;
import com.ecomrse.projectsw.categorie.repo.CategorieRepo;

@Service
public class CategorieService {
    @Autowired
    private CategorieRepo categorieRepo;

    public List<Categorie> getCategories() {
        List<Categorie> result = new ArrayList<Categorie>();
        categorieRepo.findAll().forEach(categorie -> {
            try {
                // Encrypt the category's name and description
                String encryptedName = encryptData(categorie.getName());
                String encryptedDescription = encryptData(categorie.getDescription());

                // Update the categorie object with encrypted data
                categorie.setName(encryptedName);
                categorie.setDescription(encryptedDescription);

                // Add the updated categorie to the result list
                result.add(categorie);
            } catch (Exception e) {
                e.printStackTrace();
                // Handle encryption error, you can skip this category or log the error
            }
        });
        return result;
    }

    // Add Categorie

    public ResponseEntity<String> addCategorie(Categorie categorie) {
        // for validation
        if (categorie.getName() == null) {
            return ResponseEntity.badRequest().body("Name of the Categorie cannot be empty");
        }
        if (categorie.getDescription() == null) {
            return ResponseEntity.badRequest().body("Description of the Categorie cannot be empty");
        }
        if (categorieRepo.findByName(categorie.getName()).isPresent()) {
            return ResponseEntity.badRequest().body("Name of the Categorie Already Exist");
        }

        try {
            // Decrypt the encrypted data
            String decryptedName = decryptData(categorie.getName());
            String decryptedDescription = decryptData(categorie.getDescription());

            // Update the categorie object with decrypted data
            categorie.setName(decryptedName);
            categorie.setDescription(decryptedDescription);
            if (categorieRepo.findByName(categorie.getName()).isPresent()) {
                return ResponseEntity.badRequest().body("Name of the Categorie Already Exist");
            }
            // Save the categorie
            categorieRepo.save(categorie);

            return ResponseEntity.ok("Categorie saved successfully");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to save Categorie");
        }
    }

    // update Categorie
    public ResponseEntity<String> updateCategorie(Categorie categorie) {
        // for validation
        if (categorie.getName() == null) {
            throw new IllegalStateException("Name of the Categorie cannot by Empty");
        }
        if (categorie.getDescription() == null) {
            throw new IllegalStateException("Description of the Categorie cannot by Empty");
        }
        categorieRepo.save(categorie);
        return ResponseEntity.ok("Categorie Updated successfully");
    }

    public ResponseEntity<String> deleteCategorie(long id) {
        categorieRepo.deleteById(id);
        return ResponseEntity.ok("Categorie Deleted successfully");
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
