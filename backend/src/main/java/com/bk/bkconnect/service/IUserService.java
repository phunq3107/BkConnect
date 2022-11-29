package com.bk.bkconnect.service;

import com.bk.bkconnect.DataStore;
import com.bk.bkconnect.common.rest.*;
import com.bk.bkconnect.database.constant.UserRole;
import com.bk.bkconnect.database.driver.StudentDAO;
import com.bk.bkconnect.database.driver.TutorDAO;
import com.bk.bkconnect.database.driver.UserDAO;
import com.bk.bkconnect.database.entity.StudentEnt;
import com.bk.bkconnect.database.entity.TutorEnt;
import com.bk.bkconnect.database.entity.UserEnt;
import com.bk.bkconnect.domain.request.RegisterRq;
import com.bk.bkconnect.domain.request.UpdateUserRq;
import com.bk.bkconnect.domain.response.GetUserRs;
import com.bk.bkconnect.domain.response.RegisterRs;
import com.bk.bkconnect.security.SessionUser;
import com.bk.bkconnect.util.JwtUtils;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

public interface IUserService {
    // for api
    Msg<RegisterRs> addUser(RegisterRq rq);

    Msg<GetUserRs> getUserById(UUID userId);

    Msg<GetUserRs> updateUserInfo(UUID userId, UpdateUserRq rq);

    // for system
    UserEnt getUserEntByUsername(String username);

}

@Service
@AllArgsConstructor
@Transactional
@Slf4j
class UserService implements IUserService, UserDetailsService {

    private final UserDAO userDAO;
    private final StudentDAO studentDAO;
    private final TutorDAO tutorDAO;

    @Override
    public Msg<RegisterRs> addUser(RegisterRq rq) {
        if (!rq.verify()) {
            return FailMsg.fail(rq);
        }
        if (getUserEntByUsername(rq.username) != null) {
            return FailMsg.fail(ResponseCode.existedUsername, ResponseMsg.existedUsername);
        }
        UserEnt user = switch (rq.role.toUpperCase()) {
            case UserRole.STUDENT -> new StudentEnt();
            case UserRole.TUTOR -> new TutorEnt();
            default -> null;
        };
        user.id = UUID.randomUUID();
        rq.flush(user);

        user = userDAO.saveAndFlush(user);
        DataStore.updateUser(user);
        log.info("Add user {}", rq.username);

        RegisterRs rs = new RegisterRs(JwtUtils.createToken(user.username, user.role));
        return SuccessMsg.success(rs);
    }

    @Override
    public Msg<GetUserRs> getUserById(UUID userId) {
        UserEnt user = DataStore.users.get(userId);
        if (user == null) {
            return FailMsg.fail(ResponseCode.userNotFound, ResponseMsg.userNotFound);
        }
        var rs = GetUserRs.build(user);
        return Msg.success(rs);
    }

    @Override
    public Msg<GetUserRs> updateUserInfo(UUID userId, UpdateUserRq rq) {
        if (!rq.verify()) {
            return FailMsg.fail(rq.failCode, rq.failReason);
        }
        UserEnt user = DataStore.users.get(userId);
        if (user == null) {
            return FailMsg.fail(ResponseCode.userNotFound, ResponseMsg.userNotFound);
        }
        rq.flush(user);
        user = userDAO.saveAndFlush(user);
        DataStore.updateUser(user);
        return getUserById(user.id);
    }

    @Override
    public UserEnt getUserEntByUsername(String username) {
        return DataStore.users.values().stream()
                .filter(u -> username.equals(u.username))
                .findFirst().orElse(null);

    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        var user = getUserEntByUsername(username);
        if (user != null) {
            return new SessionUser(user.id, user.username, user.password, user.role);
        }
        throw new UsernameNotFoundException(ResponseMsg.userNotFound);
    }
}
