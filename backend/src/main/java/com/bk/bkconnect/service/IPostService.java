package com.bk.bkconnect.service;

import com.bk.bkconnect.DataStore;
import com.bk.bkconnect.common.rest.*;
import com.bk.bkconnect.core.matching.MatchingSystem;
import com.bk.bkconnect.database.constant.PostRequester;
import com.bk.bkconnect.database.constant.PostState;
import com.bk.bkconnect.database.constant.StudentPostState;
import com.bk.bkconnect.database.constant.TutorPostState;
import com.bk.bkconnect.database.driver.PostDAO;
import com.bk.bkconnect.database.driver.StudentPostDAO;
import com.bk.bkconnect.database.driver.TutorPostDAO;
import com.bk.bkconnect.database.entity.PostEnt;
import com.bk.bkconnect.database.entity.StudentPostRel;
import com.bk.bkconnect.database.entity.TutorPostRel;
import com.bk.bkconnect.domain.request.AddPostRq;
import com.bk.bkconnect.domain.request.GetPostFilter;
import com.bk.bkconnect.domain.request.UpdateTutorPostStateRq;
import com.bk.bkconnect.domain.response.*;
import com.bk.bkconnect.security.ApplicationContext;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;

import javax.xml.datatype.DatatypeFactory;
import java.util.List;
import java.util.UUID;

public interface IPostService {
    // for api
    Msg<GetPostRs> getPostById(UUID postId);

    Msg<PageableRs<GetPostRs>> getAll(GetPostFilter filter, int pageNumber, int pageSize);

    Msg<GetPostRs> addPost(AddPostRq rq);

    Msg<PageableRs<RecommendationRs>> getRecommend(UUID postId, int pageNumber, int pageSize);

    Msg<PageableRs<GetEnrollTutorRs>> getEnrollTutor(UUID postId, int pageNumber, int pageSize);

    Msg<Boolean> updateTutorPostState(UUID postId, UpdateTutorPostStateRq rq);

    Msg<List<GetBookingRs>> getTutorBooking();

    // for system

    PostEnt getPostEntById(UUID postId);


}

@Service
@AllArgsConstructor
@Transactional
class PostService implements IPostService {

    private final PostDAO postDAO;
    private final StudentPostDAO studentPostDAO;
    private final TutorPostDAO tutorPostDAO;

    @Override
    public Msg<GetPostRs> getPostById(UUID postId) {
        PostEnt post = getPostEntById(postId);
        if (post == null) return Msg.postNotFound();


        var rs = GetPostRs.build(post);
        return Msg.success(rs);
    }

    @Override
    public Msg<PageableRs<GetPostRs>> getAll(GetPostFilter filter, int pageNumber, int pageSize) {
        if (!filter.verify()) return Msg.fail(filter);


        var rs = PageableRs.build(DataStore.posts.values().stream().toList(), pageNumber, pageSize, GetPostRs::build);
        return Msg.success(rs);
    }

