package com.bk.bkconnect.core.matching.filter;

import com.bk.bkconnect.core.matching.MatchingOutput;
import com.bk.bkconnect.database.entity.PostEnt;
import com.bk.bkconnect.database.entity.TutorEnt;

import java.util.ArrayList;
import java.util.List;

public class TimeFilter extends MatchingFilter {
    @Override
    public MatchingOutput doFilterTutor(PostEnt post, TutorEnt tutor) {
        var rs = new MatchingOutput(post, tutor);
        if (isMatch(post, tutor)) {
            rs.isMatch = true;
        } else if (isLikely(post, tutor)) {
            rs.recommend.add(rcmTutor(post, tutor));
        }
        return rs;
    }

    @Override
    public MatchingOutput doFilterPost(TutorEnt tutor, PostEnt post) {
        return null;
    }

    private boolean isMatch(PostEnt post, TutorEnt tutor) {
        if (tutor.availableTime == null) return false;
        if (post.classInfo == null) return true;
        var hoursPerLesson = post.classInfo.hoursPerLesson;
        var timesPerWeek = post.classInfo.timesPerWeek;
        var availableTime = post.classInfo.availableTime != null ? post.classInfo.availableTime : tutor.availableTime;
        if (hoursPerLesson == -1 || timesPerWeek == -1 || "ALL".equalsIgnoreCase(availableTime)) return true;
        return matchTime(tutor.availableTime, availableTime, (int) Math.ceil(hoursPerLesson), timesPerWeek);
    }

    private boolean matchTime(String at1, String at2, int hpl, int tpw) {
        if (at1.length() < 7 * 24 || at2.length() < 7 * 24) return false;
        List<Integer> ls = new ArrayList<>();
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < 7 * 24; i++) {
            if (at1.charAt(i) == '1' && at2.charAt(i) == '1') sb.append('1');
            else sb.append('0');
        }
        var str = sb.toString();
        for (int day = 0; day < 7; day++) {
            for (int i = day * 24, c = 0; i <= (day + 1) * 24; i++) {
                if (str.charAt(i) == '1') c++;
                else c = 0;
                if (c >= hpl) {
                    tpw--;
                    break;
                }
            }
        }
        return tpw <= 0;
    }

    private boolean isLikely(PostEnt post, TutorEnt tutor) {
        if (tutor.availableTime == null) return false;
        var hoursPerLesson = post.classInfo.hoursPerLesson;
        var timesPerWeek = post.classInfo.timesPerWeek;
        var availableTime = post.classInfo.availableTime;
        return matchTime(tutor.availableTime, availableTime, (int) Math.ceil(hoursPerLesson) - 1, timesPerWeek)
                || matchTime(tutor.availableTime, availableTime, (int) Math.ceil(hoursPerLesson), timesPerWeek - 1);
    }

    private String rcmTutor(PostEnt post, TutorEnt tutor) {
        var hoursPerLesson = post.classInfo.hoursPerLesson;
        var timesPerWeek = post.classInfo.timesPerWeek;
        var availableTime = post.classInfo.availableTime;
        if (matchTime(tutor.availableTime, availableTime, (int) Math.ceil(hoursPerLesson), timesPerWeek - 1)) {
            return "Co the day x-1 buoi, xem them";
        } else if (matchTime(tutor.availableTime, availableTime, (int) Math.ceil(hoursPerLesson) - 1, timesPerWeek + 1)) {
            return "Giam thoi luong, them so buoi";
        } else if (matchTime(tutor.availableTime, availableTime, (int) Math.ceil(hoursPerLesson) - 1, timesPerWeek)) {
            return "Giam so gio mot buoi";
        }
        return "";
    }
}
