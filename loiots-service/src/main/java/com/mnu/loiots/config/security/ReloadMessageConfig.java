package com.mnu.loiots.config.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.support.ReloadableResourceBundleMessageSource;

/**
 * @BelongsProject: LOIOTS
 * @BelongsPackage: com.mnu.loiots.config.security
 * @Author: fenggn
 * @CreateTime: 2022-07-12  12:47
 * @Description: 加载中文认证提示信息
 * @Version: 1.0
 */

@Configuration
public class ReloadMessageConfig {

    @Bean //加载中文认证提示信息
    public ReloadableResourceBundleMessageSource messageSource(){
        ReloadableResourceBundleMessageSource messageSource = new ReloadableResourceBundleMessageSource();
        //加载org/springframework/security包下的中文提示信息 配置文件
        messageSource.setBasename("classpath:org/springframework/security/messages_zh_CN");
        return messageSource;
    }
}
