package com.mnu.loiots.config.security;

import com.alibaba.fastjson.JSON;
import com.mnu.loiots.utils.JsonModel;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * @Author: fenggn
 * @Description: 登出成功处理逻辑
 * @Date Create in 2022/6/4 10:17
 */
@Component
@Slf4j
public class CustomizeLogoutSuccessHandler implements LogoutSuccessHandler {
    @Override
    public void onLogoutSuccess(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Authentication authentication) throws IOException, ServletException {
        log.info("登出成功");
        httpServletResponse.sendRedirect("http://localhost/apis/login");
        log.info("登出成功sendRedirect后");
    }

}

