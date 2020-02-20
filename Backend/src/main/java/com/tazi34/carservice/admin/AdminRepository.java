package com.tazi34.carservice.admin;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface AdminRepository extends JpaRepository<Admin,Long> {
    List<Admin> findAdminByEmail(String email);
}
