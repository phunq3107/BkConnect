package com.bk.bkconnect.domain.request;

import com.bk.bkconnect.database.entity.ext.Address;
import lombok.Getter;
import lombok.Setter;

import java.util.Arrays;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
public class GetTutorFilter extends GenericRq {
    public String fee;
    public String subject; // subjectId ','
    public String level; // all ,1 ,2 ,3
    public String gender; // all, male, female
    public String availableTime; // 0-12 12-16 16-19 19-24
    public String location; // tutorPlace, studentPlace
    public Double distance; // float
    public boolean getAll;

    public List<UUID> getSubjects() {
        return Arrays.stream(subject.split(",")).map(UUID::fromString).toList();
    }
}
