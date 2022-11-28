package com.bk.bkconnect.domain.request;

import com.bk.bkconnect.converter.ImageConverter;
import com.bk.bkconnect.database.entity.UserEnt;
import com.bk.bkconnect.database.entity.ext.Address;

public class UpdateUserRq extends GenericRq {
    public String fullname;
    public String gender;
    public Long dob;
    public Address address = new Address();
    public String email;
    public String phone;
    public String avatar;

    @Override
    public boolean verify() {
        return super.verify();
    }

    public void flush(UserEnt user) {
        user.initNullField();
        user.userInfo.fullname = fullname;
        user.userInfo.gender = gender == null ? null : gender.toUpperCase();
        user.userInfo.dob = dob;
        user.userInfo.address = address;
        user.userInfo.email = email;
        user.userInfo.phone = phone;
        user.userInfo.avatar = ImageConverter.convert(avatar);

    }
}
