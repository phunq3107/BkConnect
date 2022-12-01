package com.bk.bkconnect.util;

import java.util.Calendar;

public class TimeUtils {

    public static int getYear(long time) {
        var cal = Calendar.getInstance();
        cal.setTimeInMillis(time);
        return cal.get(Calendar.YEAR);
    }
}
