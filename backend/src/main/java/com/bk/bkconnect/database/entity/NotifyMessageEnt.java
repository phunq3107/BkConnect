package com.bk.bkconnect.database.entity;

import org.hibernate.annotations.Type;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Lob;
import java.util.UUID;

@Entity
public class NotifyMessageEnt extends AbstractEnt {
    @Lob
    @Column(length = 3000)
    public String title;
    @Lob
    @Column(length = 3000)
    public String content;
    @Type(type = "uuid-char")
    public UUID receiver;
    public Long timestamp;
}
