package com.tazi34.carservice.clientInfo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClientInfoRepository extends JpaRepository<ClientInfo, Long> {

    List<ClientInfo> findAllByEmail(String email);
}