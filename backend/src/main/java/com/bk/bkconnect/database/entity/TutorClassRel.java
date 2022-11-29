package com.bk.bkconnect.database.entity;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;

@Entity
public class TutorClassRel extends AbstractRel<TutorEnt, ClassEnt> {

    public Long joinTime;
    public String description;

}
