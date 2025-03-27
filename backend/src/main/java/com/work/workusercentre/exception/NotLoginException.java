package com.work.workusercentre.exception;

import com.work.workusercentre.controller.response.ErrorCodeBindMessage;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;

/**
 * 权限异常类
 *
 * @author <a href="https://github.com/xiaogithuboo">limou3434</a>
 */
@Getter
@Slf4j
public class NotLoginException extends RuntimeException {

    /**
     * 错误码
     */
    private final int code;

    /**
     * 构造异常对象
     *
     * @param errorCodeBindMessage 错误-含义 枚举体
     * @param exceptionMessage 异常信息
     */
    public NotLoginException(ErrorCodeBindMessage errorCodeBindMessage, String exceptionMessage) {
        super(errorCodeBindMessage.getMessage() + ": " + exceptionMessage);
        this.code = errorCodeBindMessage.getCode();
    }

}
