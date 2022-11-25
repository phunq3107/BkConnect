package com.bk.bkconnect.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;

@Component
@PropertySource("classpath:env.properties")
public class Config {

    public static String jwtSecretKey;
    public static Long jwtExpirationTime;

    public Config(
            @Value("${jwt.secretKey}") String jwtSecretKey,
            @Value("${jwt.expirationTime}") Long jwtExpirationTime
    ) {
        Config.jwtSecretKey = jwtSecretKey;
        Config.jwtExpirationTime = jwtExpirationTime;
    }


}
