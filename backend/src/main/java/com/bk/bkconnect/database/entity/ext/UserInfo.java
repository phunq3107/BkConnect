package com.bk.bkconnect.database.entity.ext;

import javax.persistence.Embeddable;
import javax.persistence.Embedded;
import java.time.LocalDateTime;

@Embeddable
public class UserInfo {
    public String phone;
    @Embedded
    public Address address = new Address();
    public String email;
    public String gender;
    public String fullname;
    public Long dob;
    @Embedded
    public Image avatar = new Image();
}