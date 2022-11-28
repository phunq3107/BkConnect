package com.bk.bkconnect.controller;

import com.bk.bkconnect.common.rest.GenericResponse;
import com.bk.bkconnect.domain.request.GetTutorFilter;
import com.bk.bkconnect.domain.request.UpdateTutorRq;
import com.bk.bkconnect.domain.response.GetTutorRs;
import com.bk.bkconnect.service.ITutorService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/session")
@AllArgsConstructor
public class TutorController {

    private final ITutorService tutorService;

    @GetMapping("/get/{tutorId}")
    public GenericResponse<GetTutorRs> getTutorById(@PathVariable String tutorId) {
        var rs = tutorService.getTutorById(UUID.fromString(tutorId));
        return GenericResponse.parse(rs);
    }

    @GetMapping("/getAll")
    public GenericResponse<List<GetTutorRs>> getAllTutor(
            @RequestBody GetTutorFilter filter, @RequestParam int pageSize, @RequestParam int pageNumber) {
        var rs = tutorService.getAllTutor(filter, pageSize, pageNumber);
        return GenericResponse.parse(rs);
    }

    @PostMapping("/update/{tutorId}")
    public GenericResponse<GetTutorRs> updateTutorInfo(@PathVariable String tutorId, @RequestBody UpdateTutorRq rq) {
        var rs = tutorService.updateTutorInfo(UUID.fromString(tutorId), rq);
        return GenericResponse.parse(rs);
    }


}
