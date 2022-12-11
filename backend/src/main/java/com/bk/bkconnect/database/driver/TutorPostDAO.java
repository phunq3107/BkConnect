package com.bk.bkconnect.database.driver;

import com.bk.bkconnect.database.entity.AbstractRel;
import com.bk.bkconnect.database.entity.TutorPostRel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface TutorPostDAO extends JpaRepository<TutorPostRel, AbstractRel.RelId> {
    @Query("from TutorPostRel where postId = ?1")
    List<TutorPostRel> getAllByPost(UUID postId);

    @Query("from TutorPostRel where tutorId = ?1 and postId = ?2 order by createTime")
    List<TutorPostRel> getByTutorAndPost(UUID tutorId, UUID postId);

    @Query("from TutorPostRel where tutorId = ?1 and requester = ?2")
    List<TutorPostRel> getAllByTutorAndRequester(UUID tutorId, String requester);
}
