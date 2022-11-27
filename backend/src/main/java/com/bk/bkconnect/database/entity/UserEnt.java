package com.bk.bkconnect.database.entity;

import com.bk.bkconnect.database.entity.ext.Address;
import com.bk.bkconnect.database.entity.ext.Image;
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
    public String role;
    @Embedded
    public UserInfo userInfo = new UserInfo();

    public static class UserRole {
        static public String ADMIN = "ADMIN";
        static public String TUTOR = "TUTOR";
        static public String STUDENT = "STUDENT";
    }

    @Override
    public void initNullField() {
        if(userInfo == null) userInfo = new UserInfo();
        if(userInfo.avatar == null) userInfo.avatar = new Image();
        if(userInfo.address == null) userInfo.address = new Address();
    }
}
