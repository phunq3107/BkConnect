package com.bk.bkconnect.database.entity;

import javax.persistence.Entity;
import java.util.UUID;

@Entity
public class ViolationReportEnt extends AbstractEnt {
    public UUID fromUser;
    public String kind;
    public UUID toId;
    public UUID handleBy;
    public Long handleTime;
    public Long createTime;
    public String description;

    public enum ViolationReportKind {

    }
}
