package com.bk.bkconnect.service;

import com.bk.bkconnect.DataStore;
import com.bk.bkconnect.common.rest.Msg;
import com.bk.bkconnect.common.rest.ResponseCode;
import com.bk.bkconnect.common.rest.ResponseMsg;
import com.bk.bkconnect.database.constant.StudentPostState;
import com.bk.bkconnect.database.driver.PostDAO;
import com.bk.bkconnect.database.driver.StudentPostRelDAO;
import com.bk.bkconnect.database.entity.PostEnt;
import com.bk.bkconnect.database.entity.StudentPostRel;
import com.bk.bkconnect.domain.request.AddPostRq;
import com.bk.bkconnect.domain.response.GetPostRs;
import com.bk.bkconnect.security.ApplicationContext;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

public interface IPostService {
    // for api
    Msg<GetPostRs> getPostById(UUID postId);

    Msg<GetPostRs> addPost(AddPostRq rq);

}

@Service
@AllArgsConstructor
@Transactional
class PostService implements IPostService {

    private final PostDAO postDAO;
    private final StudentPostRelDAO studentPostRelDAO;

    @Override
    public Msg<GetPostRs> getPostById(UUID postId) {
        PostEnt post;
        if (DataStore.posts.containsKey(postId)) {
            post = DataStore.posts.get(postId);
        } else {
            post = postDAO.getById(postId);
        }
        if (post == null) {
            return Msg.fail(ResponseCode.postNotFound, ResponseMsg.postNotFound);
        }

        var rs = GetPostRs.build(post);
        return Msg.success(rs);
    }

    @Override
    public Msg<GetPostRs> addPost(AddPostRq rq) {
        if (!rq.verify()) {
            return Msg.fail(rq.failCode, rq.failReason);
        }

        var post = new PostEnt();
        post.id = UUID.randomUUID();
        post.createBy = DataStore.users.get(ApplicationContext.currentUserId());
        post.createTime = System.currentTimeMillis();
        rq.flush(post);
        postDAO.saveAndFlush(post);
        DataStore.updatePost(post);
        updateStudentPostRel(post.createBy.id, post.id, StudentPostState.JOIN);

        var rs = GetPostRs.build(post);
        return Msg.success(rs);
    }

    private void updateStudentPostRel(UUID studentId, UUID postId, String state) {
        var rel = StudentPostRel.create(studentId, postId, state);
        studentPostRelDAO.saveAndFlush(rel);
        switch (state.toUpperCase()) {
            case StudentPostState.JOIN:
                DataStore.addPostFollower(postId, studentId);
            case StudentPostState.LEAVE:
                DataStore.removePostFollower(postId, studentId);
            default:
        }
    }

}

