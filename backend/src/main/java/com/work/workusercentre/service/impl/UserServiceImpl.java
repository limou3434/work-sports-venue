package com.work.workusercentre.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.work.workusercentre.controller.request.UserSearchRequest;
import com.work.workusercentre.entity.User;
import com.work.workusercentre.exception.ArgumentException;
import com.work.workusercentre.mapper.UserMapper;
import com.work.workusercentre.controller.response.ErrorCodeBindMessage;
import com.work.workusercentre.service.UserService;
import com.work.workusercentre.controller.response.vo.LoginUserVO;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.DigestUtils;

import java.nio.charset.StandardCharsets;

import static com.work.workusercentre.contant.ConfigConstant.SALT;
import static com.work.workusercentre.contant.UserConstant.USER_LOGIN_STATE;

/**
 * 用户服务层实现
 *
 * @author <a href="https://github.com/xiaogithuboo">limou3434</a>
 * @description 针对表【user(用户信息表)】的数据库操作 Service 实现
 * @createDate 2025-03-06 10:25:51
 */
@Service
@Transactional
@Slf4j
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements UserService {

    @Override
    public Long userRegister(String userAccount, String userPasswd, String checkPasswd) {
        // 1. 参数校验
        // 判断传入的所有字符串是否都是空白(null、空字符串、仅包含空格）
        if (StringUtils.isAllBlank(userAccount, userPasswd, checkPasswd)) {
            throw new ArgumentException(ErrorCodeBindMessage.PARAMS_ERROR, "请输入账户、密码、确认密码后再注册");
        }

        // 判断账户和密码的长度是否符合要求
        if (userAccount.length() < 4 || userPasswd.length() < 6 || checkPasswd.length() < 6) {
            throw new ArgumentException(ErrorCodeBindMessage.PARAMS_ERROR, "账户不得小于 4 位、密码和确认密码均不小于 6 位");
        }

        // 避免账户中的非法字符
        String validPattern = "^[a-zA-Z0-9$_-]+$";
        if (!userPasswd.matches(validPattern)) {
            throw new ArgumentException(ErrorCodeBindMessage.PARAMS_ERROR, "密码和确认密码均不能包含特殊字符");
        }

        // 判断两次输入的密码是否一致
        if (!userPasswd.equals(checkPasswd)) {
            throw new ArgumentException(ErrorCodeBindMessage.PARAMS_ERROR, "新密码和确认密码不一致");
        }

        // 避免重复注册用户
        LambdaQueryWrapper<User> lambdaQueryWrapper = new LambdaQueryWrapper<>();
        lambdaQueryWrapper.eq(User::getUserAccount, userAccount);
        if (this.count(lambdaQueryWrapper) > 0) {
            throw new ArgumentException(ErrorCodeBindMessage.OPERATION_ERROR, "不允许重复注册已存在的用户");
        }

        // 2. 密码加密
        String newUserPasswd = DigestUtils.md5DigestAsHex((SALT + userPasswd).getBytes(StandardCharsets.UTF_8));

        // 3. 创建用户
        User user = new User();
        user.setUserAccount(userAccount);
        user.setUserPasswd(newUserPasswd);

        // 4. 注册用户
        boolean saveResult = this.save(user);
        if (!saveResult) {
            throw new ArgumentException(ErrorCodeBindMessage.SYSTEM_ERROR, "出现拆箱错误");
        }

        return user.getId();
    }

    @Override
    public LoginUserVO userLogin(String userAccount, String userPasswd, HttpServletRequest request, HttpServletResponse response) {
        // 1. 参数校验
        // 判断传入的所有字符串是否都是空白(null、空字符串、仅包含空格）
        if (StringUtils.isAllBlank(userAccount, userPasswd)) {
            throw new ArgumentException(ErrorCodeBindMessage.PARAMS_ERROR, "请输入账户、密码后再登录");
        }

        // 判断账户和密码的长度是否符合要求
        if (userAccount.length() < 4 || userPasswd.length() < 6) {
            throw new ArgumentException(ErrorCodeBindMessage.PARAMS_ERROR, "账户不得小于 4 位、密码不小于 6 位");
        }

        // 避免账户中的非法字符
        String validPattern = "^[a-zA-Z0-9$_-]+$";
        if (!userPasswd.matches(validPattern)) {
            throw new ArgumentException(ErrorCodeBindMessage.PARAMS_ERROR, "密码不能包含特殊字符");
        }

        // 2. 密码加密
        String newUserPasswd = DigestUtils.md5DigestAsHex((SALT + userPasswd).getBytes(StandardCharsets.UTF_8));

        // 3. 查询用户
        LambdaQueryWrapper<User> lambdaQueryWrapper = new LambdaQueryWrapper<>();
        lambdaQueryWrapper.eq(User::getUserAccount, userAccount).eq(User::getUserPasswd, newUserPasswd);
        User user = this.getOne(lambdaQueryWrapper);
        if (user == null) {
            throw new ArgumentException(ErrorCodeBindMessage.PARAMS_ERROR, "可能该用户不存在, 也可能是密码错误");
        }

        // 4. 脱敏信息
        LoginUserVO safetUser = LoginUserVO.removeSensitiveData(user);

        // 5. 创建会话
        // session 数据存储在应用服务器 Tomcat 中, 以后可以通过 request.getSession().getAttribute(USER_LOGIN_STA) 取出用户登陆自己浏览器中本应用的 session 信息 safetUser, 不过类型变成了 Object, 可以后续强转恢复
        request.getSession().setAttribute(USER_LOGIN_STATE, safetUser); // TODO: 改为 Redis 分布式存储

        return safetUser;
    }

    @Override
    public Boolean userLogout(HttpServletRequest request) {
        request.getSession().removeAttribute(USER_LOGIN_STATE); // TODO: 改为 Redis 分布式存储
        return true;
    }

    @Override
    public LoginUserVO getLoginUserState(HttpServletRequest request) {
        // 先判断是否已登录
        var localCurrentUser = (LoginUserVO)request.getSession().getAttribute(USER_LOGIN_STATE);

        if (localCurrentUser == null) {
            throw new ArgumentException(ErrorCodeBindMessage.NOT_LOGIN_ERROR, "请先进行登录");
        }

        // 从数据库查询 // TODO: 追求性能的话可以注释, 直接走缓存
        long userId = localCurrentUser.getId();
        User remoteCurrentUser = this.getById(userId); // 由于 id 值不变就可以保证快速获取到被其他地方修改的用户信息
        if (remoteCurrentUser == null) {
            throw new ArgumentException(ErrorCodeBindMessage.NOT_FOUND_ERROR, "该用户已被管理员删除");
        }
        return LoginUserVO.removeSensitiveData(remoteCurrentUser);
    }

    @Override
    public LambdaQueryWrapper<User> getLambdaQueryWrapper(UserSearchRequest userSearchRequest) {
        // 校验数据
        if (userSearchRequest == null) {
            throw new ArgumentException(ErrorCodeBindMessage.PARAMS_ERROR, "请求参数为空");
        }

        // 处理数据
        Long id = userSearchRequest.getId();
        String userAccount = userSearchRequest.getUserAccount();
        Integer userRole = userSearchRequest.getUserRole();
        Integer userLevel = userSearchRequest.getUserLevel();
        String sortOrder = userSearchRequest.getSortOrder();
        String sortField = userSearchRequest.getSortField();

        // 操作数据
        LambdaQueryWrapper<User> lambdaQueryWrapper = new LambdaQueryWrapper<>();
        lambdaQueryWrapper.eq(id != null, User::getId, id);
        lambdaQueryWrapper.eq(StringUtils.isNotBlank(userAccount), User::getUserAccount, userAccount);
        lambdaQueryWrapper.eq(userRole != null, User::getUserRole, userRole);
        lambdaQueryWrapper.eq(userLevel != null, User::getUserLevel, userLevel);
        lambdaQueryWrapper.orderBy(
                StringUtils.isNotBlank(sortField) && !StringUtils.containsAny(sortField, "=", "(", ")", " "),
                sortOrder.equals("ascend"), // true 代表 ASC 升序, false 代表 DESC 降序
                User::getUserAccount // TODO: 先默认按照账户排序
        );

        // 响应数据
        return lambdaQueryWrapper;
    }

}
