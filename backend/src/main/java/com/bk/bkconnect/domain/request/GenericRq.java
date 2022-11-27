package com.bk.bkconnect.domain.request;

public abstract class GenericRq {
    public String failReason;
    public int failCode;

    public boolean verify() {
        return true;
    }
}
