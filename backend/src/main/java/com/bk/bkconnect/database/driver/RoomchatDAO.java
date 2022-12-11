package com.bk.bkconnect.database.driver;

import com.bk.bkconnect.database.entity.RoomChatEnt;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface RoomchatDAO extends JpaRepository<RoomChatEnt, UUID> {
    RoomChatEnt getById(UUID id);
}
