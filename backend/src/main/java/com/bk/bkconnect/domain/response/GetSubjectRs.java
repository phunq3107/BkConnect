package com.bk.bkconnect.domain.response;

import com.bk.bkconnect.database.entity.SubjectEnt;

public class GetSubjectRs extends GenericRs<GetSubjectRs> {
    public String id;
    public String name;
    public String group;
    public String order;

    public static GetSubjectRs build(SubjectEnt subject) {
        var rs = new GetSubjectRs();
        rs.id = subject.id.toString();
        rs.name = subject.name;
        rs.group = subject.groupSubject.name;
        rs.order = subject.groupSubjectOrder;
        return rs;
    }
}
