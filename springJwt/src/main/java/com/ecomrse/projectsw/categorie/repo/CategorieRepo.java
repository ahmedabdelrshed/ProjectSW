package com.ecomrse.projectsw.categorie.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ecomrse.projectsw.categorie.module.Categorie;

@Repository
public interface CategorieRepo  extends JpaRepository<Categorie,Long> {
    Optional<Categorie> findByName(String name);
}
