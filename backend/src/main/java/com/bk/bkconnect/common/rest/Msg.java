package com.bk.bkconnect.common.rest;

import com.bk.bkconnect.domain.request.GenericRq;

public abstract class Msg<T> {
    public int code = ResponseCode.ok;

    public static <T> SuccessMsg<T> success(T data) {
        return new SuccessMsg<>(data);
    }


    public static <T> FailMsg<T> fail(int code, String message) {
        return new FailMsg<>(code, message);
    }

    public static <T> FailMsg<T> fail(GenericRq rq) {
        return new FailMsg<>(rq.failCode, rq.failReason);
    }

    public static <T> FailMsg<T> notAllow() {
        return fail(ResponseCode.notAllow, ResponseMsg.notAllow);
    }
}
