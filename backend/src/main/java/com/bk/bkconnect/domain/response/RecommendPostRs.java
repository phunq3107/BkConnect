package com.bk.bkconnect.domain.response;

import java.util.List;

public class RecommendPostRs {
    public GetPostRs post;
    public boolean isMatch;
    public float likelyRate;
    public List<String> recommendation;
}
