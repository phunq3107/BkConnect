package com.bk.bkconnect.database.entity;

import com.bk.bkconnect.database.constant.StudentClassState;
import org.hibernate.annotations.Type;

import javax.persistence.Entity;
import java.util.UUID;

@Entity
public class StudentClassRel extends AbstractEnt {
    public Long createTime;
    public Long updateTime;
    public String feedBack;
    public String description;

    @Type(type = "uuid-char")
    public UUID studentId;
    @Type(type = "uuid-char")
    public UUID classId;


    public static StudentClassRel create(UUID studentId, UUID classId) {
        var rs = new StudentClassRel();
        rs.id = UUID.randomUUID();
        rs.studentId = studentId;
        rs.classId = classId;
        rs.createTime = rs.updateTime = System.currentTimeMillis();
        rs.state = StudentClassState.JOIN;
        return rs;
    }


}
