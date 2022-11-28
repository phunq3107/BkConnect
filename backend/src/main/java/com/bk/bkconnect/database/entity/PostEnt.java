package com.bk.bkconnect.database.entity;

import com.bk.bkconnect.database.entity.ext.Address;
import com.bk.bkconnect.database.entity.ext.CensorInfo;
import com.bk.bkconnect.database.entity.ext.ClassInfo;
import com.bk.bkconnect.database.entity.ext.TutorRequirement;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
public class PostEnt extends AbstractEnt {
    public String title;
    @Embedded
    public TutorRequirement tutorRequirement;
    @Embedded
    public ClassInfo classInfo;
    public Long createTime;
    public Long updateTime;
    public String subjectLevel;
    public Boolean isGroup;

    @ElementCollection
    @CollectionTable(name = "POST_CENSOR", joinColumns = @JoinColumn(name = "POST_ID"))
    public Set<CensorInfo> censorInfos = new HashSet<>();

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "POST_LOCATION", joinColumns = @JoinColumn(name = "POST_ID"))
    public Set<Address> locations= new HashSet<>();

    @ManyToOne
    public UserEnt createBy;

    @ManyToOne
    public UserEnt updateBy;

    @ManyToOne
    public SubjectEnt subject;

    @Override
    public void initNullField() {
        super.initNullField();
        if(tutorRequirement==null) tutorRequirement = new TutorRequirement();
        if(classInfo==null) classInfo = new ClassInfo();
    }
}
