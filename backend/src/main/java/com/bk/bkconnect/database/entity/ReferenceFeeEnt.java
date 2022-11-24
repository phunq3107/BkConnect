package com.bk.bkconnect.database.entity;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;

@Entity
public class ReferenceFeeEnt extends AbstractEnt {
    public Integer level;
    @ManyToOne
    public SubjectEnt subject;
}
