package com.bk.bkconnect.service;

import com.bk.bkconnect.common.rest.Msg;
import com.bk.bkconnect.common.rest.ResponseCode;
import com.bk.bkconnect.common.rest.ResponseMsg;
import com.bk.bkconnect.common.rest.SuccessMsg;
import com.bk.bkconnect.database.driver.UserDAO;
import com.bk.bkconnect.database.entity.AdminEnt;
import com.bk.bkconnect.database.entity.UserEnt;
import com.bk.bkconnect.security.SessionUser;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

public interface IUserService {

    Msg<UserEnt> getUserByUsername(String username);

}

@Service
@AllArgsConstructor
class UserService implements IUserService, UserDetailsService {

    private final UserDAO userDAO;

    @Override
    public Msg<UserEnt> getUserByUsername(String username) {
        // TODO: 26/11/2022 dev only
        if ("admin".equals(username)) {
            //admin:admin
            UserEnt admin = new AdminEnt();
            admin.username = "admin";
            admin.password = "mHrd7rqGM2c44284d51a57c91a29b2e35a0a51b6f0";
            admin.role = UserEnt.UserRole.ADMIN;
            return Msg.success(admin);
        }
        UserEnt user = userDAO.getUserEntByUsername(username);
        if (user == null) return Msg.fail(ResponseMsg.notFound, ResponseCode.notFound);
        return Msg.success(user);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        if (getUserByUsername(username) instanceof SuccessMsg<UserEnt> rs) {
            var user = rs.data;
            return new SessionUser(user.id, user.username, user.password, user.role);
        }
        throw new UsernameNotFoundException(ResponseMsg.userNotFound);
    }
}
