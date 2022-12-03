package com.bk.bkconnect.domain.response;

import com.bk.bkconnect.core.matching.MatchingOutput;
import com.bk.bkconnect.domain.common.UserBrief;

import java.util.List;

public class RecommendationRs extends GenericRs<RecommendationRs> {
    public UserBrief tutor;
    public boolean isMatch;
    public float likelyRate;
    public List<String> recommendation;

    public static RecommendationRs build(MatchingOutput o) {
        var rs = new RecommendationRs();
        rs.tutor = UserBrief.build(o.tutor);
        rs.isMatch = o.isMatch;
        rs.likelyRate = o.matchRate;
        rs.recommendation = o.recommend;
        return rs;
    }
}
