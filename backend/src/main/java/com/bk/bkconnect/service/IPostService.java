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

    Msg<String> updateTutorPostState(UUID postId, UpdateTutorPostStateRq rq);


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
    public Msg<String> updateTutorPostState(UUID postId, UpdateTutorPostStateRq rq) {
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

    private Msg<String> updateTutorPostStateByStudent(UUID postId, UUID tutorId, String state) {
        if (!PermissionCheck.updateTutorPostStateByStudent(postId)) return Msg.notAllow();
        if (!DataStore.tutors.containsKey(tutorId)) return Msg.userNotFound();

        var rel = getLatestActiveTutorPostRel(tutorId, postId);
        if (rel == null) {
            if (!state.equals(TutorPostState.CREATE)) return Msg.success("Thao tác không hợp lệ");
            createTutorPostRel(tutorId, postId, PostRequester.STUDENT, ApplicationContext.currentUserId());
            return Msg.success("Tạo yêu cầu thành công");
        }

        if (rel.requester.equals(PostRequester.TUTOR)) {
            switch (state) {
                case TutorPostState.APPROVE, TutorPostState.REJECT -> {
                    updateTutorPostRel(rel, state);
                    if (state.equalsIgnoreCase(TutorPostState.APPROVE)) startClass(postId, tutorId);
                    return Msg.success("Thao tác thành công");
                }
                case TutorPostState.CREATE -> {
                    return Msg.success("Bạn đã nhận yêu cầu từ gia sư này từ trước");
                }
                default -> {
                }
            }
        }

        if (rel.requester.equals(PostRequester.STUDENT)) {
            switch (state) {
                case TutorPostState.CANCEL -> {
                    updateTutorPostRel(rel, state);
                    return Msg.success("Hủy yêu cầu thành công");
                }
                default -> {
                }
            }
        }
        return Msg.success("Thao tác không hợp lệ");

    }

    private Msg<String> updateTutorPostStateByTutor(UUID postId, String state) {
        var tutorId = ApplicationContext.currentUserId();
        var ownerId = DataStore.posts.get(postId).createBy.id;
        var rel = getLatestActiveTutorPostRel(tutorId, postId);
        if (rel == null) {
            if (!state.equals(TutorPostState.CREATE)) return Msg.success("Thao tác không hợp lệ");
            createTutorPostRel(tutorId, postId, PostRequester.TUTOR, null);
            return Msg.success("Tạo yêu cầu thành công");
        }

        if (rel.requester.equals(PostRequester.TUTOR)) {
            switch (state) {
                case TutorPostState.CANCEL -> {
                    updateTutorPostRel(rel, state);
                    return Msg.success("Hủy yêu cầu thành công");
                }
                default -> {
                }
            }
        }
        if (rel.requester.equals(PostRequester.STUDENT)) {
            switch (state) {
                case TutorPostState.APPROVE, TutorPostState.REJECT -> {
                    updateTutorPostRel(rel, state);
                    if (state.equalsIgnoreCase(TutorPostState.APPROVE)) startClass(postId, tutorId);
                    return Msg.success("Thao tác thành công");
                }
                case TutorPostState.CREATE -> {
                    return Msg.success("Bạn đã nhận yêu cầu từ bài post này từ trước");
                }
                default -> {
                }
            }
        }
        return Msg.success("Thao tác không hợp lệ");
    }


    private void updateStudentPostRel(UUID studentId, UUID postId, String state) {
        var rel = StudentPostRel.create(studentId, postId, state);
        studentPostDAO.saveAndFlush(rel);
        switch (state.toUpperCase()) {
            case StudentPostState.JOIN -> DataStore.addPostAttendee(postId, studentId);
            case StudentPostState.LEAVE -> DataStore.removePostAttendee(postId, studentId);
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
            case PostRequester.TUTOR -> getPostAttendees(postID).forEach(id -> {
                notifyPublisher.save(NotifyMessageFactory.tutorCreatePostRequest(tutorId, postID, id));
            });
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

    private void startClass(UUID postId, UUID tutorId) {
        var post = DataStore.posts.get(postId);
        post.state = PostState.DONE;
        postDAO.save(post);
        DataStore.updatePost(post);
        DataStore.activePosts.remove(postId);

        classService.createClass(postId, tutorId);
    }


}

