package com.bk.bkconnect.database.entity;

import com.bk.bkconnect.database.constant.TutorClassState;
import org.hibernate.annotations.Type;

import javax.persistence.Entity;
import java.util.UUID;

@Entity
public class TutorClassRel extends AbstractEnt {
    public Long createTime;
    public Long updateTime;
    public String feedBack;
    public String description;

    @Type(type = "uuid-char")
    public UUID tutorId;
    @Type(type = "uuid-char")
    public UUID classId;

    public static TutorClassRel create(UUID tutorId, UUID classId) {
        var rs = new TutorClassRel();
        rs.id = UUID.randomUUID();
        rs.tutorId = tutorId;
        rs.classId = classId;
        rs.createTime = rs.updateTime = System.currentTimeMillis();
        rs.state = TutorClassState.JOIN;
        return rs;
    }
}
