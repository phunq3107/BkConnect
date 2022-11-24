package com.bk.bkconnect.database.entity;

import javax.persistence.Entity;
import javax.persistence.OneToOne;

@Entity
public class ClassEnt extends AbstractEnt {

    @OneToOne
    public PostEnt post;
}
