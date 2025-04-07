package com.work.workusercentre.request;

import lombok.Data;

import java.io.Serial;
import java.io.Serializable;
import java.util.Date;

@Data
public class CourseDeleteRequest implements Serializable {

    private Long id;

    @Serial
    private static final long serialVersionUID = 1L;

}
