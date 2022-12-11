package com.bk.bkconnect.database.entity;


import org.hibernate.annotations.Type;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.util.UUID;

@Entity
public class MessageEnt extends AbstractEnt {

    public Long createTime;
    public Integer kind;
    public String content;
    @Type(type = "uuid-char")
    public UUID sender;
    @ManyToOne
    @JoinColumn
    public RoomChatEnt roomChat;

}
