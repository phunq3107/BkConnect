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
import java.util.concurrent.ConcurrentSkipListSet;

public class DataStore {

    public static final ConcurrentMap<UUID, UserEnt> users = new ConcurrentHashMap<>();
    public static final ConcurrentMap<UUID, TutorEnt> tutors = new ConcurrentHashMap<>();
    public static final ConcurrentMap<UUID, SubjectEnt> subjects = new ConcurrentHashMap<>();

    public static final ConcurrentMap<UUID, PostEnt> posts = new ConcurrentHashMap<>();
    public static final ConcurrentSkipListSet<UUID> activePosts = new ConcurrentSkipListSet<>();

    public static final ConcurrentMap<UUID, Set<UUID>> postAttendees = new ConcurrentHashMap<>();

    public static final ConcurrentMap<UUID, Set<UUID>> roomchatMembers = new ConcurrentHashMap<>();

    public static void updateUser(UserEnt user) {
        if (user == null) return;
        users.put(user.id, user);
        if (UserRole.TUTOR.equalsIgnoreCase(user.role)) tutors.put(user.id, (TutorEnt) user);
    }

    public static void updatePost(PostEnt post) {
        if (post == null) return;
        posts.put(post.id, post);
    }

    public static void addPostAttendee(UUID postId, UUID userId) {
        postAttendees.putIfAbsent(postId, new HashSet<>());
        postAttendees.get(postId).add(userId);

    }

    public static void removePostAttendee(UUID postId, UUID userId) {
        if (postAttendees.containsKey(postId)) postAttendees.get(postId).remove(userId);
    }

    public static boolean addRoomchatMember(UUID roomchatId, UUID userId) {
        if (!roomchatMembers.containsKey(roomchatId))
            roomchatMembers.put(roomchatId, new HashSet<>());
        return roomchatMembers.get(roomchatId).add(userId);
    }

}
