package com.bk.bkconnect.domain.request;

import com.bk.bkconnect.common.rest.ResponseCode;
import com.bk.bkconnect.common.rest.ResponseMsg;
import com.bk.bkconnect.config.Constant;
import com.bk.bkconnect.database.entity.UserEnt;
import com.bk.bkconnect.util.HashingUtils;

public class RegisterRq extends GenericRq {
    public String username;
    public String password;
    public String fullname;
    public String email;
    public String role;

    @Override
    public boolean verify() {
        if (username == null || username.length() < Constant.USERNAME_MIN_LENGTH) {
            failCode = ResponseCode.invalidUsername;
            failReason = ResponseMsg.invalidUsername;
            return false;
        }
        if (password == null || password.length() < Constant.PASSWORD_MIN_LENGTH) {
            failCode = ResponseCode.invalidPassword;
            failReason = ResponseMsg.invalidPassword;
            return false;
        }
        if (role == null || (!role.equals(UserEnt.UserRole.TUTOR) && !role.equals(UserEnt.UserRole.STUDENT))) {
            failCode = ResponseCode.invalidUserRole;
            failReason = ResponseMsg.invalidUserRole;
            return false;
        }
        // TODO: 26/11/2022 verify fullname, email
        return true;
    }


    public void flush(UserEnt student) {
        student.username = username;
        student.password = HashingUtils.hashMd5(password);
        student.userInfo.fullname = fullname;
        student.userInfo.email = email;
        student.role = role;
    }

}
