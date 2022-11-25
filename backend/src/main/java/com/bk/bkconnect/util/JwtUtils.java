package com.bk.bkconnect.util;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.bk.bkconnect.config.Config;

import java.util.Date;

public class JwtUtils {

    private static final String ROLE_KEY = "role";
    private static final String JWT_TOKEN_STARTING_KEY = "Bearer ";
    private static final Algorithm algorithm = Algorithm.HMAC256(Config.jwtSecretKey);

    public static boolean isJwtAuthorization(String authorization) {
        return authorization != null && authorization.startsWith(JWT_TOKEN_STARTING_KEY);
    }

    public static String createToken(String username, String role) {
        return JWT.create()
                .withSubject(username)
                .withExpiresAt(new Date(System.currentTimeMillis() + Config.jwtExpirationTime))
                .withClaim(ROLE_KEY, role)
                .sign(algorithm);
    }

    public static String verify(String authorization) {
        String token = authorization.substring(JWT_TOKEN_STARTING_KEY.length());
        DecodedJWT decodeRs = JWT.require(algorithm).build().verify(token);
        return decodeRs.getSubject();
    }
}
