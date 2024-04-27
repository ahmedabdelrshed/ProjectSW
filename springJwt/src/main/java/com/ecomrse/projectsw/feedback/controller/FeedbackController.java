package com.ecomrse.projectsw.feedback.controller;

import com.ecomrse.projectsw.feedback.model.Feedback;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.ecomrse.projectsw.feedback.service.FeedbackService;
import org.springframework.http.ResponseEntity;

import java.util.List;

@RestController
@RequestMapping("/feedback")
public class FeedbackController {
  @Autowired
  private FeedbackService feedbackService;
  @CrossOrigin(origins = "*")
  @GetMapping("/get")
  public List<Feedback> getAllFeedback() {
    return feedbackService.getFeedbacks();
  }
  @CrossOrigin(origins = "*")
  @PostMapping("/add")
  public ResponseEntity<String> add(@RequestBody Feedback feedback) {
    return feedbackService.addFeedback(feedback);
  }

}
