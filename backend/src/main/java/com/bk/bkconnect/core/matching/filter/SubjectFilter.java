package com.bk.bkconnect.core.matching.filter;

import com.bk.bkconnect.DataStore;
import com.bk.bkconnect.common.Syntax;
import com.bk.bkconnect.common.collections.Pair;
import com.bk.bkconnect.common.collections.Tuple3;
import com.bk.bkconnect.common.functional._0P1R;
import com.bk.bkconnect.core.matching.MatchingOutput;
import com.bk.bkconnect.database.entity.PostEnt;
import com.bk.bkconnect.database.entity.TutorEnt;

import java.util.Arrays;
import java.util.UUID;

public class SubjectFilter extends MatchingFilter {

    @Override
    protected boolean isMatch(PostEnt post, TutorEnt tutor) {
        if (post.subject == null) return false;
        return matchSubject(post, tutor) && matchLevel(post, tutor) && matchFee(post, tutor);
    }

    private boolean matchSubject(PostEnt post, TutorEnt tutor) {
        return tutor.getTutorSubject(post.subject.id) != null;
    }

    private boolean matchLevel(PostEnt post, TutorEnt tutor) {
        return "ALL".equals(post.subjectLevel) || post.subjectLevel.contains(tutor.getTutorSubject(post.subject.id).level);
    }

    private boolean matchFee(PostEnt post, TutorEnt tutor) {
        var tutorSubject = tutor.getTutorSubject(post.subject.id);
        if (tutorSubject == null) return false;
        return post.fee == -1 || tutorSubject.expectedFee == -1 || tutorSubject.expectedFee <= post.fee;
    }

    @Override
    protected Tuple3<Boolean, String, Float> rcmTutor(PostEnt post, TutorEnt tutor) {
        if (post.subject == null) return Tuple3.apply(false, null, null);
        if (matchSubject(post, tutor)) {
            if (matchLevel(post, tutor)) {
                // TODO: 12/7/2022
                return Tuple3.apply(true, "Có mức học phí cao hơn (%d₫ so với %d₫)".formatted(tutor.getTutorSubject(post.subject.id).expectedFee, post.fee), 1f);
            }
            if (matchFee(post, tutor)) {
                var tutorLevel =
                        Syntax.Try(() -> Integer.valueOf(tutor.getTutorSubject(post.subject.id).level), 0);
                var minRequire =
                        Syntax.Try(() -> Arrays.stream(post.subjectLevel.split(",")).map(Integer::valueOf).min(Integer::compareTo).get(), 1);
                if (tutorLevel >= minRequire)
                    return Tuple3.apply(true, "Gia sư có trình độ cao hơn", 1f);
            }
            return Tuple3.apply(true, "Trình độ cao hơn kèm theo học phí tăng (%d₫ so với %d₫)".formatted(tutor.getTutorSubject(post.subject.id).expectedFee, post.fee), 1f);
        }

        if (tutor.subjects != null) {
            for (var tutorSubject : tutor.subjects) {
                var subject = DataStore.subjects.get(tutorSubject.subjectId);
                if (!post.subject.groupSubjectOrder.startsWith(subject.groupSubjectOrder)) {
                    continue;
                }
                var matchLevel = "ALL".equals(post.subjectLevel) || post.subjectLevel.contains(tutorSubject.level);
                var matchFee = post.fee == -1 || tutorSubject.expectedFee == -1 || tutorSubject.expectedFee <= post.fee;
                if (matchFee && matchLevel) {
                    return Tuple3.apply(true, "Môn học gia sư dạy có cùng nhóm (%s) với môn học bạn quan tâm".formatted(post.subject.groupSubject.name), 1f);
                }
            }
        }
        return Tuple3.apply(false, null, null);
    }
}
