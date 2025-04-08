package com.work.workusercentre.request;

import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serial;
import java.io.Serializable;

@EqualsAndHashCode(callSuper = true) // 自动生成 equals() 和 hashCode(), callSuper = true 使得 equals() 和 hashCode() 方法同时考虑 PageRequest 和 UserSearchRequest 的字段, 避免出现意料之外的情况
@Data
public class UserCourseSearchRequest extends PageRequest implements Serializable {

    private Long id;

    private Long userId;

    private Long courseId;

    @Serial
    private static final long serialVersionUID = 1L;

}
