package com.bk.bkconnect.database.entity;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;

@Entity
public class TutorSubjectRel extends AbstractEnt {

    public String level;
    public Long expectedFee;
    public String certificate;

    @ManyToOne
    public TutorEnt tutor;

    @ManyToOne
    public SubjectEnt subject;
}
