package com.ecomrse.projectsw.categorie.module;

import jakarta.persistence.*;

import lombok.Data;

import java.util.List;

import org.springframework.stereotype.Component;

import io.micrometer.common.lang.Nullable;

@Component
@Entity
@Table(name = "categories")

public class Categorie {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Nullable()
    private String name;
    private String description;

    public long getId() {
        return this.id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Categorie(long id, String name) {
        this.id = id;
        this.name = name;
    }

    public String getDescription() {
        return this.description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Categorie(long id, String name, String description) {
        this.id = id;
        this.name = name;
        this.description = description;
    }

    public Categorie(String name, String description) {
        this.name = name;
        this.description = description;
    }

    public Categorie() {

    }
}
