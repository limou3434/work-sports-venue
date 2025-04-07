package com.work.workusercentre.request;

import lombok.Data;

import java.io.Serial;
import java.io.Serializable;

/**
 * 添加用户请求
 *
 * @author <a href="https://github.com/xiaogithuboo">dididada</a>
 */
@Data
public class UserAddRequest implements Serializable {

    private String userAccount;

    private String userWxUnion;

    private String userMpOpen;

    private String userEmail;

    private String userPhone;

    private String userIdent;

    private String userAvatar;

    private String userTags;

    private String userNick;

    private String userName;

    private String userProfile;

    private String userBirthday;

    private String userCountry;

    private String userAddress;

    private String userRole;

    private Integer userLevel;

    private Integer userGender;

    @Serial
    private static final long serialVersionUID = 1L;

}
