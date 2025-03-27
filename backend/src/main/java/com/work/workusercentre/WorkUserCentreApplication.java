package com.work.workusercentre;

import lombok.extern.slf4j.Slf4j;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Spring Boot 启动类
 *
 * @author <a href="https://github.com/xiaogithuboo">limou3434</a>
 */
@SpringBootApplication
@MapperScan("com.work.workusercentre.mapper") // 启用 MyBatisPlus 扫描 ./src/Mapper/ 中的映射
@Slf4j
public class WorkUserCentreApplication {
    public static void main(String[] args) {
        /* var context = */ SpringApplication.run(WorkUserCentreApplication.class, args);
        log.info("访问 http://localhost:8000/work_tongue_diagnosis_api/doc.html 即可得到在线文档");
    }
}
