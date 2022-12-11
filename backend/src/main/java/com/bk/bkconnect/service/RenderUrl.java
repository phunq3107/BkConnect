package com.bk.bkconnect.service;

import java.util.UUID;

public class RenderUrl {
    public static String postDetail(UUID postId) {
        return "/post/view/%s".formatted(postId.toString());
    }

    public static String tutorDetail(UUID tutorId) {
        return "/tutor/view/%s".formatted(tutorId.toString());
    }

    public static String roomchat(UUID roomchatId) {
        return "/chat?room=%s".formatted(roomchatId);
    }
}
