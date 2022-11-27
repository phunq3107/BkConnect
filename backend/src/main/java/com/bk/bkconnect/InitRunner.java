package com.bk.bkconnect;

import com.bk.bkconnect.controller.SessionController;
import com.bk.bkconnect.controller.UserController;
import com.bk.bkconnect.database.driver.StudentDAO;
import com.bk.bkconnect.database.driver.SubjectDAO;
import com.bk.bkconnect.database.driver.TutorDAO;
import com.bk.bkconnect.database.driver.UserDAO;
import com.bk.bkconnect.domain.request.UpdateUserRq;
import lombok.AllArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class InitRunner implements CommandLineRunner {

    UserDAO userDAO;
    TutorDAO tutorDAO;
    StudentDAO studentDAO;
    SubjectDAO subjectDAO;

    //
    BackendTest backendTest;

    @Override
    public void run(String... args) throws Exception {
        //todo: dev only
        backendTest.initData();
        // end
        userDAO.findAll().forEach(DataStore::updateUser);
        subjectDAO.findAll().forEach(subject -> {
            DataStore.subjects.put(subject.id, subject);
        });


        backendTest.test();
    }
}
