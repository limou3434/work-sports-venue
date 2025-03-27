package com.work.workusercentre.controller.request;

import lombok.Data;

import java.io.Serial;
import java.io.Serializable;

/**
 * 注册用户请求
 *
 * @author <a href="https://github.com/xiaogithuboo">limou3434</a>
 */
@Data
public class UserRegisterRequest implements Serializable {

    private String userAccount;

    private String userPasswd;

    private String checkPasswd;

    @Serial
    private static final long serialVersionUID = 1L;

}
