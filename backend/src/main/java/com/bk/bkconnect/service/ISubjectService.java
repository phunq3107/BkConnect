package com.bk.bkconnect.service;

import com.bk.bkconnect.DataStore;
import com.bk.bkconnect.common.rest.Msg;
import com.bk.bkconnect.domain.response.GetSubjectRs;
import org.springframework.stereotype.Service;

import java.util.List;

public interface ISubjectService {
    // for api
    Msg<List<GetSubjectRs>> getAll();
}

@Service
class SubjectService implements ISubjectService {
    @Override
    public Msg<List<GetSubjectRs>> getAll() {
        var rs = DataStore.subjects.values().stream().map(GetSubjectRs::build).toList();
        return Msg.success(rs);
    }
}

