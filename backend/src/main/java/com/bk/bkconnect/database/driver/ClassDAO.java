package com.bk.bkconnect.database.driver;

import com.bk.bkconnect.database.entity.ClassEnt;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface ClassDAO extends JpaRepository<ClassEnt, UUID> {
}
