package com.bk.bkconnect.common.rest;

public class FailMsg<T> extends Msg<T> {
    public String message = "";
    public T defaultData = null;

    public FailMsg(String message) {
        this.message = message;
    }

    public FailMsg(int code,String message) {
        this.code = code;
        this.message = message;
    }

}
