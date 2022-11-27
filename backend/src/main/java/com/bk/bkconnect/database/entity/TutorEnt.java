package com.bk.bkconnect.database.entity;

import com.bk.bkconnect.database.entity.ext.Address;

import javax.persistence.*;
import java.util.List;

@Entity
public class TutorEnt extends UserEnt {

    public String identification;
    public String description;
    public String availableTime;

    @ElementCollection
    @CollectionTable(name = "TUTOR_TEACHING_LOCATION", joinColumns = @JoinColumn(name = "TUTOR_ID"))
    public List<Address> teachingLocations;

    @OneToMany(mappedBy = "tutor", fetch = FetchType.EAGER)
    public List<TutorSubjectRel> subjects;

}
