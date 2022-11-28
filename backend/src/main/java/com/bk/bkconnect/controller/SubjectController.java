package com.bk.bkconnect.controller;

import com.bk.bkconnect.common.rest.GenericResponse;
import com.bk.bkconnect.domain.response.GetSubjectRs;
import com.bk.bkconnect.service.ISubjectService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/subject")
@AllArgsConstructor
public class SubjectController {

    private final ISubjectService subjectService;

    @GetMapping("/getAll")
    public GenericResponse<List<GetSubjectRs>> getAll() {
        var rs = subjectService.getAll();
        return GenericResponse.parse(rs);
    }
}
