package com.bk.bkconnect.service;

import com.bk.bkconnect.DataStore;
import com.bk.bkconnect.common.rest.Msg;
import com.bk.bkconnect.common.rest.ResponseCode;
import com.bk.bkconnect.common.rest.ResponseMsg;
import com.bk.bkconnect.common.rest.SuccessMsg;
import com.bk.bkconnect.database.driver.TutorDAO;
import com.bk.bkconnect.database.entity.TutorEnt;
import com.bk.bkconnect.domain.request.GetTutorFilter;
import com.bk.bkconnect.domain.request.UpdateTutorRq;
import com.bk.bkconnect.domain.response.GetTutorRs;
import com.bk.bkconnect.domain.response.PageableRs;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public interface ITutorService {
    // for api
    Msg<GetTutorRs> getTutorById(UUID tutorId);

    Msg<PageableRs<GetTutorRs>> getAllTutor(GetTutorFilter filter, int pageNumber, int pageSize);

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
        if (tutor == null) {
            return Msg.fail(ResponseCode.userNotFound, ResponseMsg.userNotFound);
        }
        var rs = GetTutorRs.build(tutor);
        return Msg.success(rs);
    }

    @Override
    public Msg<PageableRs<GetTutorRs>> getAllTutor(GetTutorFilter filter, int pageNumber, int pageSize) {
        if (!filter.verify()) {
            return Msg.fail(filter);
        }

        var rs = PageableRs.build(DataStore.tutors.values().stream().toList(), pageNumber, pageSize, GetTutorRs::build);
        return Msg.success(rs);
    }

    @Override
    public Msg<GetTutorRs> updateTutorInfo(UUID tutorId, UpdateTutorRq rq) {
        if (!PermissionCheck.updateTutorInfo(tutorId)) {
            return Msg.notAllow();
        }
        if (!rq.verify()) {
            return Msg.fail(rq.failCode, rq.failReason);
        }
        var tutor = getTutorEntById(tutorId);
        if (tutor == null) {
            return Msg.fail(ResponseCode.userNotFound, ResponseMsg.userNotFound);
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
