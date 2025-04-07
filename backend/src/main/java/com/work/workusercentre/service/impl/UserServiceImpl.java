package com.work.workusercentre.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.work.workusercentre.config.PasswdSaltConfig;
import com.work.workusercentre.contant.UserConstant;
import com.work.workusercentre.request.UserAddRequest;
import com.work.workusercentre.request.UserDeleteRequest;
import com.work.workusercentre.request.UserSearchRequest;
import com.work.workusercentre.request.UserUpdateRequest;
import com.work.workusercentre.response.ErrorCodeBindMessage;
import com.work.workusercentre.vo.LoginUserVO;
import com.work.workusercentre.entity.User;
import com.work.workusercentre.exception.ArgumentException;
import com.work.workusercentre.mapper.UserMapper;
import com.work.workusercentre.service.UserService;
import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.DigestUtils;

import java.nio.charset.StandardCharsets;
import java.util.List;

/**
 * 用户服务层实现
 *
 * @author <a href="https://github.com/xiaogithuboo">dididada</a>
 * @description 针对表【user(用户信息表)】的数据库操作 Service 实现
 * @createDate 2025-03-06 10:25:51
 */
@Service
@Transactional
@Slf4j
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements UserService {

    @Resource
    private PasswdSaltConfig passwdSaltConfig;

    @Override
    public Boolean userAdd(UserAddRequest userAddRequest) {

        // TODO: 1. 复杂校验

        // 处理请求
        var user = new User();
        String encryptPassword = DigestUtils.md5DigestAsHex((passwdSaltConfig.getSalt() + UserConstant.DEFAULT_PASSWD).getBytes());
        user.setUserPasswd(encryptPassword); // 设置默认密码
        user.setUserRole(0); // 设置默认角色
        BeanUtils.copyProperties(userAddRequest, user);
        return this.save(user);

    }

    @Override
    public Boolean userDelete(UserDeleteRequest userDeleteRequest) {

        // 参数校验
        if (userDeleteRequest.getId() <= 0) {
            throw new ArgumentException(ErrorCodeBindMessage.PARAMS_ERROR, "参数用户 id 不能为空");
        }

        // 处理请求
        return this.removeById(userDeleteRequest.getId()); // 这里 MyBatisPlus 会自动转化为逻辑删除

    }

    @Override
    public LoginUserVO userUpdate(UserUpdateRequest userUpdateRequest) {

        // 参数校验
        if (userUpdateRequest.getId() == null) {
            throw new ArgumentException(ErrorCodeBindMessage.PARAMS_ERROR, "参数用户 id 不能为空");
        }

        // 处理请求
        User user = new User();

        BeanUtils.copyProperties(userUpdateRequest, user);

        boolean result = this.updateById(user);
        if (!result) {
            throw new ArgumentException(ErrorCodeBindMessage.SYSTEM_ERROR, "需要指定参数用户 id 才能修改");
        }

        return LoginUserVO.removeSensitiveData(user);

    }

    @Override
    public List<LoginUserVO> userSearch(UserSearchRequest userSearchRequest) {

        // TODO: 参数校验

        // 处理请求
        List<User> userList = this.list(this.getLambdaQueryWrapper(userSearchRequest));
        return userList
                .stream() // 转化操作, 将 userList 转换为一个流
                .map(LoginUserVO::removeSensitiveData) // 中间操作, 将流中的每个元素都通过指定的函数进行转换
                .toList();

    }

    @Override
    public Long userRegister(String userAccount, String userPasswd, String checkPasswd) {

        // TODO: 复杂校验
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

        // 处理请求
        // 避免重复注册用户
        LambdaQueryWrapper<User> lambdaQueryWrapper = new LambdaQueryWrapper<>();
        lambdaQueryWrapper.eq(User::getUserAccount, userAccount);
        if (this.count(lambdaQueryWrapper) > 0) {
            throw new ArgumentException(ErrorCodeBindMessage.OPERATION_ERROR, "不允许重复注册已存在的用户");
        }

        // 密码加密
        String newUserPasswd = DigestUtils.md5DigestAsHex((passwdSaltConfig.getSalt() + userPasswd).getBytes(StandardCharsets.UTF_8));

        // 创建用户
        User user = new User();
        user.setUserAccount(userAccount);
        user.setUserPasswd(newUserPasswd);

        // 注册用户
        boolean saveResult = this.save(user);
        if (!saveResult) {
            throw new ArgumentException(ErrorCodeBindMessage.SYSTEM_ERROR, "出现拆箱错误");
        }

        return user.getId();
    }

    @Override
    public LoginUserVO userLogin(String userAccount, String userPasswd, HttpServletRequest request, HttpServletResponse response) {

        // TODO: 参数校验
        // 判断传入的所有字符串是否都是空白(null、空字符串、仅包含空格)
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

        // 处理请求
        String newUserPasswd = DigestUtils.md5DigestAsHex((passwdSaltConfig.getSalt() + userPasswd).getBytes(StandardCharsets.UTF_8)); // 密码加密

        // 查询用户
        LambdaQueryWrapper<User> lambdaQueryWrapper = new LambdaQueryWrapper<>();
        lambdaQueryWrapper.eq(User::getUserAccount, userAccount).eq(User::getUserPasswd, newUserPasswd);
        User user = this.getOne(lambdaQueryWrapper);
        if (user == null) {
            throw new ArgumentException(ErrorCodeBindMessage.PARAMS_ERROR, "可能该用户不存在, 也可能是密码错误");
        }

        // 脱敏信息
        LoginUserVO safetUser = LoginUserVO.removeSensitiveData(user);

        // 创建会话
        // session 数据存储在应用服务器 Tomcat 中, 以后可以通过 request.getSession().getAttribute(USER_LOGIN_STA) 取出用户登陆自己浏览器中本应用的 session 信息 safetUser, 不过类型变成了 Object, 可以后续强转恢复
        request.getSession().setAttribute(UserConstant.USER_LOGIN_STATE, safetUser); // TODO: 改为 Redis 分布式存储

        return safetUser;

    }

    @Override
    public Boolean userLogout(HttpServletRequest request) {

        // TODO: 参数校验

        // 处理请求
        request.getSession().removeAttribute(UserConstant.USER_LOGIN_STATE); // TODO: 改为 Redis 分布式存储
        return true;

    }

    @Override
    public LoginUserVO getLoginUserState(HttpServletRequest request) {

        // TODO: 参数校验

        // 处理请求
        // 先判断是否已登录
        var localCurrentUser = (LoginUserVO) request.getSession().getAttribute(UserConstant.USER_LOGIN_STATE);

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

        // TODO: 参数校验

        // 校验数据
        if (userSearchRequest == null) {
            throw new ArgumentException(ErrorCodeBindMessage.PARAMS_ERROR, "请求参数为空");
        }

        // 处理请求
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
