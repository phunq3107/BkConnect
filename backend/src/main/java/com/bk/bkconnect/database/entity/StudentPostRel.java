package com.bk.bkconnect.database.entity;


import org.springframework.security.core.parameters.P;

import javax.persistence.Entity;
import java.util.UUID;

@Entity
public class StudentPostRel extends AbstractRel<StudentEnt, PostEnt> {

    public Long updateTime;


    public static StudentPostRel create(UUID studentId, UUID postId, String state) {
        var rs = new StudentPostRel();
        rs.id = new RelId(studentId, postId);
        rs.left = new StudentEnt();
        rs.left.id = studentId;
        rs.right = new PostEnt();
        rs.right.id = postId;
        rs.state = state;
        rs.updateTime = System.currentTimeMillis();
        return rs;
    }
}
