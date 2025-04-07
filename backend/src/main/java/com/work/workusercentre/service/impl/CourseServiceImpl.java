package com.work.workusercentre.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.work.workusercentre.contant.UserConstant;
import com.work.workusercentre.entity.Course;
import com.work.workusercentre.entity.User;
import com.work.workusercentre.exception.ArgumentException;
import com.work.workusercentre.request.*;
import com.work.workusercentre.response.ErrorCodeBindMessage;
import com.work.workusercentre.service.CourseService;
import com.work.workusercentre.mapper.CourseMapper;
import com.work.workusercentre.vo.LoginUserVO;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.util.DigestUtils;

import java.util.List;

@Service
public class CourseServiceImpl extends ServiceImpl<CourseMapper, Course> implements CourseService{

    @Override
    public Boolean courseAdd(CourseAddRequest courseAddRequest) {

        // TODO: 1. 复杂校验

        // 处理请求
        var course = new Course();
        BeanUtils.copyProperties(courseAddRequest, course);
        return this.save(course);

    }

    @Override
    public Boolean courseDelete(CourseDeleteRequest courseDeleteRequest) {

        // 参数校验
        if (courseDeleteRequest.getId() <= 0) {
            throw new ArgumentException(ErrorCodeBindMessage.PARAMS_ERROR, "参数课程 id 不能为空");
        }

        // 处理请求
        return this.removeById(courseDeleteRequest.getId()); // 这里 MyBatisPlus 会自动转化为逻辑删除(这里数据库没有字段支持所以直接删除了)

    }

    @Override
    public Course courseUpdate(CourseUpdateRequest courseUpdateRequest) {

        // 参数校验
        if (courseUpdateRequest.getId() == null) {
            throw new ArgumentException(ErrorCodeBindMessage.PARAMS_ERROR, "参数课程 id 不能为空");
        }

        // 处理请求
        Course course = new Course();

        BeanUtils.copyProperties(courseUpdateRequest, course);

        boolean result = this.updateById(course);
        if (!result) {
            throw new ArgumentException(ErrorCodeBindMessage.SYSTEM_ERROR, "需要指定参数课程 id 才能修改");
        }

        return course;

    }

    @Override
    public List<Course> courseSearch(CourseSearchRequest courseSearchRequest) {

        // TODO: 参数校验

        // 处理请求
        List<Course> courseList = this.list(this.getLambdaQueryWrapper(courseSearchRequest));
        return courseList
                .stream() // 转化操作, 将 userList 转换为一个流
                .toList();

    }

    @Override
    public LambdaQueryWrapper<Course> getLambdaQueryWrapper(CourseSearchRequest courseSearchRequest) {

        // TODO: 参数校验

        // 校验数据
        if (courseSearchRequest == null) {
            throw new ArgumentException(ErrorCodeBindMessage.PARAMS_ERROR, "请求参数为空");
        }

        // 处理请求
        Long id = courseSearchRequest.getId();
        String courseName = courseSearchRequest.getCourseName();
        String sortOrder = courseSearchRequest.getSortOrder();
        String sortField = courseSearchRequest.getSortField();

        // 操作数据
        LambdaQueryWrapper<Course> lambdaQueryWrapper = new LambdaQueryWrapper<>();
        lambdaQueryWrapper.eq(id != null, Course::getId, id);
        lambdaQueryWrapper.eq(StringUtils.isNotBlank(courseName), Course::getCourseName, courseName);

        lambdaQueryWrapper.orderBy(
                StringUtils.isNotBlank(sortField) && !StringUtils.containsAny(sortField, "=", "(", ")", " "),
                sortOrder.equals("ascend"), // true 代表 ASC 升序, false 代表 DESC 降序
                Course::getCourseName // TODO: 先默认按照课名排序
        );

        // 响应数据
        return lambdaQueryWrapper;
    }

}




