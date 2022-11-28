package com.bk.bkconnect.database.entity;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;

@Entity
public class TutorPostRel extends AbstractRel<TutorEnt, PostEnt> {

    public Long createTime;
    public String requester;

}
