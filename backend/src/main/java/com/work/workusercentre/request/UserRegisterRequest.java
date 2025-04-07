package com.work.workusercentre.request;

import lombok.Data;

import java.io.Serial;
import java.io.Serializable;

/**
 * 注册用户请求
 *
 * @author <a href="https://github.com/xiaogithuboo">dididada</a>
 */
@Data
public class UserRegisterRequest implements Serializable {

    private String userAccount;

    private String userPasswd;

    private String checkPasswd;

    @Serial
    private static final long serialVersionUID = 1L;

}
