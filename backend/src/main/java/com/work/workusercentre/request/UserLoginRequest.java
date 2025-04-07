package com.work.workusercentre.request;

import lombok.Data;

import java.io.Serial;
import java.io.Serializable;

/**
 * 登入用户请求
 *
 * @author <a href="https://github.com/xiaogithuboo">limou3434</a>
 */
@Data
public class UserLoginRequest implements Serializable {

    private String userAccount;

    private String userPasswd;

    @Serial
    private static final long serialVersionUID = 1L;

}
