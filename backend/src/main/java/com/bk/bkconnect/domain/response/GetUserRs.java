package com.bk.bkconnect.domain.response;

import com.bk.bkconnect.converter.GenderConvert;
import com.bk.bkconnect.converter.ImageConverter;
import com.bk.bkconnect.database.entity.UserEnt;
import com.bk.bkconnect.database.entity.ext.Address;

public class GetUserRs extends GenericRs<GetUserRs> {
    public String id;
    public String state;
    public String username;
    public String phone;
    public Address address;
    public String email;
    public String gender;
    public String fullname;
    public Long dob;
    public String avatar;
    public Long updateAt;
    public Long createAt;
    public String role;

    public static GetUserRs build(UserEnt user) {
        var rs = new GetUserRs();
        rs.id = user.id.toString();
        rs.state = user.state;
        rs.username = user.username;
        if (user.userInfo != null) {
            rs.phone = user.userInfo.phone;
            rs.address = user.userInfo.address;
            rs.email = user.userInfo.email;
            rs.gender = GenderConvert.convert(user.userInfo.gender);
            rs.fullname = user.userInfo.fullname;
            rs.dob = user.userInfo.dob;
            rs.avatar = ImageConverter.convert(user.userInfo.avatar);
        }
        rs.updateAt = user.updateAt;
        rs.createAt = user.createAt;
        rs.role = user.role;
        return rs;
    }
}
