package com.ecomrse.projectsw.feedback.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "feedback")

public class Feedback {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String text;
    private int raterange;

    public Feedback( String text , int raterange) {
        this.text=text  ;
        this.raterange = raterange;
    }

    public Feedback( ) {
    }


    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public int getRaterange() {
        return raterange;
    }

    public void setRaterange(int raterange) {
        this.raterange = raterange;
    }



}
