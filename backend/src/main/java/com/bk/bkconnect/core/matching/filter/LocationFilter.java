package com.bk.bkconnect.core.matching.filter;

import com.bk.bkconnect.common.collections.Tuple3;
import com.bk.bkconnect.core.matching.MatchingOutput;
import com.bk.bkconnect.database.entity.PostEnt;
import com.bk.bkconnect.database.entity.TutorEnt;

public class LocationFilter extends MatchingFilter{
    @Override
    protected boolean isMatch(PostEnt post, TutorEnt tutorEnt) {
        return true;
    }

    @Override
    protected Tuple3<Boolean, String, Float> rcmTutor(PostEnt post, TutorEnt tutorEnt) {
        return null;
    }
}
