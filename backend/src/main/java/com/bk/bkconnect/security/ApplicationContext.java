package com.bk.bkconnect.security;

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

    public static void setCurrentUser(Authentication authentication) {
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }


}
