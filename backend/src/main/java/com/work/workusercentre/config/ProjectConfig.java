package com.work.workusercentre.config;

import lombok.Data;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

/**
 * 应用项目配置类
 *
 * @author <a href="https://github.com/xiaogithuboo">limou3434</a>
 */
@Component
@Data
public class ProjectConfig {

    @Value("${spring.application.name}")
    String projectName;

    @Value("${server.servlet.context-path}")
    String apiPrefix;

    @Value("${server.address}")
    String ip;

    @Value("${server.port}")
    String port;

    String apiDoscUrl = "/doc.html";

    String apiDoscInfoUrl = "/v3/api-docs";

}
