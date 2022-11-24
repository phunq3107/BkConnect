package com.bk.bkconnect.controller;

import com.bk.bkconnect.common.rest.GenericResponse;
import com.bk.bkconnect.domain.response.LoginRs;
import com.bk.bkconnect.service.ISessionService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/session")
@AllArgsConstructor
public class SessionController {

    private final ISessionService sessionService;

    @PostMapping("/login")
    GenericResponse<LoginRs> login(@RequestParam String username, @RequestParam String password) {
        var msg = sessionService.login(username, password);
        return GenericResponse.parse(msg);
    }

}
