package com.bk.bkconnect.database.driver;

import com.bk.bkconnect.database.entity.TutorEnt;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface TutorDAO extends JpaRepository<TutorEnt, UUID> {
}
