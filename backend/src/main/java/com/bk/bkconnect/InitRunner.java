package com.bk.bkconnect;

import com.bk.bkconnect.database.constant.PostState;
import com.bk.bkconnect.database.constant.StudentPostState;
import com.bk.bkconnect.database.driver.*;
import lombok.AllArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.Objects;

@Component
@AllArgsConstructor
@Transactional
public class InitRunner implements CommandLineRunner {

    private final UserDAO userDAO;
    private final SubjectDAO subjectDAO;
    private final PostDAO postDAO;
    private final StudentPostDAO studentPostDAO;

    private final RoomchatDAO roomchatDAO;

    //
    BackendTest backendTest;

    @Override
    public void run(String... args) {
        backendTest.initData();
        // end
        userDAO.findAll().forEach(DataStore::updateUser);
        subjectDAO.findAll().forEach(subject -> {
            DataStore.subjects.put(subject.id, subject);
        });
        postDAO.findAll().forEach(post -> {
            DataStore.updatePost(post);
            if (Objects.equals(post.state, PostState.ACTIVE)) DataStore.activePosts.add(post.id);
        });
        // TODO: 28/11/2022 init post follower
        studentPostDAO.getAllByState(StudentPostState.JOIN).forEach(
                rel -> DataStore.addPostAttendee(rel.right.id, rel.left.id)
        );

        //roomchats
        roomchatDAO.findAll().forEach(roomchat -> {
            roomchat.users.forEach(member -> DataStore.addRoomchatMember(roomchat.id, member.id));
        });

        backendTest.test();
    }
}
