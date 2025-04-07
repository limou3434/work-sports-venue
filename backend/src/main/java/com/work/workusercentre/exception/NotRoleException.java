package com.work.workusercentre.exception;

import com.work.workusercentre.response.ErrorCodeBindMessage;
import lombok.Getter;

/**
 * 权限异常类
 *
 * @author <a href="https://github.com/xiaogithuboo">dididada</a>
 */
@Getter
public class NotRoleException extends RuntimeException {

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
    public NotRoleException(ErrorCodeBindMessage errorCodeBindMessage, String exceptionMessage) {
        super(errorCodeBindMessage.getMessage() + ": " + exceptionMessage);
        this.code = errorCodeBindMessage.getCode();
    }

}
