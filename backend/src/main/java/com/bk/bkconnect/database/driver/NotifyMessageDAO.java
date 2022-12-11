package com.bk.bkconnect.database.driver;

import com.bk.bkconnect.database.entity.NotifyMessageEnt;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface NotifyMessageDAO extends JpaRepository<NotifyMessageEnt, UUID> {
    List<NotifyMessageEnt> getAllByReceiverOrderByTimestampDesc(UUID receiver);
}
