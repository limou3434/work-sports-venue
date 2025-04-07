package com.work.workusercentre.config;

import lombok.Data;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

/**
 * 加密盐值配置类
 *
 * @author <a href="https://github.com/xiaogithuboo">dididada</a>
 */
@Component
@Data
public class PasswdSaltConfig {

    @Value("${spring.salt}")
    String salt; // 导入项目名称作为盐值, 如果需要安全则可以注释掉注解并且直接赋值

}
