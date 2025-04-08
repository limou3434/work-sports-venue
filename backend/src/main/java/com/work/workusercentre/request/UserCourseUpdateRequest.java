package com.work.workusercentre.request;

import lombok.Data;

import java.io.Serial;
import java.io.Serializable;
import java.util.Date;

@Data
public class UserCourseUpdateRequest implements Serializable {

    private Long id; // 这个 id 是用来寻找需要更新的课程的

    private Long userId;

    private Long courseId;

    @Serial
    private static final long serialVersionUID = 1L;

}
