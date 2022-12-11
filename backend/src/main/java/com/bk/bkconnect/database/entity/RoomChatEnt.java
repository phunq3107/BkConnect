package com.bk.bkconnect.database.entity;

import com.bk.bkconnect.DataStore;

import javax.persistence.*;
import java.util.List;
import java.util.UUID;

@Entity
public class RoomChatEnt extends AbstractEnt {
    public Long createTime;

    @ManyToMany
    @JoinTable(
            name = "ROOMCHAT_USER",
            joinColumns = @JoinColumn(name = "ROOMCHAT_ID", referencedColumnName = "ID"),
            inverseJoinColumns = @JoinColumn(name = "USER_ID", referencedColumnName = "ID")
    )
    public List<UserEnt> users;

    @OneToOne
    @JoinColumn(name = "POST_ID")
    public PostEnt post;

    public static RoomChatEnt createRoomchat(UUID postId) {
        var rs = new RoomChatEnt();
        rs.id = postId;
        rs.post = DataStore.posts.get(postId);
        rs.createTime = System.currentTimeMillis();
        return rs;
    }
}
