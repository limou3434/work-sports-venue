package com.work.workusercentre.request;

import lombok.Data;

import java.io.Serial;
import java.io.Serializable;

/**
 * 修改用户请求
 *
 * @author <a href="https://github.com/xiaogithuboo">limou3434</a>
 */
@Data
public class UserUpdateRequest implements Serializable {

    private Long id; // 这个 id 是用来寻找需要更新的用户的

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

    private Integer userRole;

    private Integer userLevel;

    private Integer userGender;

    @Serial
    private static final long serialVersionUID = 1L;

}
