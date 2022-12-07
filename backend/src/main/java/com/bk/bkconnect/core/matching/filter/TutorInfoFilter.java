package com.bk.bkconnect.core.matching.filter;

import com.bk.bkconnect.common.collections.Pair;
import com.bk.bkconnect.common.collections.Tuple3;
import com.bk.bkconnect.core.matching.MatchingOutput;
import com.bk.bkconnect.database.entity.PostEnt;
import com.bk.bkconnect.database.entity.TutorEnt;

public class TutorInfoFilter extends MatchingFilter {

    @Override
    protected boolean isMatch(PostEnt post, TutorEnt tutor) {
        if (tutor.userInfo == null) return false;
        if (tutor.userInfo.dob == null || tutor.userInfo.gender == null) return false;

        if (post.tutorRequirement == null) return true;

        return matchGender(post, tutor) && matchAge(post, tutor);
    }

    private boolean matchGender(PostEnt post, TutorEnt tutor) {
        if ("ALL".equalsIgnoreCase(post.tutorRequirement.gender)) return true;
        if (tutor.userInfo.gender.equalsIgnoreCase(post.tutorRequirement.gender)) return true;
        return false;
    }

    private boolean matchAge(PostEnt post, TutorEnt tutor) {
        if ("ALL".equalsIgnoreCase(post.tutorRequirement.gender)) return true;
        else {
            var tokens = post.tutorRequirement.age.split(",");
            int minAge = Integer.parseInt(tokens[0]);
            int maxAge = Integer.parseInt(tokens[1]);
            int tutorAge = tutor.getAge();
            return tutorAge >= minAge && tutorAge <= maxAge;
        }
    }

    @Override
    protected Tuple3<Boolean, String, Float> rcmTutor(PostEnt post, TutorEnt tutor) {
        if (tutor.userInfo == null) return Tuple3.apply(false, null, null);
        if (matchGender(post, tutor)) return Tuple3.apply(true, "Khác với độ tuổi bạn mong muốn", 1f);
        if (matchAge(post, tutor)) return Tuple3.apply(true, "Khác với giới tính bạn mong muốn", 1f);
        return Tuple3.apply(true, "Khác với độ tuổi và giới tính bạn mong muốn", 1f);
    }

}
