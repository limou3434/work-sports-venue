package com.work.workusercentre.request;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import lombok.Data;

import java.io.Serial;
import java.io.Serializable;
import java.util.Date;

@Data
public class CourseUpdateRequest implements Serializable {

    private Integer id; // 这个 id 是用来寻找需要更新的课程的

    private String courseName;

    private String reserveDate;

    private String reserveTime;

    @Serial
    private static final long serialVersionUID = 1L;

}
