package com.bk.bkconnect.common;

import com.bk.bkconnect.common.functional._0P1R;

public class Syntax {
    public static <R> R Try(_0P1R<R> func, R def) {
        try {
            return func.apply();
        } catch (Exception e) {
            return def;
        }
    }

}
