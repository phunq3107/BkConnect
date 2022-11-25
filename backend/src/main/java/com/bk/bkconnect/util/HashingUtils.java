package com.bk.bkconnect.util;

import lombok.extern.slf4j.Slf4j;

import javax.xml.bind.DatatypeConverter;
import java.security.MessageDigest;

@Slf4j
public class HashingUtils {
    public static final int SALT_SIZE = 10;

    public static String hashMd5(String raw) {
        String salt = RandomUtils.randomString(SALT_SIZE);
        return md5HashWithSalt(raw, salt);
    }

    public static boolean verify(String raw, String hash) {
        String salt = hash.substring(0, SALT_SIZE);
        return md5HashWithSalt(raw, salt).equals(hash);
    }

    private static String md5HashWithSalt(String raw, String salt) {
        try {
            MessageDigest md = MessageDigest.getInstance("MD5");
            md.update((salt + raw).getBytes());
            byte[] digest = md.digest();
            return salt + DatatypeConverter.printHexBinary(digest).toLowerCase();
        } catch (Exception e) {
            // Never reach
            return "";
        }
    }
}
