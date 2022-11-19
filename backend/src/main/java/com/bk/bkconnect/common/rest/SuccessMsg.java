package com.bk.bkconnect.common.rest;

public class SuccessMsg<T> extends Msg<T> {
    public T data;

    public SuccessMsg(T data) {
        this.data = data;
    }

    public SuccessMsg(T data, int code) {
        this.data = data;
        this.code = code;
    }
}
