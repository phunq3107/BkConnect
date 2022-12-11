package com.bk.bkconnect.service;

import com.bk.bkconnect.DataStore;
import com.bk.bkconnect.database.driver.ClassDAO;
import com.bk.bkconnect.database.driver.StudentClassDAO;
import com.bk.bkconnect.database.driver.TutorClassDAO;
import com.bk.bkconnect.database.entity.ClassEnt;
import com.bk.bkconnect.database.entity.StudentClassRel;
import com.bk.bkconnect.database.entity.TutorClassRel;
import com.bk.bkconnect.util.NotifyPublisher;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.UUID;

public interface IClassService {

    void createClass(UUID postId, UUID tutorId);
}

@Service
@Slf4j
class ClassService implements IClassService {

    @Autowired
    private StudentClassDAO studentClassDAO;
    @Autowired
    private TutorClassDAO tutorClassDAO;
    @Autowired
    private ClassDAO classDAO;
    @Autowired
    @Lazy
    private IPostService postService;

    @Autowired
    private IRoomchatService roomchatService;

    @Autowired
    private NotifyPublisher notifyPublisher;

    @Override
    public void createClass(UUID postId, UUID tutorId) {
        log.info("Create class {}", postId);
        var clazz = ClassEnt.createClass(DataStore.posts.get(postId));
        classDAO.saveAndFlush(clazz);

        var studentIds = postService.getPostAttendees(postId);
        var userIds = new ArrayList<UUID>();
        userIds.add(tutorId);
        userIds.addAll(studentIds);

        studentIds.forEach(studentId -> createStudentClassRel(studentId, clazz.id));
        createTutorClassRel(tutorId, clazz.id);

        roomchatService.createRoomchat(postId, userIds);

        // notify
        userIds.forEach(userId ->
                notifyPublisher.save(NotifyMessageFactory.createClass(postId, postId, userId))
        );


    }


    private void createStudentClassRel(UUID studentId, UUID classId) {
        var rel = StudentClassRel.create(studentId, classId);
        studentClassDAO.saveAndFlush(rel);
    }

    private void createTutorClassRel(UUID tutorId, UUID classId) {
        var rel = TutorClassRel.create(tutorId, classId);
        tutorClassDAO.save(rel);
    }


}
