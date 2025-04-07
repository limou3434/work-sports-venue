package com.work.workusercentre.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import java.util.Date;
import lombok.Data;

/**
 * 
 * @TableName course
 */
@TableName(value ="course")
@Data
public class Course {

    @TableId(value = "id", type = IdType.AUTO)
    private Integer id;

    @TableField(value = "course_name")
    private String courseName;

    @TableField(value = "reserve_date")
    private Date reserveDate;

    @TableField(value = "reserve_time")
    private Date reserveTime;

    @Override
    public boolean equals(Object that) {
        if (this == that) {
            return true;
        }
        if (that == null) {
            return false;
        }
        if (getClass() != that.getClass()) {
            return false;
        }
        Course other = (Course) that;
        return (this.getId() == null ? other.getId() == null : this.getId().equals(other.getId()))
            && (this.getCourseName() == null ? other.getCourseName() == null : this.getCourseName().equals(other.getCourseName()))
            && (this.getReserveDate() == null ? other.getReserveDate() == null : this.getReserveDate().equals(other.getReserveDate()))
            && (this.getReserveTime() == null ? other.getReserveTime() == null : this.getReserveTime().equals(other.getReserveTime()));
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((getId() == null) ? 0 : getId().hashCode());
        result = prime * result + ((getCourseName() == null) ? 0 : getCourseName().hashCode());
        result = prime * result + ((getReserveDate() == null) ? 0 : getReserveDate().hashCode());
        result = prime * result + ((getReserveTime() == null) ? 0 : getReserveTime().hashCode());
        return result;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append(getClass().getSimpleName());
        sb.append(" [");
        sb.append("Hash = ").append(hashCode());
        sb.append(", id=").append(id);
        sb.append(", courseName=").append(courseName);
        sb.append(", reserveDate=").append(reserveDate);
        sb.append(", reserveTime=").append(reserveTime);
        sb.append("]");
        return sb.toString();
    }

}