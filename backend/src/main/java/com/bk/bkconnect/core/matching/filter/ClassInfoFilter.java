package com.bk.bkconnect.core.matching.filter;

import com.bk.bkconnect.common.collections.Tuple3;
import com.bk.bkconnect.core.matching.MatchingOutput;
import com.bk.bkconnect.database.entity.PostEnt;
import com.bk.bkconnect.database.entity.TutorEnt;

public class ClassInfoFilter extends MatchingFilter{


    @Override
    public boolean isMatch(PostEnt post, TutorEnt tutorEnt) {
        return true;
    }

    @Override
    public Tuple3<Boolean, String, Float> rcmTutor(PostEnt post, TutorEnt tutorEnt) {
        return null;
    }
}
