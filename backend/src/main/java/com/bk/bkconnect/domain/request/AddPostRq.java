package com.bk.bkconnect.domain.request;

import com.bk.bkconnect.DataStore;
import com.bk.bkconnect.database.entity.PostEnt;
import com.bk.bkconnect.database.entity.ext.Address;

import java.util.HashSet;
import java.util.List;
import java.util.UUID;

public class AddPostRq extends GenericRq {
    public String title;
    public String subject;
    public Integer timesPerWeek;
    public Float hoursPerLesson;
    public String availableTime;
    public List<Address> location;
    public String fee;
    public String level;
    public String gender;
    public Integer age;
    public String noStudents;
    public String description;
    public Boolean isGroup;

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
        post.classInfo.fee = fee;
        post.subjectLevel = level;
        post.tutorRequirement.age = age;
        post.tutorRequirement.gender = gender;
        post.classInfo.noStudents = noStudents;
        post.classInfo.description = description;
        post.isGroup = isGroup;

    }
}
