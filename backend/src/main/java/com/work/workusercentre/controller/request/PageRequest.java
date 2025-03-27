package com.work.workusercentre.controller.request;

import lombok.Data;

/**
 * 分页请求
 *
 * @author <a href="https://github.com/xiaogithuboo">limou3434</a>
 */
@Data
public class PageRequest {

    /**
     * 排序字段
     */
    private String sortField = "user_account";

    /**
     * 排序顺序
     */
    private String sortOrder = "ascend"; // "descend"

}
