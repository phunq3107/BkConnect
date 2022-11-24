package com.bk.bkconnect.database.entity;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;

@Entity
public class StudentClassRel extends AbstractEnt {
    public Long joinTime;
    public String feedBack;

    @ManyToOne
    public StudentEnt student;

    @ManyToOne
    public TutorEnt tutor;
}
