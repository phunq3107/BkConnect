package com.bk.bkconnect.database.entity.ext;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.Lob;
import java.util.List;

@Embeddable
public class ClassInfo {
    public Integer timesPerWeek;
    public Float hoursPerLesson;
    public String availableTime;
    public String noStudents;
    @Lob
    @Column(length = 3000)
    public String description;
}
