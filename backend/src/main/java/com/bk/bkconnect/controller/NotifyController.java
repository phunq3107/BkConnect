package com.bk.bkconnect.controller;

import com.bk.bkconnect.common.rest.GenericResponse;
import com.bk.bkconnect.database.entity.NotifyMessageEnt;
import com.bk.bkconnect.util.NotifyPublisher;
import lombok.AllArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/notify")
@AllArgsConstructor
public class NotifyController {

    private final NotifyPublisher notifyPublisher;

    @PreAuthorize("hasAnyRole('ADMIN','TUTOR','STUDENT')")
    @GetMapping("/getAll")
    public GenericResponse<List<NotifyMessageEnt>> getAll() {
        var rs = notifyPublisher.getAll();
        return GenericResponse.parse(rs);
    }
}
