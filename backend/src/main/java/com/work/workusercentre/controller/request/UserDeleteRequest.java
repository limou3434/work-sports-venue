package com.work.workusercentre.controller.request;

import lombok.Data;

import java.io.Serial;
import java.io.Serializable;

/**
 * 删除用户请求
 *
 * @author <a href="https://github.com/xiaogithuboo">limou3434</a>
 */
@Data
public class UserDeleteRequest implements Serializable {

    private Long id;

    @Serial
    private static final long serialVersionUID = 1L;

}
