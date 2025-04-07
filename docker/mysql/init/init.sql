-- 清理残留
DROP DATABASE IF EXISTS work_user_centre;
CREATE DATABASE work_user_centre CHARACTER SET utf8mb4 COLLATE = utf8mb4_unicode_ci;
USE work_user_centre;

-- 项目用户
DROP USER IF EXISTS 'wuc'@'%';
CREATE USER 'wuc'@'%' IDENTIFIED BY 'Qwe54188_';
GRANT ALL PRIVILEGES ON work_user_centre.* TO 'wuc'@'%';
FLUSH PRIVILEGES;

-- 项目数表
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
                      user_role       TINYINT            DEFAULT 0                                             COMMENT '用户角色(业务层需知 0 为用户, 1 为管理, 2 为封号, 3 为教练, 4 为学员,...)',
                      user_level      TINYINT            DEFAULT 0                                             COMMENT '用户等级(业务层需知 0 为 level0, 1 为 level1, 2 为 level2, 3 为 level3, ...)',
                      user_gender     TINYINT            DEFAULT 0                                             COMMENT '用户性别(业务层需知 0 为未知, 1 为男性, 2 为女性)',
                      deleted         TINYINT            DEFAULT 0                                             COMMENT '是否删除(0 为未删除, 1 为已删除)',
                      create_time     TIMESTAMP          DEFAULT CURRENT_TIMESTAMP                             COMMENT '创建时间(受时区影响)',
                      update_time     TIMESTAMP          DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间(受时区影响)',
                      PRIMARY KEY (id), -- 主键
                      FOREIGN KEY (user_role) REFERENCES user_role (id)  ON DELETE SET NULL  ON UPDATE CASCADE, -- 外键
                      INDEX idx_email (user_email), -- 根据数据是否具备区分度来建立索引
                      INDEX idx_user_nick (user_nick)
) COLLATE = utf8mb4_unicode_ci                                                               COMMENT '用户信息表';
-- ON DELETE SET NULL: 如果 user_role 表中的某个 id 被删除, 则 user 表中所有引用该 id 的 user_role 字段会被自动设置为 NULL, 这样可以避免删除 user_role 表的数据时导致 user 表中的数据失效或出错
-- ON UPDATE CASCADE: 如果 user_role 表中的某个 id 被修改(例如 ID 1 被改成 5), 则 user 表中所有引用该 id 的 user_role 字段会自动更新为新的值, 这样可以保持数据一致性，避免 user 表中的外键值失效

INSERT INTO user (user_account, user_wx_union, user_mp_open, user_email, user_phone, user_ident, user_passwd, user_avatar, user_tags, user_nick, user_name, user_profile, user_birthday, user_country, user_address, user_role, user_level, user_gender, deleted)
VALUES
    ('0001', 'wx_union_0001', 'mp_open_0001', '0001@example.com', '13800138001', '370101198701012345', 'ff5e16596809393e26ad6af86b9cc72e', 'https://picx.zhimg.com/v2-a78a82a91a651a6f395f57591117e4fb_xll.jpg?source=32738c0c&needBackground=1', '["管理, 老板"]', '0001', '艾梦', '这是艾梦的个人简介', '1987-01-01', '中国', '北京市朝阳区', 1, 1, 1, 0),
    ('0002', 'wx_union_0002', 'mp_open_0002', '0002@example.com', '13800138002', '370101198802022345', 'ff5e16596809393e26ad6af86b9cc72e', 'https://pica.zhimg.com/v2-605153c98317921c90da2a5c3ade332b_xll.jpg?source=32738c0c&needBackground=1', '["教练, 全职"]', '0002', '白萌', '这是白萌的个人简介', '1988-02-02', '中国', '上海市浦东区', 0, 2, 2, 0),
    ('0003', 'wx_union_0003', 'mp_open_0003', '0003@example.com', '13800138003', '370101198903032345', 'ff5e16596809393e26ad6af86b9cc72e', 'https://picx.zhimg.com/v2-36be42677aa50074d25030b75c4f575d_xll.jpg?source=32738c0c&needBackground=1', '["学员, 月卡"]', '0003', '陈明', '这是陈明的个人简介', '1989-03-03', '中国', '广州市天河区', 0, 1, 1, 0)
;

