package com.bk.bkconnect.database.entity;

import javax.persistence.*;
import java.util.List;

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
}
