package com.bk.bkconnect;

import com.bk.bkconnect.controller.SessionController;
import com.bk.bkconnect.controller.TutorController;
import com.bk.bkconnect.controller.UserController;
import com.bk.bkconnect.database.driver.*;
import com.bk.bkconnect.database.entity.*;
import com.bk.bkconnect.database.entity.ext.TutorSubject;
import com.bk.bkconnect.database.entity.ext.UserInfo;
import com.bk.bkconnect.domain.request.UpdateTutorRq;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Set;
import java.util.UUID;

@Component
@AllArgsConstructor
public class BackendTest {
    UserController userController;
    SessionController sessionController;
    TutorController tutorController;

    UserDAO userDAO;
    TutorDAO tutorDAO;
    StudentDAO studentDAO;
    GroupSubjectDAO groupSubjectDAO;
    SubjectDAO subjectDAO;
    static UUID adminId = UUID.fromString("68dcb2e7-5f35-4cf7-a683-5b349ead2cb1");
    static UUID tutor1Id = UUID.fromString("5240568a-48b9-407c-bf95-868bc1053dd5");
    static UUID student1Id = UUID.fromString("4496e9b4-13b1-4007-a376-ad3ad619b4a3");
    static UUID groupSubject1Id = UUID.fromString("ebf5df4d-14d6-4734-a988-d6b5a5e90718");
    static UUID subject1Id = UUID.fromString("7f4a2e93-564e-417b-99ba-9181f880e1fa");
    static UUID subject2Id = UUID.fromString("4b0a27c5-7056-414f-8903-d7636dd5ec40");

    public void initData() {
        initAdmin();
        initSubject();
        initTutor();
        initStudent();

    }

    public void test() {
        {
//            var rq = new LoginRq();
//            rq.username = "phunq123";
//            rq.password = "12345678";
//            var rs = sessionController.login(rq);
//            System.out.println(rs.toJson());
        }
        {
//            var rq = new RegisterRq();
//            rq.username = "phunq123";
//            rq.password = "12345678";
//            rq.role = "TUTOR";
//            var rs = userController.addUser(rq);
//            System.out.println(rs.toJson());
        }
        {
//            var uid = tutor1Id.toString();
//            var rq = new UpdateUserRq();
//            rq.fullname = "Tutor fullname";
//            rq.avatar = "Tutor avatar";
//            System.out.println(userController.updateUserInfo(uid, rq).toJson());
//            System.out.println(userController.getById(uid).toJson());

        }
        {
//            var rs = userController.getById("68dcb2e7-5f35-4cf7-a683-5b349ead2cb1");
//            System.out.println(rs.toJson());
        }
        {
            System.out.println(tutorController.getTutorById(tutor1Id.toString()).toJson());
        }
        {
            ;
            var rq = new UpdateTutorRq();
            rq.selfDescription = "My name is Tutor";
            rq.subjects = List.of(
                    TutorSubject.builder().subjectId(subject1Id).level("1,2").expectedFee(200L).build(),
                    TutorSubject.builder().subjectId(subject2Id).level("1,2,3").expectedFee(100L).build()
            );
            System.out.println(tutorController.updateTutorInfo(tutor1Id.toString(), rq).toJson());
            System.out.println(tutorController.getTutorById(tutor1Id.toString()).toJson());
        }
    }

    private void initAdmin() {
        UserEnt admin = new AdminEnt();
        admin.id = adminId;
        admin.username = "admin";
        admin.password = "0DTzga2OUQ838bd9941f9d88b43d3840db46eab2ee"; //12345678
        admin.role = UserEnt.UserRole.ADMIN;
        admin.userInfo = new UserInfo();
        userDAO.saveAndFlush(admin);
    }

    private void initSubject() {
        var group1 = new GroupSubjectEnt();
        group1.id = groupSubject1Id;
        group1.name = "Math";
        groupSubjectDAO.saveAndFlush(group1);

        var subject1 = new SubjectEnt();
        subject1.id = subject1Id;
        subject1.name = "Math 1";
        subject1.groupSubject = group1;
        subjectDAO.saveAndFlush(subject1);

        var subject2 = new SubjectEnt();
        subject2.id = subject2Id;
        subject2.name = "Math 2";
        subject2.groupSubject = group1;
        subjectDAO.saveAndFlush(subject2);


    }

    private void initTutor() {
        TutorEnt tutor1 = new TutorEnt();
        tutor1.id = tutor1Id;
        tutor1.username = "tutor";
        tutor1.password = "0DTzga2OUQ838bd9941f9d88b43d3840db46eab2ee"; //12345678
        tutor1.role = UserEnt.UserRole.TUTOR;
        tutor1.userInfo = new UserInfo();
        tutor1.subjects = Set.of(
                TutorSubject.builder().subjectId(subject1Id).level("1,2,3").expectedFee(100L).build()
        );
        tutorDAO.saveAndFlush(tutor1);
    }

    private void initStudent() {
        StudentEnt student = new StudentEnt();
        student.id = student1Id;
        student.username = "student";
        student.password = "0DTzga2OUQ838bd9941f9d88b43d3840db46eab2ee"; //12345678
        student.role = UserEnt.UserRole.STUDENT;
        studentDAO.saveAndFlush(student);
    }
}
