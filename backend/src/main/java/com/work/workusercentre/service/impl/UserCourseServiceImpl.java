package com.work.workusercentre.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.work.workusercentre.entity.UserCourse;
import com.work.workusercentre.exception.ArgumentException;
import com.work.workusercentre.mapper.UserCourseMapper;
import com.work.workusercentre.request.UserCourseAddRequest;
import com.work.workusercentre.request.UserCourseDeleteRequest;
import com.work.workusercentre.request.UserCourseSearchRequest;
import com.work.workusercentre.request.UserCourseUpdateRequest;
import com.work.workusercentre.response.ErrorCodeBindMessage;
import com.work.workusercentre.service.UserCourseService;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author Limou
 * @description 针对表【user_course】的数据库操作Service实现
 * @createDate 2025-04-08 09:53:27
 */
@Service
public class UserCourseServiceImpl extends ServiceImpl<UserCourseMapper, UserCourse>
        implements UserCourseService {

    public Boolean userCourseAdd(UserCourseAddRequest userCourseAddRequest) {
        // 处理请求
        var userCourse = new UserCourse();
        BeanUtils.copyProperties(userCourseAddRequest, userCourse);
        System.out.println(userCourse);
        System.out.println(userCourseAddRequest);
        return this.save(userCourse);
    }

    public Boolean userCourseDelete(UserCourseDeleteRequest userCourseDeleteRequest) {

        // 参数校验
        if (userCourseDeleteRequest.getId() <= 0) {
            throw new ArgumentException(ErrorCodeBindMessage.PARAMS_ERROR, "参数用户课程 id 不能为空");
        }

        // 处理请求
        return this.removeById(userCourseDeleteRequest.getId()); // 这里 MyBatisPlus 会自动转化为逻辑删除(这里数据库没有字段支持所以直接删除了)

    }

    public UserCourse userCourseUpdate(UserCourseUpdateRequest userCourseUpdateRequest) {

        // 参数校验
        if (userCourseUpdateRequest.getId() == null) {
            throw new ArgumentException(ErrorCodeBindMessage.PARAMS_ERROR, "参数课程 id 不能为空");
        }

        // 处理请求
        UserCourse userCourse = new UserCourse();

        BeanUtils.copyProperties(userCourseUpdateRequest, userCourse);

        boolean result = this.updateById(userCourse);
        if (!result) {
            throw new ArgumentException(ErrorCodeBindMessage.SYSTEM_ERROR, "需要指定参数课程 id 才能修改");
        }

        return userCourse;

    }

    public List<UserCourse> userCourseSearch(UserCourseSearchRequest userCourseSearchRequest) {
        // 处理请求
        List<UserCourse> courseList = this.list(this.getLambdaQueryWrapper(userCourseSearchRequest));
        return courseList
                .stream() // 转化操作, 将 userList 转换为一个流
                .toList();
    }

    public LambdaQueryWrapper<UserCourse> getLambdaQueryWrapper(UserCourseSearchRequest userCourseSearchRequest) {

        // 校验数据
        if (userCourseSearchRequest == null) {
            throw new ArgumentException(ErrorCodeBindMessage.PARAMS_ERROR, "请求参数为空");
        }

        // 处理请求
        Long id = userCourseSearchRequest.getId();
        Long userId = userCourseSearchRequest.getUserId();
        Long courseId = userCourseSearchRequest.getCourseId();

        // 操作数据
        LambdaQueryWrapper<UserCourse> lambdaQueryWrapper = new LambdaQueryWrapper<>();
        lambdaQueryWrapper.eq(id != null, UserCourse::getId, id);
        lambdaQueryWrapper.eq(userId != null, UserCourse::getUserId, id);
        lambdaQueryWrapper.eq(courseId != null, UserCourse::getCourseId, id);

        // 响应数据
        return lambdaQueryWrapper;

    }


}




