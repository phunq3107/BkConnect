package com.bk.bkconnect.database.driver;

import com.bk.bkconnect.database.entity.PostEnt;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface PostDAO extends JpaRepository<PostEnt, UUID> {
    PostEnt getById(UUID id);
}
