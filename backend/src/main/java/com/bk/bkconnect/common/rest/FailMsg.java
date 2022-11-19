package com.bk.bkconnect.common.rest;

public class FailMsg<T> extends Msg<T> {
    public String message="";
    public T defaultData = null;

    public FailMsg(String message) {
        this.message = message;
    }

    public FailMsg(String message, int code){
        this.message = message;
        this.code = code;
    }

}
