package com.bk.bkconnect.core.matching;

import com.bk.bkconnect.database.entity.PostEnt;
import com.bk.bkconnect.database.entity.TutorEnt;

import java.util.ArrayList;
import java.util.List;

public class MatchingOutput {
    public PostEnt post = null;
    public TutorEnt tutor = null;
    public Boolean isMatch = false;
    public Boolean isLikely = false;
    public Float matchRate = 0f;// 0 - 1
    public List<String> recommend = new ArrayList<>();

    public boolean isAcceptable() {
        return isMatch || isLikely;
    }
}
