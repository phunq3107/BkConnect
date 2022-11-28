package com.bk.bkconnect;

import com.bk.bkconnect.database.constant.UserRole;
import com.bk.bkconnect.database.entity.PostEnt;
import com.bk.bkconnect.database.entity.SubjectEnt;
import com.bk.bkconnect.database.entity.TutorEnt;
import com.bk.bkconnect.database.entity.UserEnt;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

public class DataStore {

    public static final ConcurrentMap<UUID, UserEnt> users = new ConcurrentHashMap<>();
    public static final ConcurrentMap<UUID, TutorEnt> tutors = new ConcurrentHashMap<>();
    public static final ConcurrentMap<UUID, SubjectEnt> subjects = new ConcurrentHashMap<>();

    public static final ConcurrentMap<UUID, PostEnt> posts = new ConcurrentHashMap<>();

    public static final ConcurrentMap<UUID, Set<UUID>> postFollower = new ConcurrentHashMap<>();

    public static void updateUser(UserEnt user) {
        if (user == null) return;
        users.put(user.id, user);
        if (UserRole.TUTOR.equalsIgnoreCase(user.role)) tutors.put(user.id, (TutorEnt) user);
    }

    public static void updatePost(PostEnt post) {
        if (post == null) return;
        posts.put(post.id, post);
    }

    public static void addPostFollower(UUID postId, UUID userId) {
        postFollower.putIfAbsent(postId, new HashSet<>());
        postFollower.get(postId).add(userId);
    }

    public static void removePostFollower(UUID postId, UUID userId) {
        if (postFollower.containsKey(postId)) postFollower.get(postId).remove(userId);
    }

}
