package com.bk.bkconnect.service;

import com.bk.bkconnect.common.rest.Msg;
import com.bk.bkconnect.domain.response.LoginRs;
import com.bk.bkconnect.util.JwtUtils;
import org.springframework.stereotype.Service;

public interface ISessionService {
    Msg<LoginRs> login(String username, String password);
}

@Service
class SessionService implements ISessionService {
    @Override
    public Msg<LoginRs> login(String username, String password) {
        var msg = Msg.success(new LoginRs(JwtUtils.createToken(username, "ADMIN")));
        return msg;
    }
}
