package com.bk.bkconnect.service;

import com.bk.bkconnect.DataStore;
import com.bk.bkconnect.common.rest.Msg;
import com.bk.bkconnect.common.rest.ResponseCode;
import com.bk.bkconnect.common.rest.ResponseMsg;
import com.bk.bkconnect.database.constant.PostState;
import com.bk.bkconnect.database.constant.StudentPostState;
import com.bk.bkconnect.database.driver.PostDAO;
import com.bk.bkconnect.database.driver.StudentPostDAO;
import com.bk.bkconnect.database.entity.PostEnt;
import com.bk.bkconnect.database.entity.StudentPostRel;
import com.bk.bkconnect.domain.request.AddPostRq;
import com.bk.bkconnect.domain.request.GetPostFilter;
import com.bk.bkconnect.domain.response.GetPostRs;
import com.bk.bkconnect.domain.response.PageableRs;
import com.bk.bkconnect.security.ApplicationContext;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

public interface IPostService {
    // for api
    Msg<GetPostRs> getPostById(UUID postId);

    Msg<PageableRs<GetPostRs>> getAll(GetPostFilter filter, int pageNumber, int pageSize);

    Msg<GetPostRs> addPost(AddPostRq rq);


}

@Service
@AllArgsConstructor
@Transactional
class PostService implements IPostService {

    private final PostDAO postDAO;
    private final StudentPostDAO studentPostDAO;

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
    public Msg<PageableRs<GetPostRs>> getAll(GetPostFilter filter, int pageNumber, int pageSize) {
        if (!filter.verify()) {
            return Msg.fail(filter);
        }

        var rs = PageableRs.build(DataStore.posts.values().stream().toList(), pageNumber, pageSize, GetPostRs::build);
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
        post.state = PostState.ACTIVE;
        rq.flush(post);
        postDAO.saveAndFlush(post);
        DataStore.updatePost(post);
        updateStudentPostRel(post.createBy.id, post.id, StudentPostState.JOIN);

        var rs = GetPostRs.build(post);
        return Msg.success(rs);
    }

    private void updateStudentPostRel(UUID studentId, UUID postId, String state) {
        var rel = StudentPostRel.create(studentId, postId, state);
        studentPostDAO.saveAndFlush(rel);
        switch (state.toUpperCase()) {
            case StudentPostState.JOIN -> DataStore.addPostFollower(postId, studentId);
            case StudentPostState.LEAVE -> DataStore.removePostFollower(postId, studentId);
            default -> {
            }
        }
    }

}

