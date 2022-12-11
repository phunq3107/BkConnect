package com.bk.bkconnect.service;

import com.bk.bkconnect.DataStore;
import com.bk.bkconnect.database.driver.RoomchatDAO;
import com.bk.bkconnect.database.entity.RoomChatEnt;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.UUID;

public interface IRoomchatService {
    void createRoomchat(UUID postId, List<UUID> userIds);

    void addMember(UUID roomchatId, UUID userId);
}

@Service
@Slf4j
@AllArgsConstructor
class RoomchatService implements IRoomchatService {

    private RoomchatDAO roomchatDAO;

    @Override
    public void createRoomchat(UUID postId, List<UUID> userIds) {
        log.info("Create roomchat {}", postId);
        var roomchat = RoomChatEnt.createRoomchat(postId);
        roomchatDAO.saveAndFlush(roomchat);
        DataStore.roomchatMembers.put(roomchat.id, new HashSet<>());

        userIds.forEach(userId -> addMember(roomchat.id, userId));
    }

    @Override
    public void addMember(UUID roomchatId, UUID userId) {
        log.info("Add roomchat member: roomchat={}, user={}", roomchatId, userId);
        if (!DataStore.roomchatMembers.containsKey(roomchatId)) return;

        var roomchat = roomchatDAO.getById(roomchatId);
        if (roomchat.users == null) roomchat.users = new ArrayList<>();
        roomchat.users.add(DataStore.users.get(userId));
        roomchatDAO.saveAndFlush(roomchat);
        DataStore.addRoomchatMember(roomchatId, userId);
        // TODO: 11/12/2022  add message
    }
}
