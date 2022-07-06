package com.mnu.sosm.config.security;

import com.mnu.sosm.utils.AESUtils2;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpMethod;
import org.springframework.lang.Nullable;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletRequestWrapper;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;



@Component
@Slf4j
/**
 * 登录过程中对登录密码进行解密
 */
public class SignInPasswordDecryptionFilter extends OncePerRequestFilter {

    private static final AntPathRequestMatcher DEFAULT_ANT_PATH_REQUEST_MATCHER = new AntPathRequestMatcher("/login", HttpMethod.POST.name());

    //AES密钥
    @Value("${sosm.aes.secret-key}")
    private static String SECRETKEY;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        if (DEFAULT_ANT_PATH_REQUEST_MATCHER.matcher(request).isMatch()) {
            filterChain.doFilter(new FormContentRequestWrapper(request), response);
        } else {
            filterChain.doFilter(request, response);
        }
    }


    private static class FormContentRequestWrapper extends HttpServletRequestWrapper {

        public FormContentRequestWrapper(HttpServletRequest request) {
            super(request);
        }

        @Override
        @Nullable
        public String getParameter(String name) {
            String queryStringValue = super.getParameter(name);
            if (UsernamePasswordAuthenticationFilter.SPRING_SECURITY_FORM_PASSWORD_KEY.equals(name)) {

                log.info("登录密码（解密前）="+queryStringValue);
                // 解密操作 AES/ECB/PKCS5Padding
                try {
                    queryStringValue = AESUtils2.Decrypt(queryStringValue,SECRETKEY);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }

            return queryStringValue;
        }

    }

}
