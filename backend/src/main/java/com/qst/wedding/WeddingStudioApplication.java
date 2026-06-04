package com.qst.wedding;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * 婚纱影楼管理系统启动类。
 */
@SpringBootApplication
@MapperScan("com.qst.wedding.mapper")
public class WeddingStudioApplication {

    public static void main(String[] args) {
        SpringApplication.run(WeddingStudioApplication.class, args);
    }
}
