package com.bk.bkconnect.service;

import com.bk.bkconnect.DataStore;
import com.bk.bkconnect.common.rest.Msg;
import com.bk.bkconnect.common.rest.ResponseCode;
import com.bk.bkconnect.common.rest.ResponseMsg;
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
import com.bk.bkconnect.util.NotifyPublisher;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

    List<UUID> getPostAttendees(UUID postId);


}

@Service
@AllArgsConstructor
@Transactional
class PostService implements IPostService {

    private final PostDAO postDAO;
    private final StudentPostDAO studentPostDAO;
    private final TutorPostDAO tutorPostDAO;

    private final NotifyPublisher notifyPublisher;
    private final IClassService classService;


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
    public Msg<Boolean> updateTutorPostState(UUID postId, UpdateTutorPostStateRq rq) {
        if (!rq.verify()) return Msg.fail(rq);
        if (!PermissionCheck.updateTutorPostState(postId)) return Msg.notAllow();
        if (getPostById(postId) == null) return Msg.postNotFound();
        if (ApplicationContext.isTutor()) return updateTutorPostStateByTutor(postId, rq.state);
        return updateTutorPostStateByStudent(postId, UUID.fromString(rq.tutorId), rq.state);
    }

    @Override
    public Msg<List<GetBookingRs>> getTutorBooking() {
        var rs = tutorPostDAO.getAllByTutorAndRequester(ApplicationContext.currentUserId(), PostRequester.STUDENT)
                .stream()
                .map(tutorPost -> GetBookingRs.build(getPostEntById(tutorPost.postId), tutorPost))
                .filter(tutorPost -> !tutorPost.state.equals(TutorPostState.CANCEL))
                .toList();
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
    public List<UUID> getPostAttendees(UUID postId) {
        return studentPostDAO.getAllByPost(postId).stream()
                .filter(rel -> rel.state.equalsIgnoreCase(StudentPostState.JOIN))
                .map(i -> i.left.id)
                .toList();
    }

    private Msg<Boolean> updateTutorPostStateByStudent(UUID postId, UUID tutorId, String state) {
        if (!PermissionCheck.updateTutorPostStateByStudent(postId)) return Msg.notAllow();
        if (!DataStore.tutors.containsKey(tutorId)) return Msg.userNotFound();

        var rel = getLatestActiveTutorPostRel(tutorId, postId);
        if (rel == null) {
            if (!state.equals(TutorPostState.CREATE)) return Msg.invalidParam();
            createTutorPostRel(tutorId, postId, PostRequester.STUDENT, ApplicationContext.currentUserId());
            return Msg.success(true);
        }

        if (rel.requester.equals(PostRequester.TUTOR)) {
            if (state.equals(TutorPostState.APPROVE) || state.equals(TutorPostState.REJECT)) {
                updateTutorPostRel(rel, state);
                if (state.equalsIgnoreCase(TutorPostState.APPROVE)) classService.createClass(postId, tutorId);
                return Msg.success(true);
            }
        }

        if (rel.requester.equals(PostRequester.STUDENT)) {
            if (state.equals(TutorPostState.CANCEL)) {
                updateTutorPostRel(rel, state);
                return Msg.success(true);
            }
        }
        return Msg.invalidParam();

    }

    private Msg<Boolean> updateTutorPostStateByTutor(UUID postId, String state) {
        var tutorId = ApplicationContext.currentUserId();
        var ownerId = DataStore.posts.get(postId).createBy.id;
        var rel = getLatestActiveTutorPostRel(tutorId, postId);
        if (rel == null) {
            if (!state.equals(TutorPostState.CREATE)) return Msg.invalidParam();
            createTutorPostRel(tutorId, postId, PostRequester.TUTOR, null);
            return Msg.success(true);
        }

        if (rel.requester.equals(PostRequester.TUTOR)) {
            if (state.equals(TutorPostState.CANCEL)) {
                updateTutorPostRel(rel, state);
                return Msg.success(true);
            }
        }
        if (rel.requester.equals(PostRequester.STUDENT)) {
            if (state.equals(TutorPostState.APPROVE) || state.equals(TutorPostState.REJECT)) {
                updateTutorPostRel(rel, state);
                if (state.equalsIgnoreCase(TutorPostState.APPROVE)) classService.createClass(postId, tutorId);
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

    private TutorPostRel getLatestActiveTutorPostRel(UUID tutorId, UUID postId) {
        var all = tutorPostDAO.getByTutorAndPost(tutorId, postId);
        if (all == null || all.isEmpty()) return null;
        var last = all.get(all.size() - 1);
        return last.state.equalsIgnoreCase(TutorPostState.CREATE) ? last : null;
    }

    private void createTutorPostRel(UUID tutorId, UUID postID, String requester, UUID studentId) {
        var rel = TutorPostRel.create(tutorId, postID, requester, studentId);
        tutorPostDAO.save(rel);
        switch (requester.toUpperCase()) {
            case PostRequester.TUTOR ->
                    notifyPublisher.save(NotifyMessageFactory.tutorCreatePostRequest(tutorId, postID, studentId));
            case PostRequester.STUDENT ->
                    notifyPublisher.save(NotifyMessageFactory.studentCreatePostRequest(postID, tutorId));
            default -> {
            }
        }
    }

    private void updateTutorPostRel(TutorPostRel rel, String state) {
        rel.state = state;
        rel.updateTime = System.currentTimeMillis();
        tutorPostDAO.save(rel);
        switch (rel.requester.toUpperCase()) {
            case PostRequester.TUTOR -> {
                if (state.equalsIgnoreCase(TutorPostState.APPROVE))
                    notifyPublisher.save(NotifyMessageFactory.studentApproveTutor(rel.postId, rel.tutorId));
                else if (state.equalsIgnoreCase(TutorPostState.REJECT))
                    notifyPublisher.save(NotifyMessageFactory.studentRejectTutor(rel.postId, rel.tutorId));
                else if (state.equalsIgnoreCase(TutorPostState.CANCEL)) {
                    // TODO: 11/12/2022
                }
            }
            case PostRequester.STUDENT -> {
                if (state.equalsIgnoreCase(TutorPostState.APPROVE))
                    notifyPublisher.save(NotifyMessageFactory.tutorApprovePost(rel.tutorId, rel.postId, rel.studentId));
                else if (state.equalsIgnoreCase(TutorPostState.REJECT))
                    notifyPublisher.save(NotifyMessageFactory.tutorRejectPost(rel.tutorId, rel.postId, rel.studentId));
                else if (state.equalsIgnoreCase(TutorPostState.CANCEL)) {
                    // TODO: 11/12/2022
                }
            }
            default -> {
            }
        }
    }


}

