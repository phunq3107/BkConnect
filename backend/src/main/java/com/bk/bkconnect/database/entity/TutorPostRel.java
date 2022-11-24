package com.bk.bkconnect.database.entity;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;

@Entity
public class TutorPostRel extends AbstractEnt {

    public Long createTime;
    public String requester;

    @ManyToOne
    public TutorEnt tutor;

    @ManyToOne
    public PostEnt post;
}
