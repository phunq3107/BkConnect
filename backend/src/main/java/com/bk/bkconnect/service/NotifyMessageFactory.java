package com.bk.bkconnect.service;

import com.bk.bkconnect.DataStore;
import com.bk.bkconnect.common.Syntax;
import com.bk.bkconnect.database.entity.NotifyMessageEnt;
import com.bk.bkconnect.util.TagUtils;

import java.util.UUID;

public class NotifyMessageFactory {

    public static NotifyMessageEnt studentCreatePostRequest(UUID postId, UUID receiver) {
        var rs = new NotifyMessageEnt();
        var postTitle = Syntax.Try(() -> DataStore.posts.get(postId).title, postId.toString());
        var postTag = TagUtils.postTag(postTitle, postId);
        rs.id = UUID.randomUUID();
        rs.title = "Bạn nhận được yêu cầu nhận lớp từ học viên tại bài đăng %s".formatted(postTag);
        rs.content = "Bạn nhận được yêu cầu nhận lớp từ học viên tại bài đăng %s".formatted(postTag);
        rs.receiver = receiver;
        rs.timestamp = System.currentTimeMillis();
        return rs;
    }

    public static NotifyMessageEnt tutorCreatePostRequest(UUID tutorId, UUID postId, UUID receiver) {
        var rs = new NotifyMessageEnt();
        var tutorName = Syntax.Try(() -> DataStore.tutors.get(tutorId).userInfo.fullname, DataStore.tutors.get(tutorId).username);
        var tutorTag = TagUtils.tutorTag(tutorName, tutorId);
        var postTitle = Syntax.Try(() -> DataStore.posts.get(postId).title, postId.toString());
        var postTag = TagUtils.postTag(postTitle, postId);
        rs.id = UUID.randomUUID();
        rs.title = "Bạn nhận được yêu cầu đăng kí nhận lớp từ  %s tại bài đăng %s".formatted(tutorTag, postTag);
        rs.content = "Bạn nhận được yêu cầu đăng kí nhận lớp từ  %s tại bài đăng %s".formatted(tutorTag, postTag);
        rs.receiver = receiver;
        rs.timestamp = System.currentTimeMillis();
        return rs;
    }

    public static NotifyMessageEnt tutorApprovePost(UUID tutorId, UUID postId, UUID receiver) {
        var rs = new NotifyMessageEnt();
        var tutorName = Syntax.Try(() -> DataStore.tutors.get(tutorId).userInfo.fullname, DataStore.tutors.get(tutorId).username);
        var tutorTag = TagUtils.tutorTag(tutorName, tutorId);
        var postTitle = Syntax.Try(() -> DataStore.posts.get(postId).title, postId.toString());
        var postTag = TagUtils.postTag(postTitle, postId);
        rs.id = UUID.randomUUID();
        rs.title = "%s đã chấp nhận yêu cầu từ bài đăng %s của bạn".formatted(tutorTag, postTag);
        rs.content = "%s đã chấp nhận yêu cầu từ bài đăng %s của bạn".formatted(tutorTag, postTag);
        rs.receiver = receiver;
        rs.timestamp = System.currentTimeMillis();
        return rs;
    }

    public static NotifyMessageEnt tutorRejectPost(UUID tutorId, UUID postId, UUID receiver) {
        var rs = new NotifyMessageEnt();
        var tutorName = Syntax.Try(() -> DataStore.tutors.get(tutorId).userInfo.fullname, DataStore.tutors.get(tutorId).username);
        var tutorTag = TagUtils.tutorTag(tutorName, tutorId);
        var postTitle = Syntax.Try(() -> DataStore.posts.get(postId).title, postId.toString());
        var postTag = TagUtils.postTag(postTitle, postId);
        rs.id = UUID.randomUUID();
        rs.title = "%s đã từ chối yêu cầu cầu từ bài đăng %s của bạn".formatted(tutorTag, postTag);
        rs.content = "%s đã từ chối yêu cầu từ bài đăng %s của bạn".formatted(tutorTag, postTag);
        rs.receiver = receiver;
        rs.timestamp = System.currentTimeMillis();
        return rs;
    }

    public static NotifyMessageEnt studentApproveTutor(UUID postId, UUID receiver) {
        var rs = new NotifyMessageEnt();
        var postTitle = Syntax.Try(() -> DataStore.posts.get(postId).title, postId.toString());
        var postTag = TagUtils.postTag(postTitle, postId);
        rs.id = UUID.randomUUID();
        rs.title = "Học viên đã chấp thuận yêu cầu nhận lớp của bạn tại bài đăng %s mà bạn đăng kí".formatted(postTag);
        rs.content = "Học viên đã chấp thuận yêu cầu nhận lớp của bạn tại bài đăng %s mà bạn đăng kí".formatted(postTag);
        rs.receiver = receiver;
        rs.timestamp = System.currentTimeMillis();
        return rs;
    }

    public static NotifyMessageEnt studentRejectTutor(UUID postId, UUID receiver) {
        var rs = new NotifyMessageEnt();
        var postTitle = Syntax.Try(() -> DataStore.posts.get(postId).title, postId.toString());
        var postTag = TagUtils.postTag(postTitle, postId);
        rs.id = UUID.randomUUID();
        rs.title = "Học viên đã từ chối yêu cầu nhận lớp của bạn tại bài đăng %s mà bạn đăng kí".formatted(postTag);
        rs.content = "Học viên đã từ chối yêu cầu nhận lớp của bạn tại bài đăng %s mà bạn đăng kí".formatted(postTag);
        rs.receiver = receiver;
        rs.timestamp = System.currentTimeMillis();
        return rs;
    }

    public static NotifyMessageEnt createClass(UUID postId, UUID roomchatId, UUID receiver) {
        var rs = new NotifyMessageEnt();
        var postTitle = Syntax.Try(() -> DataStore.posts.get(postId).title, postId.toString());
        var postTag = TagUtils.postTag(postTitle, postId);
        var roomchatTag = TagUtils.roomchatTag("tại đây", roomchatId);
        rs.id = UUID.randomUUID();
        rs.title = "Tạo lớp thành công";
        rs.content = "Yêu cầu mở lớp cho bài đăng %s đã được chấp thuận bởi hai bên. Bây giờ, các bạn có thể liên hệ với nhau %s".formatted(postTag, roomchatTag);
        rs.receiver = receiver;
        rs.timestamp = System.currentTimeMillis();
        return rs;
    }
}
