package com.bk.bkconnect.database.entity;

import com.bk.bkconnect.database.entity.ext.Address;
import com.bk.bkconnect.database.entity.ext.TutorSubject;

import javax.persistence.*;
import java.util.List;
import java.util.Set;

@Entity
public class TutorEnt extends UserEnt {

    public String identification;
    public String selfDescription;
    public String availableTime;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "TUTOR_TEACHING_LOCATION", joinColumns = @JoinColumn(name = "TUTOR_ID"))
    public List<Address> teachingLocations;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "TUTOR_SUBJECT", joinColumns = @JoinColumn(name = "TUTOR_ID"))
    public Set<TutorSubject> subjects;

}
