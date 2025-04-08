package com.work.workusercentre.service;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.service.IService;
import com.work.workusercentre.entity.Course;
import com.work.workusercentre.request.CourseAddRequest;
import com.work.workusercentre.request.CourseDeleteRequest;
import com.work.workusercentre.request.CourseSearchRequest;
import com.work.workusercentre.request.CourseUpdateRequest;

import java.util.List;

/**
 * @author Limou
 * @description 针对表【course】的数据库操作Service
 * @createDate 2025-04-08 00:53:08
 */
public interface CourseService extends IService<Course> {

    Boolean courseAdd(CourseAddRequest courseAddRequest);

    Boolean courseDelete(CourseDeleteRequest courseDeleteRequest);

    Course courseUpdate(CourseUpdateRequest courseUpdateRequest);

    List<Course> courseSearch(CourseSearchRequest courseSearchRequest);

    LambdaQueryWrapper<Course> getLambdaQueryWrapper(CourseSearchRequest courseSearchRequest);

}
