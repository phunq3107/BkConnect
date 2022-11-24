package com.bk.bkconnect.database.entity;

import com.bk.bkconnect.database.entity.ext.Address;

import javax.persistence.CollectionTable;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import java.util.List;

@Entity
public class TutorEnt extends UserEnt {

    public String identification;
    public String description;
    public String availableTime;

    @ElementCollection
    @CollectionTable(name = "TUTOR_TEACHLOCATION", joinColumns = @JoinColumn(name = "TUTOR_ID"))
    public List<Address> teachingLocations;

}
