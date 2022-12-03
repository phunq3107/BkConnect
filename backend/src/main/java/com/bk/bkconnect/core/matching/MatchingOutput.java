package com.bk.bkconnect.core.matching;

import com.bk.bkconnect.database.entity.PostEnt;
import com.bk.bkconnect.database.entity.TutorEnt;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;
@NoArgsConstructor
public class MatchingOutput {
    public PostEnt post = null;
    public TutorEnt tutor = null;
    public Boolean isMatch = false;
    public Boolean isLikely = false;
    public Float matchRate = 0f;// 0 - 1
    public List<String> recommend = new ArrayList<>();


    public MatchingOutput(PostEnt post, TutorEnt tutor) {
        this.post = post;
        this.tutor = tutor;
    }

    public boolean isAcceptable() {
        return isMatch || isLikely;
    }

    public void print(){
        System.out.println("------------------------");
        System.out.println("Post: "+post.id);
        System.out.println("Tutor: " + tutor.username);
        System.out.println("Match: " + isMatch);
        System.out.println("Likely: " + isLikely);
        System.out.println("Rcm: ");
        recommend.forEach(System.out::println);
    }
}
