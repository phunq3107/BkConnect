package com.bk.bkconnect.database.entity;

import com.bk.bkconnect.database.constant.TutorPostState;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import java.util.UUID;

@Entity
public class TutorPostRel extends AbstractRel<TutorEnt, PostEnt> {

    public Long createTime;
    public Long updateTime;
    public String requester;

    public static TutorPostRel create(UUID tutorId, UUID postId, String requester, String state) {
        var rs = new TutorPostRel();
        rs.id = new RelId(tutorId, postId);
        rs.left = new TutorEnt();
        rs.left.id = tutorId;
        rs.right = new PostEnt();
        rs.right.id = postId;
        rs.state = state;
        rs.requester = requester;
        rs.updateTime = rs.createTime = System.currentTimeMillis();
        return rs;
    }

    public static TutorPostRel update(UUID tutorId, UUID postId, String state) {
        var rs = new TutorPostRel();
        rs.id = new RelId(tutorId, postId);
        rs.left = new TutorEnt();
        rs.left.id = tutorId;
        rs.right = new PostEnt();
        rs.right.id = postId;
        rs.state = state;
        rs.updateTime = System.currentTimeMillis();
        return rs;
    }

}
