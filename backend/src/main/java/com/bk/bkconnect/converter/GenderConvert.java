package com.bk.bkconnect.converter;

public class GenderConvert {
    public static String convert(Integer gender) {
        if (gender == null) return "unknown";
        return switch (gender) {
            case 1 -> "male";
            case 2 -> "female";
            default -> "unknown";
        };
    }

    public static int convert(String gender) {
        if ("male".equals(gender)) return 1;
        if ("female".equals(gender)) return 2;
        return 0;
    }
}
