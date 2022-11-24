package com.bk.bkconnect.database.entity;

import com.bk.bkconnect.database.entity.ext.UserInfo;

import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class UserEnt extends AbstractEnt {
    public String username;
    public String password;
    public Long createAt;
    public Long updateAt;
    @Embedded
    public UserInfo userInfo;


}
