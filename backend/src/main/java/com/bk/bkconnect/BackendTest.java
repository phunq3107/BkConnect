package com.bk.bkconnect;

import com.bk.bkconnect.common.collections.Tuple3;
import com.bk.bkconnect.controller.*;
import com.bk.bkconnect.core.matching.MatchingOutput;
import com.bk.bkconnect.core.matching.MatchingSystem;
import com.bk.bkconnect.database.constant.UserRole;
import com.bk.bkconnect.database.driver.*;
import com.bk.bkconnect.database.entity.*;
import com.bk.bkconnect.database.entity.ext.Address;
import com.bk.bkconnect.database.entity.ext.ClassInfo;
import com.bk.bkconnect.database.entity.ext.TutorSubject;
import com.bk.bkconnect.database.entity.ext.UserInfo;
import com.bk.bkconnect.domain.request.GetPostFilter;
import com.bk.bkconnect.domain.request.GetTutorFilter;
import com.bk.bkconnect.util.ObjectMapperUtils;
import com.bk.bkconnect.util.TimeUtils;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.Year;
import java.util.*;

@Component
@AllArgsConstructor
public class BackendTest {
    UserController userController;
    SessionController sessionController;
    TutorController tutorController;
    SubjectController subjectController;
    PostController postController;

    UserDAO userDAO;
    TutorDAO tutorDAO;
    StudentDAO studentDAO;
    GroupSubjectDAO groupSubjectDAO;
    SubjectDAO subjectDAO;
    PostDAO postDAO;

    static UUID admin = UUID.fromString("68dcb2e7-5f35-4cf7-a683-5b349ead2cb1");

    static UUID toanTutor1 = UUID.fromString("5240568a-48b9-407c-bf95-868bc1053dd5");
    static UUID toanTutor2 = UUID.fromString("a40b4000-1f4b-4f5d-b8a7-b2f158d7e4aa");
    static UUID toanTutor3 = UUID.fromString("95d37841-f2d9-49ed-8320-207e378301cc");
    static UUID vanTutor1 = UUID.fromString("4805b762-0c9a-41ca-a10a-782a5111f0af");
    static UUID vanTutor2 = UUID.fromString("9574ab40-63f0-459c-9dd9-e7d946bdb748");
    static UUID vanTutor3 = UUID.fromString("1b99e048-3bd9-4c45-ab4a-d34082d00452");

    static UUID student1 = UUID.fromString("4496e9b4-13b1-4007-a376-ad3ad619b4a3");
    static UUID student2 = UUID.fromString("20cf4887-b115-4465-b3f6-02402d520368");
    static UUID student3 = UUID.fromString("9bf24057-78a9-4f9d-8411-17814d37273c");
    static UUID student4 = UUID.fromString("a787c797-bcfb-457f-8845-99c222e6c5aa");

    static UUID toanGroup = UUID.fromString("ebf5df4d-14d6-4734-a988-d6b5a5e90718");
    static UUID vanGroup = UUID.fromString("1a283f1e-4607-4168-84aa-e81d0d967cb2");

    static UUID toan10 = UUID.fromString("7f4a2e93-564e-417b-99ba-9181f880e1fa");
    static UUID toan11 = UUID.fromString("4b0a27c5-7056-414f-8903-d7636dd5ec40");
    static UUID toan12 = UUID.fromString("1d81ff76-004e-4941-9b30-0e77fa2b9848");
    static UUID toanOnDaiHoc = UUID.fromString("692027f5-8680-4002-9160-b42f28a8332f");
    static UUID van10 = UUID.fromString("2b4ed9ee-d504-423a-9ab9-dec0fdcc4f3b");
    static UUID van11 = UUID.fromString("d054b3a3-26cb-4c51-87a1-b7c89fe12a7e");
    static UUID van12 = UUID.fromString("c58373e8-5fd4-417f-a69e-370bea79c03b");


