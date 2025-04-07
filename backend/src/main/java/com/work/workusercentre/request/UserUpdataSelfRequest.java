package com.work.workusercentre.request;

import lombok.Data;

import java.io.Serial;
import java.io.Serializable;

/**
 * 修改用户请求(自己)
 *
 * @author <a href="https://github.com/xiaogithuboo">dididada</a>
 */
@Data
public class UserUpdataSelfRequest implements Serializable {

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

    private Integer userGender;

    @Serial
    private static final long serialVersionUID = 1L;

}
