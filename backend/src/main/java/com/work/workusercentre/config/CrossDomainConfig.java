package com.work.workusercentre.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * 跨域配置类
 *
 * @author <a href="https://github.com/xiaogithuboo">limou3434</a>
 */
@Configuration
public class CrossDomainConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry
            .addMapping("/**")
            .allowedOriginPatterns(
                "http://127.0.0.1:3000", // 开发环境(无代理)
                "http://127.0.0.1:80" // 测试环境(有代理) 或 生产环境(有代理)
            )
            .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
            .allowCredentials(true)
            .maxAge(3600);
    }

}

// TODO: 改为读取配置文件的形式来配置
