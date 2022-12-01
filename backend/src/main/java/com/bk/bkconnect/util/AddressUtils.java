package com.bk.bkconnect.util;

import com.bk.bkconnect.config.Config;
import com.bk.bkconnect.database.constant.AddressKind;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

public class AddressUtils {
    static {
        init();
    }

    public static Map<String, String> provinces;
    public static Map<String, String> districts;
    public static Map<String, String> wards;
    public static Map<String, Set<String>> provinceDistrict;
    public static Map<String, Set<String>> districtWard;

    public static boolean isValidAddress(String province, String district, String ward, String detail) {
        if (AddressKind.TUTOR_PLACE.equalsIgnoreCase(detail) || AddressKind.STUDENT_PLACE.equalsIgnoreCase(detail))
            return true;
        return provinces.containsKey(province) && districts.containsKey(district) && wards.containsKey(ward)
                && provinceDistrict.get(province).contains(district)
                && districtWard.get(district).contains(ward);
    }


    private static void init() {
        provinces = new ConcurrentHashMap<>();
        districts = new ConcurrentHashMap<>();
        wards = new ConcurrentHashMap<>();
        provinceDistrict = new ConcurrentHashMap<>();
        districtWard = new ConcurrentHashMap<>();
        try {
            String path = FileUtils.getPathFromClasspath(Config.VIETNAM_PROVINCE_FILE);
            JSONParser parser = new JSONParser();
            JSONArray provinceArr = (JSONArray) parser.parse(FileUtils.getReader(path));
            for (var province : provinceArr) {
                JSONObject provinceObj = (JSONObject) province;
                String pCode = (String) provinceObj.get("codename");
                String pName = (String) provinceObj.get("name");
                provinces.put(pCode, pName);

                provinceDistrict.put(pCode, new HashSet<>());
                JSONArray districtArr = (JSONArray) provinceObj.get("districts");
                for (var district : districtArr) {
                    JSONObject districtObj = (JSONObject) district;
                    String dCode = (String) districtObj.get("codename");
                    String dName = (String) districtObj.get("name");
                    districts.put(dCode, dName);
                    provinceDistrict.get(pCode).add(dCode);

                    districtWard.put(dCode, new HashSet<>());
                    JSONArray wardArr = (JSONArray) districtObj.get("wards");
                    for (var ward : wardArr) {
                        JSONObject wardObj = (JSONObject) ward;
                        String wCode = (String) wardObj.get("codename");
                        String wName = (String) wardObj.get("name");
                        wards.put(wCode, wName);
                        districtWard.get(dCode).add(wCode);
                    }

                }
            }
        } catch (Exception ignore) {
        }


    }
}
