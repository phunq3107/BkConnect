package com.bk.bkconnect.database.entity;


import javax.persistence.Entity;
import javax.persistence.ManyToOne;

@Entity
public class StudentPostRel extends AbstractEnt {

    public Long joinTime;

    @ManyToOne
    public UserEnt user;
    @ManyToOne
    public PostEnt post;
}
