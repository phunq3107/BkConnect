package com.bk.bkconnect.database.entity;


import javax.persistence.Entity;
import java.util.UUID;

@Entity
public class StudentPostRel extends AbstractRel<StudentEnt, PostEnt> {

    public Long updateTime;


    public static StudentPostRel create(UUID studentId, UUID postId, String state) {
        var rs = new StudentPostRel();
        var student = new StudentEnt();
        student.id = studentId;
        var post = new PostEnt();
        post.id = postId;
        rs.updateTime = System.currentTimeMillis();
        rs.left = student;
        rs.right = post;
        rs.id = new RelId(studentId, postId);
        rs.state = state;
        return rs;
    }
}
