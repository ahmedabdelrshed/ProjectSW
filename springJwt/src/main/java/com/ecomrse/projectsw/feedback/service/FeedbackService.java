package com.ecomrse.projectsw.feedback.service;

import com.ecomrse.projectsw.feedback.model.Feedback;
import com.ecomrse.projectsw.feedback.repository.FeedbackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import org.springframework.http.ResponseEntity;
import java.util.ArrayList;

import java.util.Optional;

@Service
public class FeedbackService {
    @Autowired
    private FeedbackRepository feedbackRepository;
    
    public List<Feedback> getFeedbacks() {
        List<Feedback> result = new ArrayList<Feedback>();
        feedbackRepository.findAll().forEach(result::add);
        return result;
    }

    public ResponseEntity<String> addFeedback(Feedback feedback) {
        // for validation
        if (feedback.getText() == null) {
            throw new IllegalStateException("Feedback cannot be Empty");
        }
        feedbackRepository.save(feedback);
        return ResponseEntity.ok("Feedback saved successfully");
    }
}
