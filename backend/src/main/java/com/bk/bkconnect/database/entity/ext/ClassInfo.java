package com.bk.bkconnect.database.entity.ext;

import javax.persistence.Embeddable;

@Embeddable
public class ClassInfo {
    public Integer timesPerWeek;
    public Float hoursPerLesson;
    public String availableTime;
    public String location; // TODO: 24/11/2022
    public String fee;
    public String noStudents;
    public String description;
}
