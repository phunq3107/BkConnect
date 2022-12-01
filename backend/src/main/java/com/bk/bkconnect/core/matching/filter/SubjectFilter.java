package com.bk.bkconnect.core.matching.filter;

import com.bk.bkconnect.core.matching.MatchingOutput;
import com.bk.bkconnect.database.entity.PostEnt;
import com.bk.bkconnect.database.entity.TutorEnt;

public class SubjectFilter extends MatchingFilter{
    @Override
    public MatchingOutput doFilterTutor(PostEnt post, TutorEnt tutor) {
        var rs = new MatchingOutput(post, tutor);
        rs.isMatch = true;
        return rs;
    }

    @Override
    public MatchingOutput doFilterPost(TutorEnt tutor, PostEnt post) {
        return null;
    }

    /*
    match: trung mon, trung level, fee
    giong 2 khac 1
    fee % -> level  -> mon
    fee level mon
    KTT
    tkt
    kkt
    ttk

    likely:
        mon hoc:
        level
        fee

        0
        | \
        Toan13 1            Van 11 2
        Toan12 1             Van 10 2,1   Van 10 nang cao 2,2
         Toan11 1,1   1,2
        Toan 10  1,1,1

     */
}
