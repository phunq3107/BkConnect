package com.bk.bkconnect.database.entity;

import org.hibernate.annotations.Type;

import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;
import java.util.UUID;

@MappedSuperclass
public abstract class AbstractEnt {

    @Id
    @GeneratedValue
    @Type(type = "uuid-char")
    public UUID id;
    public Integer state;
    public Boolean disable;
}
