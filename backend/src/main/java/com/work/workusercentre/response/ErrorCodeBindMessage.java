package com.work.workusercentre.response;

import lombok.Getter;

/**
 * 自定义 错误-含义 枚举体
 *
 * @author <a href="https://github.com/xiaogithuboo">dididada</a>
 */
@Getter // 等价于只能用在类上的 Data
public enum ErrorCodeBindMessage {

    /**
     * 枚举常量
     */
    SUCCESS(0, "ok"),
    PARAMS_ERROR(40000, "请求参数错误"),
    NOT_LOGIN_ERROR(40100, "未登录"),
    NO_AUTH_ERROR(40101, "无权限"),
    NOT_FOUND_ERROR(40400, "请求数据不存在"),
    FORBIDDEN_ERROR(40300, "禁止访问"),
    TIMEOUT_ERROR(40800, "请求超时"),
    SYSTEM_ERROR(50000, "系统内部异常"),
    OPERATION_ERROR(50001, "操作失败");

    /**
     * 状态
     */
    private final int code;

    /**
     * 含义
     */
    private final String message;

    /**
     * 内部构造方法, 可以自定义其他的错误码及其含义
     *
     * @param code 状态
     * @param message 含义
     */
    ErrorCodeBindMessage(int code, String message) {
        this.code = code;
        this.message = message;
    }

}
