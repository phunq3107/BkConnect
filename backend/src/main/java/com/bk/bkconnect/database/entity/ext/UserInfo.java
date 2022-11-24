package com.bk.bkconnect.database.entity.ext;

import javax.persistence.Embeddable;
import javax.persistence.Embedded;
import java.time.LocalDateTime;

@Embeddable
public class UserInfo {
    public String phone;
    @Embedded
    public Address address;
    public String email;
    public Integer gender;
    public String fullname;
    public LocalDateTime dob;
    @Embedded
    public Image avatar;
}