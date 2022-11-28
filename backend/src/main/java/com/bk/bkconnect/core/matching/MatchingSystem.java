package com.bk.bkconnect.core.matching;

import com.bk.bkconnect.core.matching.filter.*;
import com.bk.bkconnect.database.entity.PostEnt;
import com.bk.bkconnect.database.entity.TutorEnt;

import java.util.*;
import java.util.stream.Collectors;

public class MatchingSystem {
    private static final MatchingSystem sys = new MatchingSystem();
    private final List<MatchingFilter> filters; //sorted by priority
    private final int noFilters;

    private MatchingSystem() {
        // TODO: 27/11/2022 change priority
        filters = new ArrayList<>() {{
            add(new SubjectFilter());
            add(new TimeFilter());
            add(new FeeFilter());
            add(new LocationFilter());
            add(new TutorInfoFilter());
            add(new ClassInfoFilter());
        }};
        noFilters = filters.size();
    }

    public static List<MatchingOutput> findMatching(TutorEnt tutor, List<PostEnt> posts) {
        return sys.findMatchingPost(tutor, posts);
    }

    public static List<MatchingOutput> findMatching(PostEnt post, List<TutorEnt> tutors) {
        return sys.findMatchTutor(post, tutors);
    }

    private List<MatchingOutput> findMatchingPost(TutorEnt tutor, List<PostEnt> posts) {
        Map<PostEnt, List<MatchingOutput>> filterRs = new HashMap<>() {{
            posts.forEach(post -> put(post, new ArrayList<>()));
        }};
        var isContinue = new ArrayList<Boolean>() {{
            for (int i = 0; i < posts.size(); i++) add(true);
        }};


        for (var filter : filters) {
            for (int i = 0; i < posts.size(); i++) {
                if (!isContinue.get(i)) continue;
                var rs = filter.doFilter(tutor, posts.get(i));
                filterRs.get(posts.get(i)).add(rs);
                if (!rs.isAcceptable()) {
                    isContinue.set(i, false);
                }
            }
        }
        return summarizingResult(filterRs.values());
    }

    private List<MatchingOutput> findMatchTutor(PostEnt post, List<TutorEnt> tutors) {
        return null;
    }

    private List<MatchingOutput> summarizingResult(Collection<List<MatchingOutput>> filterRs) {
        return filterRs.stream()
                .filter(e -> e.size() == filters.size() && e.stream().allMatch(MatchingOutput::isAcceptable))
                .map(e -> {
                    var rs = new MatchingOutput();
                    var noMatch = e.stream().filter(i -> i.isMatch).count();
                    rs.post = e.get(0).post;
                    rs.tutor = e.get(0).tutor;
                    rs.isMatch = noMatch == noFilters;
                    rs.matchRate = noMatch * 1f / noFilters;
                    if (!rs.isMatch && noFilters - noMatch <= 2) {
                        rs.isLikely = true;
                        e.stream()
                                .sorted(Collections.reverseOrder())
                                .forEach(r -> rs.recommend.addAll(r.recommend));
                    }
                    return rs;
                })
                .sorted((a, b) -> -a.matchRate.compareTo(b.matchRate))
                .collect(Collectors.toList());
    }


}