    static UUID post1 = UUID.fromString("6f3c6513-d87d-4f77-9148-61a0fb47b5aa");
    static UUID post2 = UUID.fromString("1c7f9ec2-e17d-4e50-95c4-fb536b3829b9");
    static UUID post3 = UUID.fromString("104de89a-a605-45ad-8173-21d7eeac5b42");
    static UUID post4 = UUID.fromString("b011c9ae-7bdb-4c2c-922c-21bc83144669");
    static UUID post5 = UUID.fromString("82ffe56f-c326-459b-8ba7-6f1913cad5f3");
    static UUID post6 = UUID.fromString("bf34c855-7bec-43bd-8b4c-6a41b45dba07");
    static UUID post7 = UUID.fromString("466d8448-1df8-4e51-8b3b-ab1cdd52ecd6");
    static UUID post8 = UUID.fromString("0aa0bf33-cc73-4b58-9658-2d56ceef8c8e");
    static UUID post9 = UUID.fromString("93d240d6-8030-4a40-ae0f-f92902e398a3");
    static UUID post10 = UUID.fromString("92fed096-9090-4fd2-b3ab-f2f1b6ed91ad");

    static String _24x7 = new String(new char[7 * 24]).replace('\0', '1');
    static String _justEvening = new String(new char[7]).replace("\0", "000000000000000000111100");
    static String _justMorning = new String(new char[7]).replace("\0", "000000000111100000000000");


    static UUID tutor = UUID.fromString("32589634-ee95-4636-91da-c05d9c58c137");
    static UUID post = UUID.fromString("f0edb82a-b85f-492a-b273-d8440d93f54c");

    static List<String> names = List.of(
            "Hoàng Hữu Cường", "Đặng Ngọc Thuận", "Đặng Duy Khánh", "Đặng Thiên Ðức", "Nguyễn Anh Quân",
            "Trần Minh Triệu", "Trần Quang Triệu", "Trần Cao Minh", "Trần Trọng Trí", "Trần Thuận Phương"
    );

    static Random random = new Random();

    static String randomName() {
        return names.get(Math.abs(random.nextInt()) % names.size());
    }

    public void initData() {
        initAdmin();
        initSubject();
        initTutor();
        createTutor(tutor, "toanTutor", "MALE", TimeUtils.millisOf(1990), List.of(
//                        Tuple3.apply(toan10, "2", 200000L),
                        Tuple3.apply(toan11, "1", 200000L),
                        Tuple3.apply(toan12, "1", 200000L)
                ),
                _24x7
        );
        initStudent();
        initPost();
        createPost(post, "Tìm gia sư toán 10", student1, toan10, _24x7, 2, 2, 200000L, "1");
    }

    public void test() {
        var rs = MatchingSystem.findMatching(
                DataStore.posts.get(post),
//                // DataStore.tutors.values().stream().toList()
                List.of(DataStore.tutors.get(tutor))
        );
        rs.forEach(MatchingOutput::print);
    }

    private void initAdmin() {
        UserEnt admin = new AdminEnt();
        admin.id = BackendTest.admin;
        admin.username = "admin";
        admin.password = "0DTzga2OUQ838bd9941f9d88b43d3840db46eab2ee"; //12345678
        admin.role = UserRole.ADMIN;
        admin.userInfo = new UserInfo();
        userDAO.saveAndFlush(admin);
    }

    private void initSubject() {
        createGroup(toanGroup, "Toán học");
        createGroup(vanGroup, "Văn học");

        createSubject(toan10, "Toán 10", "1,1,1,1", toanGroup);
        createSubject(toan11, "Toán 11", "1,1,1", toanGroup);
        createSubject(toan12, "Toán 12", "1,1", toanGroup);
        createSubject(toanOnDaiHoc, "Toán ôn ĐH", "1", toanGroup);

        createSubject(van10, "Văn 10", "1,1,1", vanGroup);
        createSubject(van11, "Văn 11", "1,1", vanGroup);
        createSubject(van12, "Văn 12", "1", vanGroup);

    }

    private void createGroup(UUID id, String name) {
        var group = new GroupSubjectEnt();
        group.id = id;
        group.name = name;
        groupSubjectDAO.saveAndFlush(group);
    }

    private void createSubject(UUID id, String name, String order, UUID group) {
        var subject = new SubjectEnt();
        subject.id = id;
        subject.name = name;
        subject.groupSubjectOrder = order;
        subject.groupSubject = new GroupSubjectEnt();
        subject.groupSubject.id = group;
        subjectDAO.saveAndFlush(subject);
    }


