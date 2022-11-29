package com.bk.bkconnect.database.driver;

import com.bk.bkconnect.database.entity.StudentPostRel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface StudentPostRelDAO extends JpaRepository<StudentPostRel, UUID> {
}
