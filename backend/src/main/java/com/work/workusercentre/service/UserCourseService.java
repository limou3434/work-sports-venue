package com.work.workusercentre.service;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.service.IService;
import com.work.workusercentre.entity.UserCourse;
import com.work.workusercentre.request.UserCourseAddRequest;
import com.work.workusercentre.request.UserCourseDeleteRequest;
import com.work.workusercentre.request.UserCourseSearchRequest;
import com.work.workusercentre.request.UserCourseUpdateRequest;

import java.util.List;

/**
 * @author Limou
 * @description 针对表【user_course】的数据库操作Service
 * @createDate 2025-04-08 09:53:27
 */
public interface UserCourseService extends IService<UserCourse> {

    Boolean userCourseAdd(UserCourseAddRequest userCourseAddRequest);

    Boolean userCourseDelete(UserCourseDeleteRequest userCourseDeleteRequest);

    UserCourse userCourseUpdate(UserCourseUpdateRequest userCourseUpdateRequest);

    List<UserCourse> userCourseSearch(UserCourseSearchRequest userCourseSearchRequest);

    LambdaQueryWrapper<UserCourse> getLambdaQueryWrapper(UserCourseSearchRequest userCourseSearchRequest);

}
