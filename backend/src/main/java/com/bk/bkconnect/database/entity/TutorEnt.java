package com.bk.bkconnect.database.entity;

import com.bk.bkconnect.database.entity.ext.Address;
import com.bk.bkconnect.database.entity.ext.TutorSubject;
import com.bk.bkconnect.util.TimeUtils;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
public class TutorEnt extends UserEnt {

    public String identification;
    public String selfDescription;
    public String availableTime;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "TUTOR_TEACHING_LOCATION", joinColumns = @JoinColumn(name = "TUTOR_ID"))
    public List<Address> teachingLocations = new ArrayList<>();

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "TUTOR_SUBJECT", joinColumns = @JoinColumn(name = "TUTOR_ID"))
    public Set<TutorSubject> subjects = new HashSet<>();

    public int getAge() {
        if (userInfo == null || userInfo.dob == null) return -1;
        return TimeUtils.getYear(System.currentTimeMillis()) - TimeUtils.getYear(userInfo.dob);
    }

}
