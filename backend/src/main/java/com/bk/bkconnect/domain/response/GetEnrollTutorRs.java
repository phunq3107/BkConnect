package com.bk.bkconnect.domain.response;

import com.bk.bkconnect.DataStore;
import com.bk.bkconnect.database.entity.TutorPostRel;
import com.bk.bkconnect.domain.common.UserBrief;

public class GetEnrollTutorRs extends GenericRs<GetEnrollTutorRs> {
    public UserBrief tutor;
    public String requester;
    public String state;
    public Long time;

    public static GetEnrollTutorRs build(TutorPostRel rel) {
        var rs = new GetEnrollTutorRs();
        rs.tutor = UserBrief.build(DataStore.tutors.get(rel.left.id));
        rs.requester = rel.requester;
        rs.state = rel.state;
        rs.time = rel.updateTime;
        return rs;
    }
}
