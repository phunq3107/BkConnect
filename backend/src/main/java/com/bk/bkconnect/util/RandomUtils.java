package com.bk.bkconnect.util;

import java.util.Random;

public class RandomUtils {

    public static final String upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    public static final String lower = upper.toLowerCase();

    public static final String digits = "0123456789";

    public static final String alphanum = upper + lower + digits;

    public static String randomString(int n) {
        Random random = new Random();
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < n; i++) {
            sb.append(alphanum.charAt(random.nextInt(alphanum.length())));
        }
        return sb.toString();
    }
}
