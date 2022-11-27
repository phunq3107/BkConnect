package com.bk.bkconnect.domain.request;

import com.bk.bkconnect.database.entity.TutorEnt;
import com.bk.bkconnect.database.entity.ext.Address;
import com.bk.bkconnect.database.entity.ext.TutorSubject;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;

public class UpdateTutorRq extends GenericRq {
    public String availableTime;
    public List<TutorSubject> subjects = new ArrayList<>();
    public List<Address> teachingLocations = new ArrayList<>();
    public String selfDescription;

    public void flush(TutorEnt tutor) {
        tutor.selfDescription = selfDescription;
        tutor.availableTime = availableTime;
        tutor.teachingLocations = teachingLocations;
        tutor.subjects = new HashSet<>(subjects);
    }

}
