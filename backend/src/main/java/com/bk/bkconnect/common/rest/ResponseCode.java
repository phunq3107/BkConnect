package com.bk.bkconnect.common.rest;

public class ResponseCode {
    public static final int ok = 200;

    public static final int authFail = 401;
    public static final int forbidden = 403;
    public static final int notAllow = 405;

    public static final int wrongPassword = 401;

    public static final int invalidUsername = 422;
    public static final int invalidPassword = 422;
    public static final int invalidUserRole = 422;
    public static final int existedUsername = 422;

    public static final int userNotFound = 404;
    public static final int postNotFound = 404;


}
