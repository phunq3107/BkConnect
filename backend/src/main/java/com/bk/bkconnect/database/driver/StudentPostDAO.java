package com.bk.bkconnect.database.driver;

import com.bk.bkconnect.database.entity.AbstractRel;
import com.bk.bkconnect.database.entity.StudentPostRel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface StudentPostDAO extends JpaRepository<StudentPostRel, AbstractRel.RelId> {
    List<StudentPostRel> getAllByState(String state);
}
