package com.bk.bkconnect.controller;

import com.bk.bkconnect.common.rest.GenericResponse;
import com.bk.bkconnect.domain.request.AddPostRq;
import com.bk.bkconnect.domain.response.GetPostRs;
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

    @PreAuthorize("hasRole('STUDENT')")
    @PostMapping("/add")
    public GenericResponse<GetPostRs> addPost(@RequestBody AddPostRq rq) {
        var rs = postService.addPost(rq);
        return GenericResponse.parse(rs);
    }

}
