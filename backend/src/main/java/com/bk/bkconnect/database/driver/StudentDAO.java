package com.bk.bkconnect.database.driver;

import com.bk.bkconnect.database.entity.StudentEnt;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface StudentDAO extends JpaRepository<StudentEnt, UUID> {
}
