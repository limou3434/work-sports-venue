package com.work.workusercentre.response;

import static com.work.workusercentre.response.ErrorCodeBindMessage.SUCCESS;

/**
 * 便捷响应体包装类
 * 1. 返回成功
 *  (1) 返回成功, 自动处理, {code: 200, message: "success", data: {...}}
 *  (2) 返回成功, 手动处理, {code: xxx, message: "xxxxxxx", data: {...}}
 * 2. 返回失败
 *  (1) 返回失败, 自动处理, 系统内部使用
 *  (2) 返回失败, 手动处理, 全局异常使用
 *
 * @author <a href="https://github.com/xiaogithuboo">dididada</a>
 */
public class TheResult {

    /**
     * 构造成功响应体
     *
     * @param data 数据
     * @param <T> data 的类型
     * @return 通用响应体对象
     */
    public static <T> BaseResponse<T> success(T data) {
        return new BaseResponse<>(SUCCESS, data);
    }

    /**
     * 构造成功响应体
     *
     * @param code 状态
     * @param message 含义
     * @param data 数据
     * @param <T> data 的类型
     * @return 通用响应体对象
     */
    public static <T> BaseResponse<T> success(int code, String message, T data) {
        return new BaseResponse<>(code, message, data);
    }

    /**
     * 构造失败响应体
     *
     * @param errorCodeBindMessage 错误-含义 枚举体
     * @return 通用响应体对象
     */
    public static <T> BaseResponse<T> error(ErrorCodeBindMessage errorCodeBindMessage) {
        return new BaseResponse<>(errorCodeBindMessage);
    }

    /**
     * 构造失败响应体
     *
     * @param code 状态
     * @param message 含义
     * @return 通用响应体对象
     */
    public static <T> BaseResponse<T> error(int code, String message) {
        return new BaseResponse<>(code, message);
    }

}
