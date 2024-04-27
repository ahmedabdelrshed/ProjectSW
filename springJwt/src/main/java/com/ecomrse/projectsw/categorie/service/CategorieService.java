package com.ecomrse.projectsw.categorie.service;

import java.util.List;
import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
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
        categorieRepo.findAll().forEach(result::add);
        return result;
    }

    // Add Categorie

    public ResponseEntity<String> addCategorie(Categorie categorie) {
        // for validation
        if (categorie.getName() == null) {
            throw new IllegalStateException("Name of the Categorie cannot be empty");
        }
        if (categorie.getDescription() == null) {
            throw new IllegalStateException("Description of the Categorie cannot be empty");
        }
        if (categorieRepo.findByName(categorie.getName()).isPresent()) {
            throw new IllegalStateException("Name of the Categorie Already Exist");
        }
        
        categorieRepo.save(categorie);
        return ResponseEntity.ok("Categorie saved successfully");
    }

    // update Categorie
    public ResponseEntity<String> updateCategorie(Categorie categorie) {
        // for validation
        if (categorie.getName() == null) {
            return ResponseEntity.badRequest().body("Name of the Categorie cannot by Empty");
        }
        if (categorie.getDescription() == null) {
            return ResponseEntity.badRequest().body("Description of the Categorie cannot by Empty");
        }
        categorieRepo.save(categorie);
        return ResponseEntity.ok("Categorie Updated successfully");
    }

    public ResponseEntity<String> deleteCategorie(long id) {
        categorieRepo.deleteById(id);
        return ResponseEntity.ok("Categorie Deleted successfully");
    }

        
}
