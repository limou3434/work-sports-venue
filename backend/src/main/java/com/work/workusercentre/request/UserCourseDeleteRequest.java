package com.work.workusercentre.request;

import lombok.Data;

import java.io.Serial;
import java.io.Serializable;

@Data
public class UserCourseDeleteRequest implements Serializable {

    private Long id;

    @Serial
    private static final long serialVersionUID = 1L;

}
