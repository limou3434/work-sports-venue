package com.work.workusercentre.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * 跨域共享配置类
 *
 * @author <a href="https://github.com/xiaogithuboo">dididada</a>
 */
@Configuration
public class CrossDomainConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry
                .addMapping("/**")
                .allowedOriginPatterns(
                        "http://127.0.0.1:3000", // 开发环境
                        "http://10.10.174.243:3000", // 测试环境
                        "http://134.175.86.228:3000" // 测试环境
                )
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowCredentials(true)
                .maxAge(3600);
    }

}
