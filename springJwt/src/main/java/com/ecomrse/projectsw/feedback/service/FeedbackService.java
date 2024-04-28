package com.ecomrse.projectsw.feedback.service;

import com.ecomrse.projectsw.categorie.module.Categorie;
import com.ecomrse.projectsw.feedback.model.Feedback;
import com.ecomrse.projectsw.feedback.repository.FeedbackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import org.springframework.http.ResponseEntity;

import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Optional;

import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.DESedeKeySpec;
import javax.crypto.spec.IvParameterSpec;

@Service
public class FeedbackService {
    @Autowired
    private FeedbackRepository feedbackRepository;
    
    public List<Feedback> getFeedbacks() throws Exception {
        List<Feedback> result = new ArrayList<Feedback>();
        feedbackRepository.findAll().forEach(feedback -> {
            try {
                // Encrypt the category's name and description
                String encryptedName = encryptData(feedback.getText());
                int raterange = feedback.getRaterange();
                // Update the categorie object with encrypted data
                feedback.setText(encryptedName);
                feedback.setRaterange(raterange);
                
                // Add the updated categorie to the result list
                result.add(feedback);
            } catch (Exception e) {
                e.printStackTrace();
                // Handle encryption error, you can skip this category or log the error
            }
        });
        return result;
    }
    public ResponseEntity<String> addFeedback(Feedback feedback) {
        // Decrypt the feedback text before saving
        String decryptedText = null;
        try {
            decryptedText = decryptData(feedback.getText());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Error decrypting feedback");
        }

        // Set the decrypted feedback text
        feedback.setText(decryptedText);

        // Save the feedback
        feedbackRepository.save(feedback);
        return ResponseEntity.ok("Feedback saved successfully");
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
