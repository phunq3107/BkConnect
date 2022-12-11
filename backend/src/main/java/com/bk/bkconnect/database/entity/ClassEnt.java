package com.bk.bkconnect.database.entity;

import javax.persistence.Entity;
import javax.persistence.OneToOne;

@Entity
public class ClassEnt extends AbstractEnt {

    @OneToOne
    public PostEnt post;

    public Long createTime;

    public static ClassEnt createClass(PostEnt post) {
        var rs = new ClassEnt();
        rs.createTime = System.currentTimeMillis();
        rs.id = post.id;
        rs.post = post;
        return rs;
    }
}
