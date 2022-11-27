package com.bk.bkconnect.service;

import com.bk.bkconnect.DataStore;
import com.bk.bkconnect.common.rest.*;
import com.bk.bkconnect.database.driver.TutorDAO;
import com.bk.bkconnect.database.entity.TutorEnt;
import com.bk.bkconnect.domain.request.GetTutorFilter;
import com.bk.bkconnect.domain.request.UpdateTutorRq;
import com.bk.bkconnect.domain.response.GetTutorRs;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

public interface ITutorService {
    // for api
    Msg<GetTutorRs> getTutorById(UUID tutorId);

    Msg<List<GetTutorRs>> getAllTutor(GetTutorFilter filter);

    Msg<GetTutorRs> updateTutorInfo(UUID tutorId, UpdateTutorRq rq);

    // for system
    TutorEnt getTutorEntById(UUID tutorId);
}

@Service
@AllArgsConstructor
class TutorService implements ITutorService {
    private final TutorDAO tutorDAO;

    @Override
    public Msg<GetTutorRs> getTutorById(UUID tutorId) {
        var tutor = getTutorEntById(tutorId);
        if (tutorId == null) {
            return FailMsg.fail(ResponseCode.userNotFound, ResponseMsg.userNotFound);
        }
        var rs = GetTutorRs.build(tutor);
        return SuccessMsg.success(rs);
    }

    @Override
    public Msg<List<GetTutorRs>> getAllTutor(GetTutorFilter filter) {
        if (!filter.verify()) {
            return FailMsg.fail(filter.failCode, filter.failReason);
        }
        // TODO: 27/11/2022  
        return null;
    }

    @Override
    public Msg<GetTutorRs> updateTutorInfo(UUID tutorId, UpdateTutorRq rq) {
        if (!rq.verify()) {
            return FailMsg.fail(rq.failCode, rq.failReason);
        }
        var tutor = getTutorEntById(tutorId);
        if (tutorId == null) {
            return FailMsg.fail(ResponseCode.userNotFound, ResponseMsg.userNotFound);
        }
        rq.flush(tutor);
        tutorDAO.saveAndFlush(tutor);
        DataStore.updateUser(tutor);

        var rs = GetTutorRs.build(tutor);
        return SuccessMsg.success(rs);
    }

    @Override
    public TutorEnt getTutorEntById(UUID tutorId) {
        return DataStore.tutors.getOrDefault(tutorId, null);
    }
}
