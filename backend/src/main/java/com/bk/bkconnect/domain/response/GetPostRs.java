package com.bk.bkconnect.domain.response;

import com.bk.bkconnect.database.entity.PostEnt;
import com.bk.bkconnect.database.entity.ext.Address;
import com.bk.bkconnect.domain.common.UserBrief;

import java.util.List;

public class GetPostRs extends GenericRs<GetPostRs> {

    public String id;
    public String title;
    public GetSubjectRs subject;
    public Integer timesPerWeek;
    public Float hoursPerLesson;
    public String availableTime;
    public List<Address> location;
    public String fee;
    public String level;
    public String gender;
    public Integer age;
    public String noStudents;
    public String description;
    public Boolean isGroup;
    public UserBrief createBy;
    public Long lastUpdate;
    public String state;
    public UserBrief takeBy;
    public List<UserBrief> attendees;

    public static GetPostRs build(PostEnt post) {
        var rs = new GetPostRs();
        rs.id = post.id.toString();
        rs.title = post.title;
        rs.subject = GetSubjectRs.build(post.subject);
        rs.isGroup = post.isGroup;
        rs.createBy = UserBrief.build(post.createBy);
        rs.lastUpdate = post.updateTime == null ? post.createTime : post.updateTime;
        rs.state = post.state;
        rs.location = post.locations != null ? post.locations.stream().toList() : null;
        if (post.classInfo != null) {
            rs.timesPerWeek = post.classInfo.timesPerWeek;
            rs.hoursPerLesson = post.classInfo.hoursPerLesson;
            rs.availableTime = post.classInfo.availableTime;
            rs.fee = post.classInfo.fee;
            rs.noStudents = post.classInfo.noStudents;
            rs.description = post.classInfo.description;
        }
        if (post.tutorRequirement != null) {
            rs.age = post.tutorRequirement.age;
            rs.gender = post.tutorRequirement.gender;
        }
        // TODO: 27/11/2022 takeBy, attendees
        return rs;
    }

}
