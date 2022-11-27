package com.bk.bkconnect.controller;

import com.bk.bkconnect.common.rest.GenericResponse;
import com.bk.bkconnect.domain.request.RegisterRq;
import com.bk.bkconnect.domain.request.UpdateUserRq;
import com.bk.bkconnect.domain.response.GetUserRs;
import com.bk.bkconnect.domain.response.RegisterRs;
import com.bk.bkconnect.service.IUserService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/user")
@AllArgsConstructor
public class UserController {

    private final IUserService userService;

    @PostMapping("/add")
    public GenericResponse<RegisterRs> addUser(@RequestBody RegisterRq rq) {
        var rs = userService.addUser(rq);
        return GenericResponse.parse(rs);
    }

    @GetMapping("/get/{id}")
    public GenericResponse<GetUserRs> getById(@PathVariable String id) {
        var rs = userService.getUserById(UUID.fromString(id));
        return GenericResponse.parse(rs);
    }

    @PostMapping("/update/{id}")
    public GenericResponse<GetUserRs> updateUserInfo(@PathVariable String id, @RequestBody UpdateUserRq rq) {
        var rs = userService.updateUserInfo(UUID.fromString(id), rq);
        return GenericResponse.parse(rs);
    }

}
