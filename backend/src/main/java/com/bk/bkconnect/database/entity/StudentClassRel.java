package com.bk.bkconnect.database.entity;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;

@Entity
public class StudentClassRel extends AbstractRel<StudentEnt, TutorEnt> {
    public Long joinTime;
    public String feedBack;

}
