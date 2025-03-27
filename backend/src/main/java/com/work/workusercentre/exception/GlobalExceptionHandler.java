package com.work.workusercentre.exception;

import com.work.workusercentre.controller.response.BaseResponse;
import com.work.workusercentre.controller.response.ErrorCodeBindMessage;
import com.work.workusercentre.controller.response.TheResult;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

/**
 * 全局异常处理方法类
 *
 * 截获异常, 把异常的 "错误-含义:消息" 作为响应传递给前端
 * @author <a href="https://github.com/xiaogithuboo">limou3434</a>
 */
@RestControllerAdvice(basePackages = "com.work.workusercentre.controller") // 使用 @RestControllerAdvice 可以拦截所有 @RestController 中抛出的异常, 并统一返回 JSON 格式的错误信息, 不过由于版本过新, 需要考虑问题 https://github.com/xiaoymin/knife4j/issues/884
@Slf4j
public class GlobalExceptionHandler {

    /**
     * 参数异常处理方法
     *
     * @param e 参数异常对象
     * @return 包含错误原因的通用响应体对象
     */
    @ExceptionHandler(ArgumentException.class)
    public BaseResponse<?> argumentExceptionHandler(ArgumentException e) {
        return TheResult.error(e.getCode(), e.getMessage());
    }

    /**
     * 权限异常处理方法
     *
     * @param e 权限异常对象
     * @return 包含错误原因的通用响应体对象
     */
    @ExceptionHandler(NotRoleException.class)
    public BaseResponse<?> notRoleExceptionHandler(NotRoleException e) {
        return TheResult.error(e.getCode(), e.getMessage());
    }

    /**
     * 登录异常处理方法
     *
     * @param e 登录异常对象
     * @return 包含错误原因的通用响应体对象s
     */
    @ExceptionHandler(NotLoginException.class)
    public BaseResponse<?> notLoginExceptionHandler(NotLoginException e) {
        return TheResult.error(e.getCode(), e.getMessage());
    }

    /**
     * 系统异常处理方法
     *
     * @param e 系统异常对象
     * @return 包含错误原因的通用响应体对象
     */
    @ExceptionHandler(RuntimeException.class)
    public BaseResponse<?> runtimeExceptionHandler(RuntimeException e) {
        log.error("系统异常", e);
        return TheResult.error(ErrorCodeBindMessage.SYSTEM_ERROR);
    }
    
}
