package com.bk.bkconnect.core.matching.filter;

import com.bk.bkconnect.core.matching.MatchingOutput;
import com.bk.bkconnect.database.entity.PostEnt;
import com.bk.bkconnect.database.entity.TutorEnt;

public class LocationFilter extends MatchingFilter{
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
}
