package com.bk.bkconnect.util;

import java.util.Collection;

public class CollectionUtils {

    public static <T> boolean include(Collection<T> c, T item) {
        return c.stream().anyMatch(i -> i.equals(item));
    }
}
