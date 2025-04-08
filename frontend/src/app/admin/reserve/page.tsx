"use client";

import "./page.css";
import AdvancedTable from "@/components/AdvancedTable";
import {Button, Col, Form, Input, message, Modal, Popconfirm, Tag} from "antd";
import {useEffect, useState} from "react";
import type {ProColumns} from "@ant-design/pro-components";
import {useTranslation} from "react-i18next";
import {userCourseDelete, userCourseSearch} from "@/api/userCourseController"; // 假设你有删除用户课程关联的接口
import {userSearch} from "@/api/userController"; // 假设你有这个接口来查询用户名
import {courseSearch} from "@/api/courseController"; // 假设你有这个接口来查询课程名

/**
 * 管理 - 预约列表页面
 */
export default function AdminReservePage() {

    // NOTE: Data
    const {t} = useTranslation();

    const columns: ProColumns<API.UserCourse>[] = [
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
            title: "用户名称",
            width: 100,
            dataIndex: "userName",
            fixed: "left",
        },
        {
            title: "用户标签",
            width: 100,
            dataIndex: "userTags",
            fixed: "left",
            // @ts-ignore
            render: (text: string) => {
                // 展示用：解析字符串为多个标签
                const raw = text?.toString().trim();
                const trimmed = raw.startsWith("[") && raw.endsWith("]")
                    ? raw.slice(2, -2)
                    : raw;

                const tags = trimmed
                    .split(",")
                    .map(tag => tag.trim())
                    .filter(Boolean);

                return (
                    <>
                        {tags.map((tag, index) => (
                            <Tag color="blue" key={index}>
                                {tag}
                            </Tag>
                        ))}
                    </>
                );
            }
        },
        {
            title: "课程名称",
            width: 100,
            dataIndex: "courseName",
            fixed: "left",
        }
    ];

    const [data, setData] = useState<API.UserCourse[]>([]);

    const [form] = Form.useForm();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentRecord, setCurrentRecord] = useState<API.UserCourse | null>(null);

    // NOTE: Func
    const handleRowClick = (record: API.UserCourse) => {
        form.setFieldsValue(record); // 填充表单数据
        setCurrentRecord(record); // 保存当前记录
        setIsModalOpen(true);
    };

    const handleConfirm = async () => {
        try {
            setIsModalOpen(false);
            const values = await form.validateFields(); // 先获取表单数据
            // 如果需要更新数据，调用相应的接口进行更新
            message.success(t("push_update_success"));
        } catch (e) {
            message.error(t("unknown_error"));
        }
    };

    const handleDelete = async () => {
        if (currentRecord) {
            try {
                await userCourseDelete({id: currentRecord.id}); // 调用删除接口
                message.success("取消成功");
                setIsModalOpen(false);
                setData(prevData => prevData.filter(item => item.id !== currentRecord.id)); // 更新表格数据
            } catch (error) {
                message.error("取消失败");
            }
        }
    };

    // NOTE: Hook
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await userCourseSearch({}); // 使用 userCourseSearch 查询数据
                if (res?.data) {
                    // 获取用户和课程数据
                    // @ts-ignore
                    const enrichedData = await Promise.all(res.data.map(async (item: any) => {
                        // 查询用户的名称
                        const userRes = await userSearch({id: item.userId});
                        // @ts-ignore
                        const userName = userRes.data[0].userAccount; // 假设返回的字段为 name

                        // 查询用户的标签
                        // @ts-ignore
                        const userTags = userRes.data[0].userTags;

                        // 查询课程的名称
                        const courseRes = await courseSearch({id: item.courseId});
                        // @ts-ignore
                        const courseName = courseRes.data[0].courseName; // 假设返回的字段为 courseName

                        return {
                            ...item,
                            userName,
                            userTags,
                            courseName,
                        };
                    }));
                    setData(enrichedData);
                }
            } catch (error) {
                console.log("未知错误");
            }
        };
        fetchData();
    }, []);

    // NOTE: Render
    return (
        <div id="adminReservePage">
            {/* 用户预约列表 */}
            <AdvancedTable<API.UserCourse>
                title={"预约表格"}
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
                footer={[
                    <Popconfirm
                        key="delete"
                        placement="top"
                        title={"你确定取消预约么?"}
                        okText="Yes"
                        cancelText="No"
                        onConfirm={handleDelete}
                    >
                        <Button type="primary" danger>
                            {"取消预约"}
                        </Button>
                    </Popconfirm>,
                    <Button key="submit" type="primary" onClick={handleConfirm}>
                        {t("push_update")}
                    </Button>
                ]}
            >
                {/* 修改表单 */}
                <Form form={form} layout="vertical">
                    <Col>
                        <Form.Item label={t("id")} name="id">
                            <Input/>
                        </Form.Item>
                    </Col>
                    <Col>
                        <Form.Item label={"用户名称"} name="userName">
                            <Input/>
                        </Form.Item>
                    </Col>
                    <Col>
                        <Form.Item label={"课程名称"} name="courseName">
                            <Input/>
                        </Form.Item>
                    </Col>
                </Form>
            </Modal>
        </div>
    );
}
