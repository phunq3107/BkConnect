package com.bk.bkconnect;

import com.bk.bkconnect.database.constant.StudentPostState;
import com.bk.bkconnect.database.driver.PostDAO;
import com.bk.bkconnect.database.driver.StudentPostDAO;
import com.bk.bkconnect.database.driver.SubjectDAO;
import com.bk.bkconnect.database.driver.UserDAO;
import lombok.AllArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class InitRunner implements CommandLineRunner {

    private final UserDAO userDAO;
    private final SubjectDAO subjectDAO;
    private final PostDAO postDAO;
    private final StudentPostDAO studentPostDAO;

    //
    BackendTest backendTest;

    @Override
    public void run(String... args) {
        //todo: dev only
        backendTest.initData();
        // end
        userDAO.findAll().forEach(DataStore::updateUser);
        subjectDAO.findAll().forEach(subject -> {
            DataStore.subjects.put(subject.id, subject);
        });
        postDAO.findAll().forEach(DataStore::updatePost);
        // TODO: 28/11/2022 init post follower
        studentPostDAO.getAllByState(StudentPostState.JOIN).forEach(
                rel -> DataStore.addPostFollower(rel.right.id, rel.left.id)
        );

        backendTest.test();
    }
}
