package com.work.workusercentre.entity;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;

import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * @author <a href="https://github.com/xiaogithuboo">limou3434</a>
 * @description 针对表【user(用户信息表)】的实体类
 * @createDate 2025-03-06 10:25:51
 */
@TableName(value ="user")
@Data
public class User implements Serializable {

    /**
     * 本用户唯一标识(业务层需要考虑使用雪花算法用户标识的唯一性)
     */
    @TableId(value = "id", type = IdType.ASSIGN_ID) // 因此这里的雪花算法是自己添加的
    private Long id;

    /**
     * 账户号(业务层需要决定某一种或多种登录方式, 因此这里不限死为非空)
     */
    @TableField(value = "user_account")
    private String userAccount;

    /**
     * 微信号
     */
    @TableField(value = "user_wx_union")
    private String userWxUnion;

    /**
     * 公众号
     */
    @TableField(value = "user_mp_open")
    private String userMpOpen;

    /**
     * 邮箱号
     */
    @TableField(value = "user_email")
    private String userEmail;

    /**
     * 电话号
     */
    @TableField(value = "user_phone")
    private String userPhone;

    /**
     * 身份证
     */
    @TableField(value = "user_ident")
    private String userIdent;

    /**
     * 用户密码(业务层强制刚刚注册的用户重新设置密码, 交给用户时默认密码为 1234567890, 并且加盐密码)
     */
    @TableField(value = "user_passwd")
    private String userPasswd;

    /**
     * 用户头像(业务层需要考虑默认头像使用 cos 对象存储)
     */
    @TableField(value = "user_avatar")
    private String userAvatar;

    /**
     * 用户标签(业务层需要 json 数组格式存储用户标签数组)
     */
    @TableField(value = "user_tags")
    private String userTags;

    /**
     * 用户昵称
     */
    @TableField(value = "user_nick")
    private String userNick;

    /**
     * 用户名字
     */
    @TableField(value = "user_name")
    private String userName;

    /**
     * 用户简介
     */
    @TableField(value = "user_profile")
    private String userProfile;

    /**
     * 用户生日
     */
    @TableField(value = "user_birthday")
    private String userBirthday;

    /**
     * 用户国家
     */
    @TableField(value = "user_country")
    private String userCountry;

    /**
     * 用户地址
     */
    @TableField(value = "user_address")
    private String userAddress;

    /**
     * 用户角色(业务层需知 0 为用户, 1 为管理, 2 为封号, ...)
     */
    @TableField(value = "user_role")
    private Integer userRole;

    /**
     * 用户等级(业务层需知 0 为 level0, 1 为 level1, 2 为 level2, 3 为 level3, ...)
     */
    @TableField(value = "user_level")
    private Integer userLevel;

    /**
     * 用户性别(业务层需知 0 为未知, 1 为男性, 2 为女性)
     */
    @TableField(value = "user_gender")
    private Integer userGender;

    /**
     * 是否删除(0 为未删除, 1 为已删除)
     */
    @TableLogic
    @TableField(value = "deleted")
    private Integer deleted;

    /**
     * 创建时间(受时区影响)
     */
    @TableField(value = "create_time")
    private LocalDateTime createTime;

    /**
     * 更新时间(受时区影响)
     */
    @TableField(value = "update_time")
    private LocalDateTime updateTime;

    @Serial
    @TableField(exist = false)
    private static final long serialVersionUID = 1L;

