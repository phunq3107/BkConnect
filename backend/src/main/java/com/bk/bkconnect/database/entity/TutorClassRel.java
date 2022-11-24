package com.bk.bkconnect.database.entity;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;

@Entity
public class TutorClassRel extends AbstractEnt {

    public Long joinTime;
    public String description;

    @ManyToOne
    public TutorEnt tutor;

    @ManyToOne
    public ClassEnt classEnt;

}
