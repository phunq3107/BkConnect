package com.bk.bkconnect.database.entity;


import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class MessageEnt extends AbstractEnt {

    public Long createTime;
    public Integer kind;
    public String content;
    @ManyToOne
    @JoinColumn
    public UserEnt user;
    @ManyToOne
    @JoinColumn
    public RoomChatEnt roomChat;

    public static class MessageKind {
        public static int TEXT = 1;
        public static int IMAGE = 2;
    }
    // TODO: 24/11/2022


}
