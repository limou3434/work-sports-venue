-- 数据源整体结构
--
-- <a href="https://github.com/xiaogithuboo">limou3434</a>
-- 项目数库
DROP DATABASE IF EXISTS work_user_centre;
CREATE DATABASE work_user_centre COLLATE = utf8mb4_unicode_ci;
USE work_user_centre;

-- 项目用户
DROP USER IF EXISTS 'work_uc'@'%';
CREATE USER 'work_uc'@'%' IDENTIFIED BY '123456';
GRANT ALL PRIVILEGES ON work_user_centre.* TO 'work_uc'@'%';
FLUSH PRIVILEGES;

-- 项目数表
-- 用户角色表
-- DROP TABLE IF EXISTS user_role;
CREATE TABLE user_role (
    id              TINYINT            NOT NULL                                              COMMENT '本角色唯一标识(业务层需要考虑使用雪花算法用户标识的唯一性)',
    user_role_name  VARCHAR(50)        NULL                                                  COMMENT '角色名称',
    PRIMARY KEY (id) -- 主键
) COLLATE = utf8mb4_unicode_ci                                                               COMMENT '用户角色表';

INSERT INTO user_role (id, user_role_name) VALUES
    (0, '用户'),
    (1, '管理'),
    (2, '封号')
;

-- 用户信息表
-- DROP TABLE IF EXISTS user;
CREATE TABLE user (
    id              BIGINT UNSIGNED    AUTO_INCREMENT                                        COMMENT '本用户唯一标识(业务层需要考虑使用雪花算法用户标识的唯一性)',
    user_account    VARCHAR(256)       NULL                                                  COMMENT '账户号(业务层需要决定某一种或多种登录方式, 因此这里不限死为非空)', -- 采用下划线风格, 采用表名前缀标识业务中的重要字段避免关键字冲突问题
    user_wx_union   VARCHAR(256)       NULL                                                  COMMENT '微信号',
    user_mp_open    VARCHAR(256)       NULL                                                  COMMENT '公众号',
    user_email      VARCHAR(256)       NULL                                                  COMMENT '邮箱号',
    user_phone      VARCHAR(20)        NULL                                                  COMMENT '电话号',
    user_ident      VARCHAR(50)        NULL                                                  COMMENT '身份证',
    user_passwd     VARCHAR(512)       NOT NULL                                              COMMENT '用户密码(业务层强制刚刚注册的用户重新设置密码, 交给用户时默认密码为 123456, 并且加盐密码)',
    user_avatar     VARCHAR(1024)      NULL                                                  COMMENT '用户头像(业务层需要考虑默认头像使用 cos 对象存储)',
    user_tags       VARCHAR(1024)      NULL                                                  COMMENT '用户标签(业务层需要 json 数组格式存储用户标签数组)',
    user_nick       VARCHAR(256)       NULL                                                  COMMENT '用户昵称',
    user_name       VARCHAR(256)       NULL                                                  COMMENT '用户名字',
    user_profile    VARCHAR(512)       NULL                                                  COMMENT '用户简介',
    user_birthday   VARCHAR(512)       NULL                                                  COMMENT '用户生日',
    user_country    VARCHAR(50)        NULL                                                  COMMENT '用户国家',
    user_address    TEXT               NULL                                                  COMMENT '用户地址',
    user_role       TINYINT            DEFAULT 0                                             COMMENT '用户角色(业务层需知 0 为用户, 1 为管理, 2 为封号, ...)',
    user_level      TINYINT            DEFAULT 0                                             COMMENT '用户等级(业务层需知 0 为 level0, 1 为 level1, 2 为 level2, 3 为 level3, ...)',
    user_gender     TINYINT            DEFAULT 0                                             COMMENT '用户性别(业务层需知 0 为未知, 1 为男性, 2 为女性)',
    deleted         TINYINT            DEFAULT 0                                             COMMENT '是否删除(0 为未删除, 1 为已删除)',
    create_time     TIMESTAMP          DEFAULT CURRENT_TIMESTAMP                             COMMENT '创建时间(受时区影响)',
    update_time     TIMESTAMP          DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间(受时区影响)',
    PRIMARY KEY (id), -- 主键
    FOREIGN KEY (user_role) REFERENCES user_role (id)  ON DELETE SET NULL  ON UPDATE CASCADE, -- 外键
    INDEX idx_email (user_email), -- 根据数据是否具备区分度来建立索引
    INDEX idx_user_nick (user_nick)
) COLLATE = utf8mb4_unicode_ci                                                                 COMMENT '用户信息表';

-- ON DELETE SET NULL: 如果 user_role 表中的某个 id 被删除, 则 user 表中所有引用该 id 的 user_role 字段会被自动设置为 NULL, 这样可以避免删除 user_role 表的数据时导致 user 表中的数据失效或出错
-- ON UPDATE CASCADE: 如果 user_role 表中的某个 id 被修改(例如 ID 1 被改成 5), 则 user 表中所有引用该 id 的 user_role 字段会自动更新为新的值, 这样可以保持数据一致性，避免 user 表中的外键值失效。
