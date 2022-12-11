package com.bk.bkconnect.database.entity;

import com.bk.bkconnect.database.constant.TutorPostState;
import org.hibernate.annotations.Type;

import javax.persistence.Entity;
import java.util.UUID;

@Entity
public class TutorPostRel extends AbstractEnt {

    public Long createTime;
    public Long updateTime;
    public String requester;

    @Type(type = "uuid-char")
    public UUID tutorId;
    @Type(type = "uuid-char")
    public UUID postId;
    @Type(type = "uuid-char")
    public UUID studentId;

    public static TutorPostRel create(UUID tutorId, UUID postId, String requester, UUID studentId) {
        var rs = new TutorPostRel();
        rs.id = UUID.randomUUID();
        rs.tutorId = tutorId;
        rs.postId = postId;
        rs.studentId = studentId;
        rs.state = TutorPostState.CREATE;
        rs.requester = requester;
        rs.updateTime = rs.createTime = System.currentTimeMillis();
        return rs;
    }
}
