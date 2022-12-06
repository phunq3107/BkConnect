package com.bk.bkconnect.controller;

import com.bk.bkconnect.common.rest.GenericResponse;
import com.bk.bkconnect.domain.request.GetTutorFilter;
import com.bk.bkconnect.domain.request.UpdateTutorRq;
import com.bk.bkconnect.domain.response.GetBookingRs;
import com.bk.bkconnect.domain.response.GetTutorRs;
import com.bk.bkconnect.domain.response.PageableRs;
import com.bk.bkconnect.service.IPostService;
import com.bk.bkconnect.service.ITutorService;
import lombok.AllArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/tutor")
@AllArgsConstructor
public class TutorController {

    private final ITutorService tutorService;
    private final IPostService postService;

    @GetMapping("/get/{tutorId}")
    public GenericResponse<GetTutorRs> getTutorById(@PathVariable String tutorId) {
        var rs = tutorService.getTutorById(UUID.fromString(tutorId));
        return GenericResponse.parse(rs);
    }

    @GetMapping("/getAll")
    public GenericResponse<PageableRs<GetTutorRs>> getAllTutor(
            GetTutorFilter filter, @RequestParam int pageNumber, @RequestParam int pageSize) {
        var rs = tutorService.getAllTutor(filter, pageNumber, pageSize);
        return GenericResponse.parse(rs);
    }

    @PreAuthorize("hasRole('TUTOR')")
    @PostMapping("/update/{tutorId}")
    public GenericResponse<GetTutorRs> updateTutorInfo(@PathVariable String tutorId, @RequestBody UpdateTutorRq rq) {
        var rs = tutorService.updateTutorInfo(UUID.fromString(tutorId), rq);
        return GenericResponse.parse(rs);
    }

    @PreAuthorize("hasRole('TUTOR')")
    @GetMapping("/getBooking")
    public GenericResponse<List<GetBookingRs>> getBooking(){
        var rs = postService.getTutorBooking();
        return GenericResponse.parse(rs);
    }


}
