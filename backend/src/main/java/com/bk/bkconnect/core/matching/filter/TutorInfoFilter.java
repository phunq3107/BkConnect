package com.bk.bkconnect.core.matching.filter;

import com.bk.bkconnect.core.matching.MatchingOutput;
import com.bk.bkconnect.database.entity.PostEnt;
import com.bk.bkconnect.database.entity.TutorEnt;

public class TutorInfoFilter extends MatchingFilter{
    @Override
    public MatchingOutput doFilter(PostEnt post, TutorEnt tutor) {
        return null;
    }

    @Override
    public MatchingOutput doFilter(TutorEnt tutor, PostEnt post) {
        return null;
    }
}
