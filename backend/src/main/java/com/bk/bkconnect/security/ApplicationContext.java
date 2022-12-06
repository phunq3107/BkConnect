package com.bk.bkconnect.security;

import com.bk.bkconnect.database.constant.UserRole;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.UUID;

public class ApplicationContext {

    public static Authentication getAuthentication() {
        return SecurityContextHolder.getContext().getAuthentication();
    }

    public static SessionUser currentUser() {
        var authentication = getAuthentication();
        if (authentication == null) return null;
        return (SessionUser) authentication.getPrincipal();
    }

    public static UUID currentUserId() {
        return currentUser().id;
    }

    public static String currentUserRole() {
        return currentUser().role;
    }

    public static boolean isAdmin() {
        return UserRole.ADMIN.equals(currentUserRole());
    }

    public static boolean isTutor() {
        return UserRole.TUTOR.equals(currentUserRole());
    }

    public static boolean isStudent() {
        return UserRole.STUDENT.equals(currentUserRole());
    }

    public static void setCurrentUser(Authentication authentication) {
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }


}
