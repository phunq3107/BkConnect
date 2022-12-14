package com.bk.bkconnect.database.entity;

import lombok.Builder;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;

@Entity
public class SubjectEnt extends AbstractEnt {

    public String name;
    public String groupSubjectOrder;

    @ManyToOne
    public GroupSubjectEnt groupSubject;
}
