package com.bk.bkconnect;

import com.bk.bkconnect.database.entity.SubjectEnt;
import com.bk.bkconnect.database.entity.TutorEnt;
import com.bk.bkconnect.database.entity.UserEnt;

import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

public class DataStore {

    public static final ConcurrentMap<UUID, UserEnt> users = new ConcurrentHashMap<>();
    public static final ConcurrentMap<UUID, TutorEnt> tutors = new ConcurrentHashMap<>();
    public static final ConcurrentMap<UUID, SubjectEnt> subjects = new ConcurrentHashMap<>();

    public static void updateUser(UserEnt user) {
        if (user == null) return;
        users.put(user.id, user);
        if (UserEnt.UserRole.TUTOR.equals(user.role)) tutors.put(user.id, (TutorEnt) user);
    }
}
