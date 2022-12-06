package com.bk.bkconnect.controller;

import com.bk.bkconnect.common.rest.GenericResponse;
import com.bk.bkconnect.domain.request.AddPostRq;
import com.bk.bkconnect.domain.request.GetPostFilter;
import com.bk.bkconnect.domain.request.GetTutorFilter;
import com.bk.bkconnect.domain.request.UpdateTutorPostStateRq;
import com.bk.bkconnect.domain.response.GetEnrollTutorRs;
import com.bk.bkconnect.domain.response.GetPostRs;
import com.bk.bkconnect.domain.response.PageableRs;
import com.bk.bkconnect.domain.response.RecommendationRs;
import com.bk.bkconnect.service.IPostService;
import lombok.AllArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/post")
@AllArgsConstructor
public class PostController {

    private final IPostService postService;

    @GetMapping("/get/{postId}")
    public GenericResponse<GetPostRs> getById(@PathVariable String postId) {
        var rs = postService.getPostById(UUID.fromString(postId));
        return GenericResponse.parse(rs);
    }

    @GetMapping("/getAll")
    public GenericResponse<PageableRs<GetPostRs>> getAll(
            GetPostFilter filter, @RequestParam int pageNumber, @RequestParam int pageSize) {
        var rs = postService.getAll(filter, pageNumber, pageSize);
        return GenericResponse.parse(rs);
    }


    @PreAuthorize("hasRole('STUDENT')")
    @PostMapping("/add")
    public GenericResponse<GetPostRs> addPost(@RequestBody AddPostRq rq) {
        var rs = postService.addPost(rq);
        return GenericResponse.parse(rs);
    }

    @PreAuthorize("hasRole('STUDENT')")
    @GetMapping("/{postId}/getRecommend")
    public GenericResponse<PageableRs<RecommendationRs>> getRecommend(
            @PathVariable String postId, @RequestParam int pageNumber, @RequestParam int pageSize) {
        var rs = postService.getRecommend(UUID.fromString(postId), pageNumber, pageSize);
        return GenericResponse.parse(rs);
    }

//    @Deprecated
//    @PreAuthorize("hasRole('TUTOR')")
//    @PostMapping("/{postId}/enroll")
//    public GenericResponse<Boolean> enroll(@PathVariable String postId) {
//        var rs = postService.enroll(UUID.fromString(postId));
//        return GenericResponse.parse(rs);
//    }

    @PreAuthorize("hasRole('STUDENT')")
    @GetMapping("/{postId}/getEnrollTutor")
    public GenericResponse<PageableRs<GetEnrollTutorRs>> getEnrollTutor(
            @PathVariable String postId, @RequestParam int pageNumber, @RequestParam int pageSize) {
        var rs = postService.getEnrollTutor(UUID.fromString(postId), pageNumber, pageSize);
        return GenericResponse.parse(rs);
    }

    @PreAuthorize("hasAnyRole('STUDENT','TUTOR')")
    @PostMapping("/{postId}/request")
    public GenericResponse<Boolean> request(@PathVariable String postId, @RequestBody UpdateTutorPostStateRq rq) {
        var rs = postService.updateTutorPostState(UUID.fromString(postId), rq);
        return GenericResponse.parse(rs);
    }

}
