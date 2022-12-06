package com.bk.bkconnect.domain.response;


import com.bk.bkconnect.database.entity.PostEnt;
import com.bk.bkconnect.database.entity.TutorPostRel;

public class GetBookingRs extends GenericRs<GetBookingRs> {
    public GetPostRs post;
    public Long createTime;
    public Long updateTime;
    public String requester;
    public String state;

    public static GetBookingRs build(PostEnt post, TutorPostRel tutorPost) {
        var rs = new GetBookingRs();
        rs.post = GetPostRs.build(post);
        rs.createTime = tutorPost.createTime;
        rs.updateTime = tutorPost.updateTime != null ? tutorPost.updateTime : tutorPost.createTime;
        rs.requester = tutorPost.requester;
        rs.state = tutorPost.state;
        return rs;
    }
}
