package com.work.workusercentre.controller;

import com.work.workusercentre.entity.UserCourse;
import com.work.workusercentre.exception.ArgumentException;
import com.work.workusercentre.request.UserCourseAddRequest;
import com.work.workusercentre.request.UserCourseDeleteRequest;
import com.work.workusercentre.request.UserCourseSearchRequest;
import com.work.workusercentre.request.UserCourseUpdateRequest;
import com.work.workusercentre.response.BaseResponse;
import com.work.workusercentre.response.ErrorCodeBindMessage;
import com.work.workusercentre.response.TheResult;
import com.work.workusercentre.service.UserCourseService;
import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * 用户控制层
 * 1. 控制层只做简单的参数校验, 实际控制使用封装好的 Server, 因此一般先写控制层代码, 一直到后续寻找需要复用的逻辑即可
 * 2. 所有接口默认只返回 200, 某些特殊的错误交给前端响应(比如 403、404 以及对应的页面), 详细错误(code-message)在响应 JSON 中体现
 * 3. 控制层的方法本身最好不要改动, 这样前端代码就可以利用这个方法名称来无缝导入, 但是 HTTP 接口可以随时修改, 前端导入接口文档时会自动修改且依旧使用之前的方法
 *
 * @author <a href="https://github.com/xiaogithuboo">dididada</a>
 */
@RestController // 返回值默认为 json 类型
@RequestMapping("/user_course")
public class UserCourseController { // 通常控制层有服务层中的所有方法, 并且还有组合而成的方法, 如果组合的方法开始变得复杂就会封装到服务层内部

    @Resource
    private UserCourseService userCourseService;

    @PostMapping("/add")
    public BaseResponse<Boolean> userCourseAdd(@RequestBody UserCourseAddRequest userCourseAddRequest, HttpServletRequest request) {

        // 参数校验
        if (request == null) {
            throw new ArgumentException(ErrorCodeBindMessage.PARAMS_ERROR, "请求为空");
        }

        // 调用服务
        boolean result = userCourseService.userCourseAdd(userCourseAddRequest);

        // 响应对象
        return TheResult.success(result);

    }

    @PostMapping("/delete")
    public BaseResponse<Boolean> userCourseDelete(@RequestBody UserCourseDeleteRequest userCourseDeleteRequest, HttpServletRequest request) {

        // 参数校验
        if (request == null) {
            throw new ArgumentException(ErrorCodeBindMessage.PARAMS_ERROR, "请求为空");
        }

        // 调用服务
        boolean resault = userCourseService.userCourseDelete(userCourseDeleteRequest);

        // 响应对象
        return TheResult.success(resault);

    }

    @PostMapping("/update")
    public BaseResponse<UserCourse> userCourseUpdate(@RequestBody UserCourseUpdateRequest userCourseUpdateRequest, HttpServletRequest request) {

        // 参数校验
        if (request == null) {
            throw new ArgumentException(ErrorCodeBindMessage.PARAMS_ERROR, "请求为空");
        }

        // 响应对象
        return TheResult.success(userCourseService.userCourseUpdate(userCourseUpdateRequest));

    }

    @PostMapping("/search")
    public BaseResponse<List<UserCourse>> userCourseSearch(@RequestBody UserCourseSearchRequest userCourseSearchRequest, HttpServletRequest request) {

        // 参数校验
        if (request == null) {
            throw new ArgumentException(ErrorCodeBindMessage.PARAMS_ERROR, "请求为空");
        }

        // 响应对象
        return TheResult.success(userCourseService.userCourseSearch(userCourseSearchRequest));

    }

}
