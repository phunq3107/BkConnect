package com.bk.bkconnect.util;

import lombok.extern.slf4j.Slf4j;
import org.springframework.util.ResourceUtils;

import java.io.*;

@Slf4j
public class FileUtils {

    public static String getPathFromClasspath(String classpath) {
        try {
            return ResourceUtils.getFile(ResourceUtils.CLASSPATH_URL_PREFIX + classpath).toString();
        } catch (FileNotFoundException e) {
            log.error(e.toString());
            throw new RuntimeException(e);
        }
    }


    public static BufferedReader getReader(String path) {
        try {
            return new BufferedReader(new FileReader(path));
        } catch (Exception e) {
            log.error("[FileUtils] Cannot open file {} to read - ex: {}", path, e);
            return null;
        }
    }

    public static PrintWriter getWriter(String path) {
        return getWriter(path, true);
    }

    public static PrintWriter getWriter(String path, boolean isOverwrite) {
        try {
            var file = new File(path);
            if (file.exists() && isOverwrite) file.delete();
            new File(path).getParentFile().mkdir();
            return new PrintWriter(new BufferedWriter(new FileWriter(path, true)));
        } catch (Exception e) {
            log.error("[FileUtils] Cannot open file {} to write - ex: {}", path, e);
            return null;
        }
    }

}
