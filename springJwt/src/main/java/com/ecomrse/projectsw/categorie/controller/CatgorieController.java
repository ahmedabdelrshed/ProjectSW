package com.ecomrse.projectsw.categorie.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecomrse.projectsw.categorie.module.Categorie;
import com.ecomrse.projectsw.categorie.service.CategorieService;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/categorie")
public class CatgorieController {
    @Autowired
    CategorieService categorieService;

    @CrossOrigin(origins = "*")
    @PostMapping("/manage/add")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<String> add(@RequestBody Categorie categorie) {
        return categorieService.addCategorie(categorie);
    }

    @CrossOrigin(origins = "*")
    @PutMapping("/manage/{id}/update")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<String> update(@PathVariable long id, @RequestBody Categorie categorie) {
        categorie.setId(id);
        return categorieService.updateCategorie(categorie);
    }

    @CrossOrigin(origins = "*")
    @DeleteMapping("/manage/{id}/delete")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<String> delete(@PathVariable long id) {
        return categorieService.deleteCategorie(id);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/get")
    @PreAuthorize("hasAnyAuthority('USER', 'ADMIN')")
    public List<Categorie> get() {
        return categorieService.getCategories();
    }
}
