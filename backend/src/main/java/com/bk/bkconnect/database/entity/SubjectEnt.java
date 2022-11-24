package com.bk.bkconnect.database.entity;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;

@Entity
public class SubjectEnt extends AbstractEnt {

    public String name;
    public Integer groupSubjectOrder;
    
    @ManyToOne
    public GroupSubjectEnt groupSubject;
}
