package com.ecomrse.projectsw.order.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ecomrse.projectsw.order.model.order;

@Repository
public interface orderRepository extends JpaRepository<order, Long>{

}
