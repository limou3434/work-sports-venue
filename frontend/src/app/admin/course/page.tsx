"use client";

import "./page.css";
import AdvancedTable from "@/components/AdvancedTable";
import {Button, Col, Form, Input, message, Modal, Popconfirm} from "antd";
import {useEffect, useState} from "react";
import type {ProColumns} from "@ant-design/pro-components";
import {useTranslation} from "react-i18next";
import {courseAdd, courseDelete, courseSearch, courseUpdate} from "@/api/courseController"; // 引入课程创建和删除接口

/**
 * 管理 - 用户列表页面
 */
export default function AdminCoursePage() {

    // NOTE: Data
    const {t} = useTranslation();

    const columns: ProColumns<API.Course>[] = [
        {
            title: t("sort"),
            dataIndex: "sort",
            width: 50,
            fixed: "left",
        },
        {
            title: t("id"),
            width: 100,
            dataIndex: "id",
            fixed: "left",
        },
        {
            title: "课程名称",
            width: 100,
            dataIndex: "courseName",
            fixed: "left",
        },
        {
            title: "上课日期",
            width: 100,
            dataIndex: "reserveDate",
            fixed: "left",
        },
        {
            title: "上课时间",
            width: 100,
            dataIndex: "reserveTime",
            fixed: "left",
        },
    ];

    const [data, setData] = useState<API.Course[]>([]);

    const [form] = Form.useForm();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);  // 用于新建课程的Modal
    const [selectedCourse, setSelectedCourse] = useState<API.Course | null>(null); // 记录当前选中的课程

    // NOTE: Func
    const handleRowClick = (record: API.Course) => {
        form.setFieldsValue(record); // 填充表单数据
        setSelectedCourse(record); // 记录选中的课程
        setIsModalOpen(true);
    };

    const handleConfirm = async () => {
        try {
            setIsModalOpen(false);
            const values = await form.validateFields(); // 先获取表单数据 // TODO: 这里需要考虑校验的问题
            const res = await courseUpdate(values); // 传入表单数据
            if (res?.data) {
                // @ts-ignore
                setData(data.map(item => item.id === res.data.id ? res.data : item)); // 更新子项数据
                message.success(t("push_update_success"));
            } else {
                message.error(t("push_update_failed"));
            }
        } catch (e) {
            message.error(t("unknown_error"));
        }
    };

    const handleAddCourse = async () => {
        try {
            const values = await form.validateFields();
            const res = await courseAdd(values);  // 调用创建课程的接口
            if (res?.data) {
                window.location.reload();
                message.success("提交成功");
                setIsAddModalOpen(false);  // 关闭弹窗
            } else {
                message.error("提交失败");
            }
        } catch (e) {
            message.error(t("unknown_error"));
        }
    };

    const handleDeleteCourse = async () => {
        if (!selectedCourse) return;
        try {
            const res = await courseDelete({id: selectedCourse.id});  // 调用删除课程的接口
            if (res?.data) {
                setData(data.filter(item => item.id !== selectedCourse.id)); // 删除成功后更新列表
                message.success("删除成功");
                setIsModalOpen(false); // 关闭弹窗
            } else {
                message.error("删除失败");
            }
        } catch (e) {
            message.error(t("unknown_error"));
        }
    };

    // NOTE: Hook
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await courseSearch({});
                setData(Array.isArray(res?.data) ? res.data : []);
                console.log("访问数据库成功");
            } catch (error) {
                console.log("未知错误");
            }
        };
        fetchData().then(r => {
            console.log("调用")
        });
    }, []);

    // NOTE: Render
    return (
        <div id="adminClassPage">
            {/* 添加新课程按钮 */}
            <Button
                type="primary"
                onClick={() => setIsAddModalOpen(true)}
                style={{marginBottom: 16}}
            >
                添加新课程
            </Button>

            {/* 课程列表 */}
            <AdvancedTable<API.Course>
                title={"课程表格"}
                columns={columns}
                data={data}
                rowKey={"id"}
                onRowClick={handleRowClick}
            />

            {/* 修改弹窗 */}
            <Modal
                title={t("modify_form")}
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                footer={null} // 先不加按钮
            >
                {/* 修改表单 */}
                <Form form={form} layout="vertical">
                    <Col>
                        <Form.Item label={t("id")} name="id">
                            <Input disabled/>
                        </Form.Item>
                    </Col>
                    <Col>
                        <Form.Item label={"课程名称"} name="courseName">
                            <Input/>
                        </Form.Item>
                    </Col>
                    <Col>
                        <Form.Item label={"上课日期"} name="reserveDate">
                            <Input/>
                        </Form.Item>
                    </Col>
                    <Col>
                        <Form.Item label={"上课时间"} name="reserveTime">
                            <Input/>
                        </Form.Item>
                    </Col>
                </Form>

                {/* 按钮区 */}
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    {/* 确认按钮 */}
                    <Popconfirm
                        placement="top"
                        title={t("are_you_sure_to_submit_the_changes")}
                        description={t("confirm_submission")}
                        okText="Yes"
                        cancelText="No"
                        onConfirm={handleConfirm}
                    >
                        <Button
                            type="primary"
                            style={{ marginRight: 10 }}
                        >
                            {t("push_update")}
                        </Button>
                    </Popconfirm>

                    {/* 删除按钮 */}
                    <Button
                        type="primary"
                        danger
                        onClick={handleDeleteCourse}
                    >
                        删除课程
                    </Button>
                </div>
            </Modal>

            {/* 新建课程弹窗 */}
            <Modal
                title="添加新课程"
                open={isAddModalOpen}
                onCancel={() => setIsAddModalOpen(false)}
                footer={[
                    <Button key="cancel" onClick={() => setIsAddModalOpen(false)}>
                        取消
                    </Button>,
                    <Button key="submit" type="primary" onClick={handleAddCourse}>
                        提交
                    </Button>,
                ]}
            >
                {/* 新建课程表单 */}
                <Form form={form} layout="vertical">
                    <Col>
                        <Form.Item label="课程名称" name="courseName"
                                   rules={[{required: true, message: "请输入课程名称"}]}>
                            <Input/>
                        </Form.Item>
                    </Col>
                    <Col>
                        <Form.Item label="上课日期" name="reserveDate"
                                   rules={[{required: true, message: "请输入上课日期"}]}>
                            <Input/>
                        </Form.Item>
                    </Col>
                    <Col>
                        <Form.Item label="上课时间" name="reserveTime"
                                   rules={[{required: true, message: "请输入上课时间"}]}>
                            <Input/>
                        </Form.Item>
                    </Col>
                </Form>
            </Modal>
        </div>
    );
}
