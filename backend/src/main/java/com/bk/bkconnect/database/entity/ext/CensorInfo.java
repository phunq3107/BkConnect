package com.bk.bkconnect.database.entity.ext;

import javax.persistence.Embeddable;
import java.util.UUID;

@Embeddable
public class CensorInfo {
    public UUID censorBy;
    public Long censorTime;
    public String description;
}
