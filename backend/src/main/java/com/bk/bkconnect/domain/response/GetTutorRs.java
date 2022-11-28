package com.bk.bkconnect.domain.response;

import com.bk.bkconnect.DataStore;
import com.bk.bkconnect.converter.ImageConverter;
import com.bk.bkconnect.database.entity.TutorEnt;
import com.bk.bkconnect.database.entity.ext.Address;
import com.bk.bkconnect.database.entity.ext.TutorSubject;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class GetTutorRs extends GenericRs<GetTutorRs> {

    public String id;
    public String state;
    public String username;
    public String phone;
    public Address address;
    public String email;
    public String gender;
    public String fullname;
    public Long dob;
    public String avatar;
    public Long updateAt;
    public Long createAt;
    public String role;
    public String selfDescription;
    public List<Address> teachingLocations;
    public Set<TutorSubject> subjects = new HashSet<>();
    public String availableTimes;
    public boolean isMatch;
    public String likelyDescription;

    public static GetTutorRs build(TutorEnt tutor) {
        var rs = new GetTutorRs();
        rs.id = tutor.id.toString();
        rs.state = tutor.state;
        rs.username = tutor.username;
        if (tutor.userInfo != null) {
            rs.phone = tutor.userInfo.phone;
            rs.address = tutor.userInfo.address;
            rs.email = tutor.userInfo.email;
            rs.gender = tutor.userInfo.gender;
            rs.fullname = tutor.userInfo.fullname;
            rs.dob = tutor.userInfo.dob;
            rs.avatar = ImageConverter.convert(tutor.userInfo.avatar);
        }
        rs.updateAt = tutor.updateAt;
        rs.createAt = tutor.createAt;
        rs.role = tutor.role;
        rs.selfDescription = tutor.selfDescription;
        rs.teachingLocations = tutor.teachingLocations;
        rs.subjects = tutor.subjects;
        rs.availableTimes = tutor.availableTime;
        if (rs.subjects != null) {
            rs.subjects.forEach(i -> i.name = DataStore.subjects.get(i.subjectId).name);
        }
        rs.isMatch = true;
        return rs;
    }
}
