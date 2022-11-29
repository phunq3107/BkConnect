package com.bk.bkconnect.domain.request;

import com.bk.bkconnect.database.entity.ext.Address;

import java.util.Arrays;
import java.util.List;
import java.util.UUID;

public class GetTutorFilter extends GenericRq {
    public String fee;
    public String subject;
    public String level;
    public String gender;
    public String availableTime;
    public List<Address> location;
    public Double distance;
    public boolean getAll;

    public List<UUID> getSubjects() {
        return Arrays.stream(subject.split(",")).map(UUID::fromString).toList();
    }
}
