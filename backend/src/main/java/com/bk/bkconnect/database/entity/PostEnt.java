package com.bk.bkconnect.database.entity;

import com.bk.bkconnect.database.entity.ext.CensorInfo;
import com.bk.bkconnect.database.entity.ext.ClassInfo;
import com.bk.bkconnect.database.entity.ext.TutorRequirement;

import javax.persistence.*;
import java.util.List;

@Entity
public class PostEnt extends AbstractEnt {
    public String title;
    @Embedded
    public TutorRequirement tutorRequirement;
    @Embedded
    public ClassInfo classInfo;
    public Long createTime;
    public Long updateTime;
    public Integer subjectLevel;

    @ElementCollection
    @CollectionTable(name = "POST_CENSOR", joinColumns = @JoinColumn(name = "POST_ID"))
    public List<CensorInfo> censorInfos;

    @ManyToOne
    public UserEnt createBy;

    @ManyToOne
    public UserEnt updateBy;

    @ManyToOne
    public SubjectEnt subject;
}
