package com.bk.bkconnect.common.rest;

public class GenericResponse<T> {
    public int code = HttpCode.OK;
    public long time;
    public String message = "";
    public T data = null;

    public static <T> GenericResponse<T> parse(Msg<T> msg) {
        var rs = new GenericResponse<T>();
        rs.time = System.currentTimeMillis();
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


}
