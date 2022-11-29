package com.bk.bkconnect.core.matching.filter;

import com.bk.bkconnect.core.matching.MatchingOutput;
import com.bk.bkconnect.database.entity.PostEnt;
import com.bk.bkconnect.database.entity.TutorEnt;

public abstract class MatchingFilter {
    public abstract MatchingOutput doFilter(PostEnt post, TutorEnt tutor);

    public abstract MatchingOutput doFilter(TutorEnt tutor, PostEnt post);
}