    @Override
    public boolean equals(Object that) {
        if (this == that) {
            return true;
        }
        if (that == null) {
            return false;
        }
        if (getClass() != that.getClass()) {
            return false;
        }
        User other = (User) that;
        return (this.getId() == null ? other.getId() == null : this.getId().equals(other.getId()))
            && (this.getUserAccount() == null ? other.getUserAccount() == null : this.getUserAccount().equals(other.getUserAccount()))
            && (this.getUserWxUnion() == null ? other.getUserWxUnion() == null : this.getUserWxUnion().equals(other.getUserWxUnion()))
            && (this.getUserMpOpen() == null ? other.getUserMpOpen() == null : this.getUserMpOpen().equals(other.getUserMpOpen()))
            && (this.getUserEmail() == null ? other.getUserEmail() == null : this.getUserEmail().equals(other.getUserEmail()))
            && (this.getUserPhone() == null ? other.getUserPhone() == null : this.getUserPhone().equals(other.getUserPhone()))
            && (this.getUserIdent() == null ? other.getUserIdent() == null : this.getUserIdent().equals(other.getUserIdent()))
            && (this.getUserPasswd() == null ? other.getUserPasswd() == null : this.getUserPasswd().equals(other.getUserPasswd()))
            && (this.getUserAvatar() == null ? other.getUserAvatar() == null : this.getUserAvatar().equals(other.getUserAvatar()))
            && (this.getUserTags() == null ? other.getUserTags() == null : this.getUserTags().equals(other.getUserTags()))
            && (this.getUserNick() == null ? other.getUserNick() == null : this.getUserNick().equals(other.getUserNick()))
            && (this.getUserName() == null ? other.getUserName() == null : this.getUserName().equals(other.getUserName()))
            && (this.getUserProfile() == null ? other.getUserProfile() == null : this.getUserProfile().equals(other.getUserProfile()))
            && (this.getUserBirthday() == null ? other.getUserBirthday() == null : this.getUserBirthday().equals(other.getUserBirthday()))
            && (this.getUserCountry() == null ? other.getUserCountry() == null : this.getUserCountry().equals(other.getUserCountry()))
            && (this.getUserAddress() == null ? other.getUserAddress() == null : this.getUserAddress().equals(other.getUserAddress()))
            && (this.getUserRole() == null ? other.getUserRole() == null : this.getUserRole().equals(other.getUserRole()))
            && (this.getUserLevel() == null ? other.getUserLevel() == null : this.getUserLevel().equals(other.getUserLevel()))
            && (this.getUserGender() == null ? other.getUserGender() == null : this.getUserGender().equals(other.getUserGender()))
            && (this.getDeleted() == null ? other.getDeleted() == null : this.getDeleted().equals(other.getDeleted()))
            && (this.getCreateTime() == null ? other.getCreateTime() == null : this.getCreateTime().equals(other.getCreateTime()))
            && (this.getUpdateTime() == null ? other.getUpdateTime() == null : this.getUpdateTime().equals(other.getUpdateTime()));
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((getId() == null) ? 0 : getId().hashCode());
        result = prime * result + ((getUserAccount() == null) ? 0 : getUserAccount().hashCode());
        result = prime * result + ((getUserWxUnion() == null) ? 0 : getUserWxUnion().hashCode());
        result = prime * result + ((getUserMpOpen() == null) ? 0 : getUserMpOpen().hashCode());
        result = prime * result + ((getUserEmail() == null) ? 0 : getUserEmail().hashCode());
        result = prime * result + ((getUserPhone() == null) ? 0 : getUserPhone().hashCode());
        result = prime * result + ((getUserIdent() == null) ? 0 : getUserIdent().hashCode());
        result = prime * result + ((getUserPasswd() == null) ? 0 : getUserPasswd().hashCode());
        result = prime * result + ((getUserAvatar() == null) ? 0 : getUserAvatar().hashCode());
        result = prime * result + ((getUserTags() == null) ? 0 : getUserTags().hashCode());
        result = prime * result + ((getUserNick() == null) ? 0 : getUserNick().hashCode());
        result = prime * result + ((getUserName() == null) ? 0 : getUserName().hashCode());
        result = prime * result + ((getUserProfile() == null) ? 0 : getUserProfile().hashCode());
        result = prime * result + ((getUserBirthday() == null) ? 0 : getUserBirthday().hashCode());
        result = prime * result + ((getUserCountry() == null) ? 0 : getUserCountry().hashCode());
        result = prime * result + ((getUserAddress() == null) ? 0 : getUserAddress().hashCode());
        result = prime * result + ((getUserRole() == null) ? 0 : getUserRole().hashCode());
        result = prime * result + ((getUserLevel() == null) ? 0 : getUserLevel().hashCode());
        result = prime * result + ((getUserGender() == null) ? 0 : getUserGender().hashCode());
        result = prime * result + ((getDeleted() == null) ? 0 : getDeleted().hashCode());
        result = prime * result + ((getCreateTime() == null) ? 0 : getCreateTime().hashCode());
        result = prime * result + ((getUpdateTime() == null) ? 0 : getUpdateTime().hashCode());
        return result;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append(getClass().getSimpleName());
        sb.append(" [");
        sb.append("Hash = ").append(hashCode());
        sb.append(", id=").append(id);
        sb.append(", userAccount=").append(userAccount);
        sb.append(", userWxUnion=").append(userWxUnion);
        sb.append(", userMpOpen=").append(userMpOpen);
        sb.append(", userEmail=").append(userEmail);
        sb.append(", userPhone=").append(userPhone);
        sb.append(", userIdent=").append(userIdent);
        sb.append(", userPasswd=").append(userPasswd);
        sb.append(", userAvatar=").append(userAvatar);
        sb.append(", userTags=").append(userTags);
        sb.append(", userNick=").append(userNick);
        sb.append(", userName=").append(userName);
        sb.append(", userProfile=").append(userProfile);
        sb.append(", userBirthday=").append(userBirthday);
        sb.append(", userCountry=").append(userCountry);
        sb.append(", userAddress=").append(userAddress);
        sb.append(", userRole=").append(userRole);
        sb.append(", userLevel=").append(userLevel);
        sb.append(", userGender=").append(userGender);
        sb.append(", deleted=").append(deleted);
        sb.append(", createTime=").append(createTime);
        sb.append(", updateTime=").append(updateTime);
        sb.append(", serialVersionUID=").append(serialVersionUID);
        sb.append("]");
        return sb.toString();
    }

}
