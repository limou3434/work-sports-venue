package com.work.workusercentre.request;

import lombok.Data;

import java.io.Serial;
import java.io.Serializable;
import java.util.Date;

@Data
public class UserCourseAddRequest implements Serializable {

    private Integer userId;

    private Integer courseId;

    @Serial
    private static final long serialVersionUID = 1L;

}
