package com.work.workusercentre.request;

import com.baomidou.mybatisplus.annotation.TableField;
import lombok.Data;

import java.io.Serial;
import java.io.Serializable;
import java.util.Date;

@Data
public class CourseAddRequest implements Serializable {

    private String courseName;

    private Date reserveDate;

    private Date reserveTime;

    @Serial
    private static final long serialVersionUID = 1L;

}
