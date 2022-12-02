package com.bk.bkconnect.util;

import java.util.Calendar;

public class TimeUtils {

    public static int getYear(long time) {
        var cal = Calendar.getInstance();
        cal.setTimeInMillis(time);
        return cal.get(Calendar.YEAR);
    }

    public static long millisOf(int year) {
        return millisOf(year, 1, 1);
    }

    public static long millisOf(int year, int month) {
        return millisOf(year, month, 1);
    }

    public static long millisOf(int year, int month, int date) {
        var cal = Calendar.getInstance();
        cal.set(Calendar.YEAR, year);
        cal.set(Calendar.MONTH, month + 1);
        cal.set(Calendar.DATE, date);
        cal.set(Calendar.HOUR, 0);
        cal.set(Calendar.MINUTE, 0);
        cal.set(Calendar.SECOND, 0);
        return cal.getTimeInMillis();
    }
}