    private void initTutor() {
        createTutor(toanTutor1, "toanTutor1", "MALE", TimeUtils.millisOf(1990), List.of(
                        Tuple3.apply(toan10, "1", 200000L),
                        Tuple3.apply(toan11, "1", 200000L),
                        Tuple3.apply(toan12, "1", 200000L)
                ),
                _24x7
        );
        createTutor(toanTutor2, "toanTutor2", "MALE", TimeUtils.millisOf(1991), List.of(
                        Tuple3.apply(toan10, "2", 300000L),
                        Tuple3.apply(toan11, "2", 300000L)
                ),
                _24x7
        );
        createTutor(toanTutor3, "toanTutor3", "FEMALE", TimeUtils.millisOf(1992), List.of(
                        Tuple3.apply(toan12, "3", 400000L),
                        Tuple3.apply(toanOnDaiHoc, "3", 600000L)
                ),
                _24x7
        );
        createTutor(vanTutor1, "vanTutor1", "FEMALE", TimeUtils.millisOf(1993), List.of(
                        Tuple3.apply(van10, "1", 200000L),
                        Tuple3.apply(van11, "1", 200000L)
                ),
                _justEvening
        );
        createTutor(vanTutor2, "vanTutor2", "FEMALE", TimeUtils.millisOf(1994), List.of(
                        Tuple3.apply(van10, "1", 300000L),
                        Tuple3.apply(van11, "1", 300000L),
                        Tuple3.apply(van12, "1", 300000L)
                ),
                _justEvening
        );
        createTutor(vanTutor3, "vanTutor3", "FEMALE", TimeUtils.millisOf(1995), List.of(
                        Tuple3.apply(van12, "1", 400000L)
                ),
                _justMorning
        );
    }

    private void createTutor(UUID id, String username, String gender, Long dob, List<Tuple3<UUID, String, Long>> subjects, String availableTime) {
        TutorEnt tutor = new TutorEnt();
        tutor.id = id;
        tutor.username = username;
        tutor.password = "0DTzga2OUQ838bd9941f9d88b43d3840db46eab2ee"; //12345678
        tutor.role = UserRole.TUTOR;
        tutor.userInfo = new UserInfo();
        tutor.userInfo.fullname = randomName();
        tutor.userInfo.email = username + "@gmail.com";
        tutor.userInfo.gender = gender;
        tutor.userInfo.dob = dob;
        tutor.availableTime = availableTime;
        tutor.subjects = new HashSet<>();
        for (Tuple3<UUID, String, Long> i : subjects) {
            tutor.subjects.add(TutorSubject.builder().subjectId(i._1).level(i._2).expectedFee(i._3).build());
        }
        tutor.userInfo.address = new Address();
        tutor.userInfo.address.province = "thanh_pho_ha_noi";
        tutorDAO.saveAndFlush(tutor);
    }

    private void initStudent() {
        createStudent(student1, "student1");
        createStudent(student2, "student2");
        createStudent(student3, "student3");
        createStudent(student4, "student4");
    }

    private void createStudent(UUID id, String username) {
        StudentEnt student = new StudentEnt();
        student.id = id;
        student.username = username;
        student.userInfo.fullname = randomName();
        student.password = "0DTzga2OUQ838bd9941f9d88b43d3840db46eab2ee"; //12345678
        student.role = UserRole.STUDENT;
        studentDAO.saveAndFlush(student);
    }


    private void initPost() {
        createPost(post1, "Tìm gia sư toán 10", student1, toan10, _24x7, 2, 2, 200000L, "ALL");
        createPost(post2, "Tìm gia sư toán 11", student1, toan11, _24x7, 2.5f, 2, 250000L, "ALL");
        createPost(post3, "Tìm gia sư toán 12", student1, toan12, _24x7, 1.5f, 3, 220000L, "ALL");
        createPost(post4, "Tìm gia sư văn 11", student1, van11, _24x7, 2, 3, 200000L, "ALL");
        createPost(post5, "Ôn thi khối A môn toán", student1, toanOnDaiHoc, _justEvening, 1.75f, 3, 300000L, "ALL");
    }

    private void createPost(UUID id, String title, UUID owner, UUID subject, String availableTime, float hpl, int tpw, long fee, String level) {
        PostEnt post = new PostEnt();
        post.id = id;
        post.title = title;

        post.createBy = new StudentEnt();
        post.createBy.id = owner;
        post.createTime = System.currentTimeMillis();

        post.subject = new SubjectEnt();
        post.subject.id = subject;

        post.classInfo = new ClassInfo();
        post.classInfo.availableTime = availableTime;
        post.classInfo.hoursPerLesson = hpl;
        post.classInfo.timesPerWeek = tpw;
        post.fee = fee;
        post.subjectLevel = level;

        postDAO.saveAndFlush(post);
    }

}
