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

}
