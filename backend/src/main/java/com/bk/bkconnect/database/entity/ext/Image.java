package com.bk.bkconnect.database.entity.ext;

import javax.persistence.Embeddable;

@Embeddable
public class Image {
    public Integer kind;
    public String url;

    public class ImageKind {
        public static int FILE = 1;
        public static int LINK = 2;
    }
}
