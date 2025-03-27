package com.work.workusercentre.service;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.service.IService;
import com.work.workusercentre.controller.request.UserSearchRequest;
import com.work.workusercentre.entity.User;
import com.work.workusercentre.controller.response.vo.LoginUserVO;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

/**
 * 用户服务层接口
 * 服务层需做复杂的参数校验, 并且完成复杂的业务逻辑
 *
 * @author <a href="https://github.com/xiaogithuboo">limou3434</a>
 * @description 针对表【user(用户信息表)】的数据库操作 Service
 * @createDate 2025-03-06 10:25:51
 */
public interface UserService extends IService<User> {

    /**
     * 用户注册服务
     *
     * @param userAccount 账号
     * @param userPasswd 密码
     * @param checkPasswd 确认密码
     * @return 用户 id
     */
    Long userRegister(String userAccount, String userPasswd, String checkPasswd);

    /**
     * 用户登入服务
     *
     * @param userAccount 账号
     * @param userPasswd 密码
     * @param request 请求体
     * @return 脱敏后的用户信息
     */
    LoginUserVO userLogin(String userAccount, String userPasswd, HttpServletRequest request, HttpServletResponse response);

    /**
     * 用户登出服务
     *
     * @param request 请求体
     * @return 是否登出成功
     */
    Boolean userLogout(HttpServletRequest request);

    /**
     * 获取当前登录用户信息
     * @param request 请求体
     * @return 当前登录用户的脱敏信息
     */
    LoginUserVO getLoginUserState(HttpServletRequest request);

    /**
     * 获取查询条件
     *
     * @param userSearchRequest 请求条件数据
     * @return 查询
     */
    LambdaQueryWrapper<User> getLambdaQueryWrapper(UserSearchRequest userSearchRequest);

}
