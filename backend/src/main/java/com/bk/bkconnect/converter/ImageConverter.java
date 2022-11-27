package com.bk.bkconnect.converter;

import com.bk.bkconnect.database.entity.ext.Image;

public class ImageConverter {

    public static String convert(Image image) {
        // TODO: 26/11/2022
        return image.url;
    }

    public static Image convert(String str) {
        Image rs = new Image();
        rs.url = str;
        rs.kind = Image.ImageKind.LINK;
        return rs;
    }
}

