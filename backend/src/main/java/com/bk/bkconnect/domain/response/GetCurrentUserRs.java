package com.bk.bkconnect.domain.response;

import com.bk.bkconnect.converter.ImageConverter;
import com.bk.bkconnect.database.entity.UserEnt;

import java.util.UUID;

public class GetCurrentUserRs extends GenericRs<GetCurrentUserRs> {
    public UUID id;
    public String username;
    public String fullname;
    public String role;
    public String avatar; // url

    public static GetCurrentUserRs build(UserEnt user) {
        var rs = new GetCurrentUserRs();
        rs.id = user.id;
        rs.username = user.username;
        rs.role = user.role;
        if (user.userInfo != null) {
            rs.fullname = user.userInfo.fullname;
            rs.avatar = ImageConverter.convert(user.userInfo.avatar);
        }
        return rs;
    }
}
