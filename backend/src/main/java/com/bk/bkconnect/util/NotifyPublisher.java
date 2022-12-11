package com.bk.bkconnect.util;

import com.bk.bkconnect.common.rest.Msg;
import com.bk.bkconnect.database.driver.NotifyMessageDAO;
import com.bk.bkconnect.database.entity.NotifyMessageEnt;
import com.bk.bkconnect.security.ApplicationContext;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class NotifyPublisher {

    private final NotifyMessageDAO notifyMessageDAO;

    private void publish(NotifyMessageEnt message) {
        notifyMessageDAO.save(message);
    }


    public void save(NotifyMessageEnt message) {
        notifyMessageDAO.save(message);
        publish(message);
    }

    public Msg<List<NotifyMessageEnt>> getAll() {
        var rs = notifyMessageDAO.getAllByReceiverOrderByTimestampDesc(ApplicationContext.currentUserId());
        return Msg.success(rs);
    }

}