    @Override
    public Msg<GetPostRs> addPost(AddPostRq rq) {
        if (!rq.verify()) return Msg.fail(rq.failCode, rq.failReason);

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

    @Override
    public Msg<PageableRs<RecommendationRs>> getRecommend(UUID postId, int pageNumber, int pageSize) {
        if (!PermissionCheck.getPostRecommend(postId)) return Msg.notAllow();

        var post = getPostEntById(postId);
        if (post == null) {
            return Msg.fail(ResponseCode.postNotFound, ResponseMsg.postNotFound);
        }
        // TODO: 12/3/2022 save recommend result in data store
        var matchingOutputs = MatchingSystem.findMatching(post, DataStore.tutors.values().stream().toList());
        var rs = PageableRs.build(matchingOutputs, pageNumber, pageSize, RecommendationRs::build);
        return Msg.success(rs);
    }


    @Override
    public Msg<PageableRs<GetEnrollTutorRs>> getEnrollTutor(UUID postId, int pageNumber, int pageSize) {
        if (!PermissionCheck.enrollPost(postId)) return Msg.notAllow();
        var tutorPostRel = tutorPostDAO.getAllByPost(postId);
        var rs = PageableRs.build(tutorPostRel, pageNumber, pageSize, GetEnrollTutorRs::build);
        return Msg.success(rs);
    }

    @Override
    public PostEnt getPostEntById(UUID postId) {
        if (DataStore.posts.containsKey(postId)) {
            return DataStore.posts.get(postId);
        }
        return postDAO.getById(postId);
    }

    @Override
    public Msg<Boolean> updateTutorPostState(UUID postId, UpdateTutorPostStateRq rq) {
        if (!rq.verify()) return Msg.fail(rq);
        if (!PermissionCheck.updateTutorPostState(postId)) return Msg.notAllow();
        if (getPostById(postId) == null) return Msg.postNotFound();
        if (ApplicationContext.isTutor()) return updateTutorPostStateByTutor(postId, rq.state);
        return updateTutorPostStateByStudent(postId, UUID.fromString(rq.tutorId), rq.state);
    }

    @Override
    public Msg<List<GetBookingRs>> getTutorBooking() {
        var tutorPosts = tutorPostDAO.getAllByTutorAndRequester(ApplicationContext.currentUserId(), PostRequester.STUDENT);
        var rs = tutorPosts.stream()
                .map(tutorPost -> GetBookingRs.build(getPostEntById(tutorPost.id.rightId), tutorPost))
                .filter(tutorPost -> !tutorPost.state.equals(TutorPostState.CANCEL))
                .toList();
        return Msg.success(rs);
    }

    private Msg<Boolean> updateTutorPostStateByStudent(UUID postId, UUID tutorId, String state) {
        // TODO: 12/6/2022 enhance response if error
        if (!PermissionCheck.updateTutorPostStateByStudent(postId)) return Msg.notAllow();
        if (!DataStore.tutors.containsKey(tutorId)) return Msg.userNotFound();
        var tutorPostRel = tutorPostDAO.getByTutorAndPost(tutorId, postId);
        if (tutorPostRel == null) {
            if (!state.equals(TutorPostState.CREATE)) return Msg.invalidParam();
            createTutorPostRel(tutorId, postId, PostRequester.STUDENT, state);
            return Msg.success(true);
        }
        if (!tutorPostRel.state.equals(TutorPostState.CREATE)) return Msg.invalidParam();
        if (tutorPostRel.requester.equals(PostRequester.TUTOR)) {
            if (state.equals(TutorPostState.APPROVE) || state.equals(TutorPostState.REJECT)) {
                updateTutorPostRel(tutorId, postId, state);
                // TODO: 12/6/2022 notify
                return Msg.success(true);
            }
        }
        if (tutorPostRel.requester.equals(PostRequester.STUDENT)) {
            if (state.equals(TutorPostState.CANCEL)) {
                updateTutorPostRel(tutorId, postId, state);
                return Msg.success(true);
            }
        }
        return Msg.invalidParam();

    }

    private Msg<Boolean> updateTutorPostStateByTutor(UUID postId, String state) {
        var tutorId = ApplicationContext.currentUserId();
        var tutorPostRel = tutorPostDAO.getByTutorAndPost(tutorId, postId);
        if (tutorPostRel == null) {
            if (!state.equals(TutorPostState.CREATE)) return Msg.invalidParam();
            createTutorPostRel(tutorId, postId, PostRequester.TUTOR, state);
            return Msg.success(true);
        }
        if (!tutorPostRel.state.equals(TutorPostState.CREATE)) return Msg.invalidParam();
        if (tutorPostRel.requester.equals(PostRequester.TUTOR)) {
            if (state.equals(TutorPostState.CANCEL)) {
                updateTutorPostRel(tutorId, postId, state);
                return Msg.success(true);
            }
        }
        if (tutorPostRel.requester.equals(PostRequester.STUDENT)) {
            if (state.equals(TutorPostState.APPROVE) || state.equals(TutorPostState.REJECT)) {
                updateTutorPostRel(tutorId, postId, state);
                // TODO: 12/6/2022 notify
                return Msg.success(true);
            }
        }
        return Msg.invalidParam();
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

    private void createTutorPostRel(UUID tutorId, UUID postID, String requester, String state) {
        var rel = TutorPostRel.create(tutorId, postID, requester, state);
        tutorPostDAO.save(rel);
    }

    private void updateTutorPostRel(UUID tutorId, UUID postId, String state) {
        var rel = tutorPostDAO.getByTutorAndPost(tutorId, postId);
        rel.state = state;
        rel.updateTime = System.currentTimeMillis();
        tutorPostDAO.save(rel);
    }


}

