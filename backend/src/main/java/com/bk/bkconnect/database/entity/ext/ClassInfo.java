package com.bk.bkconnect.database.entity.ext;

import javax.persistence.Embeddable;
import java.util.List;

@Embeddable
public class ClassInfo {
    public Integer timesPerWeek;
    public Float hoursPerLesson;
    public String availableTime;
    public String fee;
    public String noStudents;
    public String description;
}
