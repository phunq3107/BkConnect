package com.bk.bkconnect.domain.request;

import com.bk.bkconnect.DataStore;
import com.bk.bkconnect.database.entity.PostEnt;
import com.bk.bkconnect.database.entity.ext.Address;

import java.util.HashSet;
import java.util.List;
import java.util.UUID;

public class AddPostRq extends GenericRq {
    public String title;
    public String subject; // subjectId
    public Integer timesPerWeek; // int
    public Float hoursPerLesson; // float
    public String availableTime; // 7*24
    public List<Address> location;
    public Long fee; // int, default = -1 // change: min, max
    public String level; // all, 1: sinh vien, 2: giao vien, 3: gia su
    public String gender; // all / male / female
    public Float distance;
    public String age; // all / min,max
    public String noStudents; // all / min,max
    public String description; // string
    public Boolean isGroup; // true/false

    @Override
    public boolean verify() {
        // TODO: 28/11/2022
        return super.verify();
    }

    public void flush(PostEnt post) {
        post.initNullField();
        post.title = title;
        post.subject = DataStore.subjects.get(UUID.fromString(subject));
        post.classInfo.timesPerWeek = timesPerWeek;
        post.classInfo.hoursPerLesson = hoursPerLesson;
        post.classInfo.availableTime = availableTime;
        post.locations = location == null ? null : new HashSet<>(location);
        post.fee = fee;
        post.subjectLevel = level;
        post.tutorRequirement.age = age;
        post.tutorRequirement.gender = gender;
        post.classInfo.noStudents = noStudents;
        post.classInfo.description = description;
        post.isGroup = isGroup;
        post.distance = distance;

    }
}
