package com.bk.bkconnect.common.rest;

public abstract class Msg<T> {
    public int code = HttpCode.OK;

    public static <T> SuccessMsg<T> success(T data) {
        return new SuccessMsg<>(data);
    }

    public static <T> FailMsg<T> fail(String message, int code) {
        return new FailMsg<>(message, code);
    }
}
