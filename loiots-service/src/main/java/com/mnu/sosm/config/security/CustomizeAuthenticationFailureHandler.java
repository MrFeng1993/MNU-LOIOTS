package com.mnu.sosm.config.security;

import com.alibaba.fastjson.JSON;
import com.mnu.sosm.utils.JsonModel;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.*;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * @Author: fenggn
 * @Description: 登录失败处理逻辑
 * @Date Create in 2022/6/3 15:52
 */
@Component
@Slf4j
public class CustomizeAuthenticationFailureHandler implements AuthenticationFailureHandler {


    @Override
    public void onAuthenticationFailure(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, AuthenticationException e) throws IOException, ServletException {

        log.info("登录失败***************");
                //返回json数据
        JsonModel result = null;
        if (e instanceof AccountExpiredException) {
            //账号过期
            result = new JsonModel(false,"账号过期");
        } else if (e instanceof BadCredentialsException) {
            //密码错误
            result = new JsonModel(false,"密码错误");
        } else if (e instanceof CredentialsExpiredException) {
            //密码过期
            result = new JsonModel(false,"密码过期");
        } else if (e instanceof DisabledException) {
            //账号不可用
            result = new JsonModel(false,"账号不可用");
        } else if (e instanceof LockedException) {
            //账号锁定
            result = new JsonModel(false,"账号锁定");
        } else if (e instanceof InternalAuthenticationServiceException) {
            //用户不存在
            result = new JsonModel(false,"用户不存在");
        }else{
            //其他错误
            result = new JsonModel(false,"其他错误");
        }
        //处理编码方式，防止中文乱码的情况
        httpServletResponse.setContentType("text/json;charset=utf-8");
        //塞到HttpServletResponse中返回给前台
        httpServletResponse.getWriter().write(JSON.toJSONString(result));
    }
}
