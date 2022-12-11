package com.bk.bkconnect.util;

public class HtmlUtils {
    public static String link(String content, String href) {
        return "<a href=%s>%s</a>".formatted(href, content);
    }
}
