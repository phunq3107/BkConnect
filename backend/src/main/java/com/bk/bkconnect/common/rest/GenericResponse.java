package com.bk.bkconnect.common.rest;

import com.bk.bkconnect.util.ObjectMapperUtils;

public class GenericResponse<T> {
    public int code = ResponseCode.ok;
    public long time = System.currentTimeMillis();
    public String message = "";
    public T data = null;

    public GenericResponse() {
    }

    public GenericResponse(int code, String message) {
        this.code = code;
        this.message = message;
    }

    public static <T> GenericResponse<T> parse(Msg<T> msg) {
        var rs = new GenericResponse<T>();
        if (msg instanceof SuccessMsg<T> parse) {
            rs.code = parse.code;
            rs.data = parse.data;
        } else if (msg instanceof FailMsg<T> parse) {
            rs.code = parse.code;
            rs.message = parse.message;
            rs.data = parse.defaultData;
        }
        return rs;
    }

    public String toJson() {
        return ObjectMapperUtils.jsonAsString(this);
    }


}
