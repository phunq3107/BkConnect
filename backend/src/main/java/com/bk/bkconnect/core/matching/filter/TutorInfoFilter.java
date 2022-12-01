package com.bk.bkconnect.core.matching.filter;

import com.bk.bkconnect.core.matching.MatchingOutput;
import com.bk.bkconnect.database.entity.PostEnt;
import com.bk.bkconnect.database.entity.TutorEnt;

public class TutorInfoFilter extends MatchingFilter {
    @Override
    public MatchingOutput doFilterTutor(PostEnt post, TutorEnt tutor) {
        var rs = new MatchingOutput(post, tutor);
        if (isMatch(post, tutor)) {
            rs.isMatch = true;
        } else if (isLikely(post, tutor)) {
            rs.isLikely = true;
            rs.recommend.add(rcmTutor(post, tutor));
        }
        return rs;
    }

    @Override
    public MatchingOutput doFilterPost(TutorEnt tutor, PostEnt post) {
        return null;
    }

    private boolean isMatch(PostEnt post, TutorEnt tutor) {
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


    private boolean isLikely(PostEnt post, TutorEnt tutor) {
        if (tutor.userInfo == null) return false;
        if (tutor.userInfo.dob == null || tutor.userInfo.gender == null) return false;
        return true;
    }

    private String rcmTutor(PostEnt post, TutorEnt tutor) {
        if (matchGender(post, tutor)) return "Diff age";
        if (matchAge(post, tutor)) return "Diff gender";
        return "Diff age, diff gender";
    }

}
