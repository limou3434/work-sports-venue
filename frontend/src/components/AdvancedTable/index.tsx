"use client";

import "./index.css";
import type {ProColumns} from "@ant-design/pro-components";
import {DragSortTable} from "@ant-design/pro-components";
import {message} from "antd";
import {useEffect, useState} from "react";

/**
 * 属性
 */
interface Props<T> {
    title?: string; // 外部传入的表格标题
    columns: ProColumns<T>[]; // 外部传入的填充字段(ProColumns 会在用户定义的字段中拓展其他字段, 关于这些字段写在本文件的末尾)
    data?: T[]; // 外部传入的填充数据
    rowKey: keyof T; // 外部传入的表格主键(可以用作优化性能、拖拽排序、增删查改的依据, keyof 表示 rowKey 必须是 T 中的某个属性)
    search?: false | {};  // 外部传入的搜索配置
    onRowClick(record: T): void; // 外部传入的行点击事件, 其中 record 表示某一行的数据对象, 可以像对象一样访问每一行的列属性
}

/**
 * 高级表格组件
 */
export default function AdvancedTable<T extends Record<string, any>>(
    {
        title = "数据列表",
        columns,
        data = [],
        rowKey,
        search = {},
        onRowClick = (record) => console.log("高级表格 AdvancedTable 被点击后得到的行对象:", record),
    }: Props<T>
) {

    // NOTE: Data
    const [dataSource, setDataSource] = useState<T[]>(data); // 用于动态存储表格数据

    // NOTE: Hook
    // 监听表格数据变化
    useEffect(() => {
        setDataSource(data);
        console.log("高级表格 AdvancedTable 更新数据: ", data); // TODO: 不知道是否需要去掉
    }, [data]);

    // NOTE: Func
    // 处理拖拽排序事件
    const handleDragSortEnd = (
        beforeIndex: number, // 拖拽前元素原来的索引
        afterIndex: number, // 拖拽后元素最终的索引
        newDataSource: T[], // 拖拽后的新数据源
    ) => {
        console.log("拖拽前元素原来的索引", beforeIndex); // TODO: 不知道是否需要去掉
        console.log("拖拽后元素原来的索引", afterIndex); // TODO: 不知道是否需要去掉
        console.log("拖拽后的新数据源", newDataSource); // TODO: 不知道是否需要去掉
        setDataSource(newDataSource);
        void message.success("修改列表排序成功");
    };

    // 处理表格行点击事件
    const enhancedColumns = columns.map((col) => ({
        // 上面的 map 从外部传入的表格列配置 columns 中, 增加一个 onCell 属性中添加 onCell 属性
        ...col,
        onCell: ((record: T) => ({
            onClick: () => onRowClick?.(record), // 定义点击行时触发的事件
            style: {cursor: "pointer"},  // 定义鼠标悬停在行上时的样式
        })) as any,
    }));

    // NOTE: Render
    return (
        <div className="advanced-table">
            <DragSortTable<T>
                headerTitle={title}
                columns={enhancedColumns}
                rowKey={rowKey as string}
                search={search}
                pagination={false}
                dataSource={dataSource}
                dragSortKey="sort"  // 拖拽排序的依据, 默认为 sort, 可以自定义
                onDragSortEnd={handleDragSortEnd}
                scroll={{x: "max-content"}} // 让表格的宽度等于所有列的总宽度, 超出则出现水平滚动条
            />
        </div>
    );

}

/*
ProColumns 具体化后的拓展字段 TODO: 暂时没有实验过
title：列的标题
dataIndex：数据索引, 对应 dataSource 里的字段
key: 唯一标识
width: 列宽度
fixed: 是否固定列 left | right
align: 对齐方式 left | center | right
render: 自定义渲染内容
sorter: 是否支持排序 true | (a, b) => a.value - b.value
filters: 是否支持筛选 [{ text: '男', value: 'male' }, { text: '女', value: 'female' }]
onCell/onHeaderCell: 自定义单元格属性
ellipsis：超出是否省略 true
*/