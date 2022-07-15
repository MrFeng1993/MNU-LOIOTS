package com.mnu.loiots.config.security;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.support.ReloadableResourceBundleMessageSource;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.annotation.Resource;

/**
 * Spring Security 配置
 * 可以配置多个WebSecurityConfigurerAdapter
 * 但是多个Adaptor有执行顺序，默认值是100
 * 这里设置为1会优先执行
 */
@Configuration
@Order(1)
public class WebSecurityConfigurerAdapter extends org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter {


    @Resource
    private MyUserDetailsService myUserDetailsService;

    @Resource
    private CustomizeAuthenticationSuccessHandler authenticationSuccessHandler;

    @Resource
    private CustomSavedRequestAwareAuthenticationSuccessHandler customSavedRequestAwareAuthenticationSuccessHandler;


    @Resource
    private CustomizeAuthenticationFailureHandler authenticationFailureHandler;

    @Resource
    private CustomizeLogoutSuccessHandler logoutSuccessHandler;

    private String[] PERMIT_RES_LIST = {
            "/swagger-ui/swagger-resources/**",
            "/swagger-resources/**",
            "/webjars/**",
            "/swagger-ui/**",
            "/v2/api-docs",
            "/v3/api-docs",
            "/**/ig/**",
            "**"
    };


    @Override
    public void configure(HttpSecurity http) throws Exception {


        http
                .addFilterBefore(new SignInPasswordDecryptionFilter(), UsernamePasswordAuthenticationFilter.class)
                .formLogin()
//                .loginPage("/apis/login")
                .loginProcessingUrl("/login")
                .successHandler(customSavedRequestAwareAuthenticationSuccessHandler)//登录成功处理逻辑
//                .failureHandler(authenticationFailureHandler)//登录失败处理逻辑
                .and()
                .authorizeRequests()
                .antMatchers("/**/login","/**/ig/**","**").permitAll()//这里不加的话login会死循环
                .anyRequest()
                .authenticated()
                .and().logout()
//                .logoutUrl("/logout")
                .permitAll()//允许所有用户
                .logoutSuccessHandler(logoutSuccessHandler).//登出成功处理逻辑
                deleteCookies("JSESSIONID");//登出之后删除cookie
        http.csrf().disable();
        http.cors();
    }

    @Override
    public void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(myUserDetailsService)
                .passwordEncoder(passwordEncoder());
    }

    @Override
    public void configure(WebSecurity web) {
        //将项目中静态资源路径开放出来
        web.ignoring().antMatchers(PERMIT_RES_LIST);
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }



}
