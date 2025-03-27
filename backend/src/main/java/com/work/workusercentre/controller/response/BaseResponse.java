package com.work.workusercentre.controller.response;

import lombok.Data;

import java.io.Serializable;

/**
 * 通用响应体描述类
 *
 * @author <a href="https://github.com/xiaogithuboo">limou3434</a>
 */
@Data
public class BaseResponse<T> implements Serializable {

    /**
     * 状态
     */
    private int code;

    /**
     * 含义
     */
    private String message;

    /**
     * 数据
     */
    private T data;

    /**
     * 构造方法
     *
     * @param errorCodeBindMessage 错误-含义 枚举体
     * @param data 数据
     */
    public BaseResponse(ErrorCodeBindMessage errorCodeBindMessage, T data) {
        this.code = errorCodeBindMessage.getCode();
        this.message = errorCodeBindMessage.getMessage();
        this.data = data;
    }

    /**
     * 构造方法
     *
     * @param code 状态
     * @param message 含义
     * @param data 数据
     */
    public BaseResponse(int code, String message, T data) {
        this.code = code;
        this.message = message;
        this.data = data;
    }

    /**
     * 构造方法
     *
     * @param errorCodeBindMessage 错误-含义 枚举体
     */
    public BaseResponse(ErrorCodeBindMessage errorCodeBindMessage) {
        this.code = errorCodeBindMessage.getCode();
        this.message = errorCodeBindMessage.getMessage();
        this.data = null;
    }

    /**
     * 构造方法
     *
     * @param code 状态
     * @param message 含义
     */
    public BaseResponse(int code, String message) {
        this.code = code;
        this.message = message;
        this.data = null;
    }

}
