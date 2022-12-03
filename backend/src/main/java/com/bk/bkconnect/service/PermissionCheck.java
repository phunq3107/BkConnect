package com.bk.bkconnect.service;

import com.bk.bkconnect.database.constant.UserRole;

import java.util.UUID;

import static com.bk.bkconnect.security.ApplicationContext.currentUserId;
import static com.bk.bkconnect.security.ApplicationContext.currentUserRole;

public class PermissionCheck {
    public static boolean updateUserInfo(UUID dest) {
        return dest.equals(currentUserId());
    }

    public static boolean updateTutorInfo(UUID dest) {
        return dest.equals(currentUserId())
                && UserRole.TUTOR.equalsIgnoreCase(currentUserRole());
    }

    public static boolean getPostRecommend(UUID postId) {
        // TODO: 12/3/2022
        return true;
    }

    public static boolean enrollPost(UUID postId) {
        // TODO: 12/3/2022
        return true;
    }

    public static boolean getEnrollTutor(UUID postId){
        // TODO: 12/3/2022
        return true;
    }


}
