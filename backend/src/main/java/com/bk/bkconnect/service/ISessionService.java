package com.bk.bkconnect.service;

import com.bk.bkconnect.common.rest.*;
import com.bk.bkconnect.converter.ImageConverter;
import com.bk.bkconnect.database.entity.UserEnt;
import com.bk.bkconnect.domain.request.LoginRq;
import com.bk.bkconnect.domain.response.GetCurrentUserRs;
import com.bk.bkconnect.domain.response.LoginRs;
import com.bk.bkconnect.security.ApplicationContext;
import com.bk.bkconnect.security.SessionUser;
import com.bk.bkconnect.util.HashingUtils;
import com.bk.bkconnect.util.JwtUtils;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

public interface ISessionService {
    Msg<LoginRs> login(LoginRq rq);

    Msg<GetCurrentUserRs> getCurrentUser();
}

@Service
@AllArgsConstructor
class SessionService implements ISessionService {

    private final IUserService userService;

    @Override
    public Msg<LoginRs> login(LoginRq rq) {
        UserEnt user = userService.getUserEntByUsername(rq.username);
        if (user == null) {
            return FailMsg.fail(ResponseCode.userNotFound, ResponseMsg.notFound);
        }
        if (!HashingUtils.verify(rq.password, user.password)) {
            return FailMsg.fail(ResponseCode.wrongPassword, ResponseMsg.wrongPassword);
        }
        LoginRs rs = new LoginRs();
        rs.accessToken = JwtUtils.createToken(user.username, user.role);
        return SuccessMsg.success(rs);
    }

    @Override
    public Msg<GetCurrentUserRs> getCurrentUser() {
        SessionUser sessionUser = ApplicationContext.currentUser();
        UserEnt user = userService.getUserEntByUsername(sessionUser.username);
        GetCurrentUserRs rs = new GetCurrentUserRs(user.id, user.username, user.userInfo.fullname, user.role, ImageConverter.convert(user.userInfo.avatar));
        return Msg.success(rs);
    }
}
