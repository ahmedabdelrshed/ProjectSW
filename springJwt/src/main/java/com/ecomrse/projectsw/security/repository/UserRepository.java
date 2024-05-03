package com.ecomrse.projectsw.security.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ecomrse.projectsw.security.model.Role;
import com.ecomrse.projectsw.security.model.User;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {

    Optional<User> findByUsername(String username);
    List<User> findByRole(Role role);
    int countByRole(Role role);
    
}
