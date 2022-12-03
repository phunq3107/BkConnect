package com.bk.bkconnect.core.matching.filter;

import com.bk.bkconnect.common.collections.Tuple3;
import com.bk.bkconnect.core.matching.MatchingOutput;
import com.bk.bkconnect.database.entity.PostEnt;
import com.bk.bkconnect.database.entity.TutorEnt;

public abstract class MatchingFilter {
    public MatchingOutput doFilterTutor(PostEnt post, TutorEnt tutor) {
        var rs = new MatchingOutput(post, tutor);
        if (isMatch(post, tutor)) {
            rs.isMatch = true;
        } else {
            var likely = rcmTutor(post, tutor);
            if (likely!=null && likely._1) {
                rs.isLikely = true;
                rs.recommend.add(likely._2);
                rs.matchRate = likely._3;
            }
        }
        return rs;
    }

    public MatchingOutput doFilterPost(TutorEnt tutor, PostEnt post) {
        return null;
    }

    protected abstract boolean isMatch(PostEnt post, TutorEnt tutorEnt);

    protected abstract Tuple3<Boolean, String, Float> rcmTutor(PostEnt post, TutorEnt tutorEnt);
}
