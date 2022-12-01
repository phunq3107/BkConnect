package com.bk.bkconnect.database.driver;

import com.bk.bkconnect.database.entity.StudentPostRel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface StudentPostDAO extends JpaRepository<StudentPostRel, UUID> {
    List<StudentPostRel> getAllByState(String state);
}
