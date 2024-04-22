package com.ecomrse.projectsw.feedback.repository;

import com.ecomrse.projectsw.feedback.model.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FeedbackRepository extends JpaRepository<Feedback, Long> {
}
