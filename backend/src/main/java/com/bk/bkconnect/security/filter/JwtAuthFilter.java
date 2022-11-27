package com.bk.bkconnect.security.filter;

import com.bk.bkconnect.common.rest.GenericResponse;
import com.bk.bkconnect.common.rest.ResponseCode;
import com.bk.bkconnect.security.ApplicationContext;
import com.bk.bkconnect.security.SecurityConfig;
import com.bk.bkconnect.security.SessionUser;
import com.bk.bkconnect.util.JwtUtils;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Arrays;

@Component
@AllArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {

    private final UserDetailsService userService;
    private static final AntPathMatcher matcher = new AntPathMatcher();

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String authorizationHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        try {
            if (JwtUtils.isJwtAuthorization(authorizationHeader)) {
                String username = JwtUtils.verify(authorizationHeader);
                SessionUser user = (SessionUser) userService.loadUserByUsername(username);
                ApplicationContext.setCurrentUser(new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities()));
            } else {
                if (!request.getRequestURI().equals("/session/login"))
                    throw new Exception("Not verify");
            }
            filterChain.doFilter(request, response);
        } catch (Exception e) {
            response.setContentType("application/json");
            response
                    .getOutputStream()
                    .print(new GenericResponse<>(ResponseCode.authFail, e.getMessage()).toJson());
        }
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        String uri = request.getRequestURI();
        return Arrays.stream(SecurityConfig.WHITE_LIST).anyMatch(e -> matcher.match(e, uri));

    }
}
