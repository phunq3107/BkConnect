package com.bk.bkconnect.database.driver;

import com.bk.bkconnect.database.entity.UserEnt;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface UserDAO extends JpaRepository<UserEnt, UUID> {
    UserEnt getUserEntByUsername(String username);
}
