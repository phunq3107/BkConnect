package com.bk.bkconnect.util;

import com.bk.bkconnect.service.RenderUrl;

import java.util.UUID;

public class TagUtils {

    public static String renderTag(String title, String href) {
        return renderTag(title, href, "none");
    }

    public static String renderTag(String title, String href, String style) {
        return "${title=%s|href=%s|style=%s}".formatted(title, href, style);
    }

    public static String tutorTag(String tutorName, UUID tutorId) {
        return renderTag("Gia sư " + tutorName, RenderUrl.tutorDetail(tutorId), "bold");
    }

    public static String postTag(String title, UUID postId) {
        return renderTag(title, RenderUrl.postDetail(postId), "bold");
    }

    public static String roomchatTag(String title, UUID roomchatId) {
        return renderTag(title, RenderUrl.roomchat(roomchatId));
    }


}
