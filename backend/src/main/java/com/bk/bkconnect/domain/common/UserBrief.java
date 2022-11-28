package com.bk.bkconnect.domain.common;

import com.bk.bkconnect.converter.ImageConverter;
import com.bk.bkconnect.database.entity.UserEnt;

public class UserBrief {
    public String id;
    public String username;
    public String fullname;
    public String avatar;
    public String role;
    public String extInfo;

    public static UserBrief build(UserEnt user) {
        var rs = new UserBrief();
        rs.id = user.id.toString();
        rs.username = user.username;
        if (user.userInfo != null) {
            rs.fullname = user.userInfo.fullname;
            rs.avatar = ImageConverter.convert(user.userInfo.avatar);
        }
        rs.role = user.role;
        return rs;
    }

}
