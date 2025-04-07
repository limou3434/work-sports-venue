package com.work.workusercentre.vo;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import com.work.workusercentre.entity.User;
import lombok.Data;
import org.springframework.beans.BeanUtils;

import java.io.Serial;
import java.io.Serializable;

/**
 * 登录用户脱敏
 *
 * @author <a href="https://github.com/xiaogithuboo">limou3434</a>
 */
@Data
public class LoginUserVO implements Serializable {

    @JsonSerialize(using = ToStringSerializer.class) // 非常重要的注解, 只转换 Long, 为字符串, 避免前端 JS 精度不行导致获取到错误的 ID
    private Long id;

    private String userAccount;

    private String userWxUnion;

    private String userMpOpen;

    private String userEmail;

    private String userPhone;

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

    /**
     * 脱敏方法
     *
     * @param user 用户信息
     * @return 脱敏后的用户信息
     */
    static public LoginUserVO removeSensitiveData(User user) {
        if (user == null) {
            return null;
        }
        var userVO = new LoginUserVO();
        BeanUtils.copyProperties(user, userVO);
        return userVO;
    }

}
