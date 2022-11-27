package com.bk.bkconnect.controller;

import com.bk.bkconnect.common.rest.GenericResponse;
import com.bk.bkconnect.domain.request.LoginRq;
import com.bk.bkconnect.domain.response.GetCurrentUserRs;
import com.bk.bkconnect.domain.response.LoginRs;
import com.bk.bkconnect.service.ISessionService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/session")
@AllArgsConstructor
public class SessionController {

    private final ISessionService sessionService;

    @PostMapping("/login")
    public GenericResponse<LoginRs> login(@RequestBody LoginRq loginRq) {
        var msg = sessionService.login(loginRq);
        return GenericResponse.parse(msg);
    }

    @GetMapping("/getCurrentUser")
    public GenericResponse<GetCurrentUserRs> getCurrentUser() {
        var msg = sessionService.getCurrentUser();
        return GenericResponse.parse(msg);
    }


}
