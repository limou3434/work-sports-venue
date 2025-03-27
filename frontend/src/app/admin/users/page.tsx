"use client";

import "./page.css";
import AdvancedTable from "@/components/AdvancedTable";
import {userSearch, userUpdate} from "@/api/userController";
import {Button, Col, Form, Input, message, Modal, Popconfirm, Row} from "antd";
import {useEffect, useState} from "react";
import type {ProColumns} from "@ant-design/pro-components";
import {useTranslation} from "react-i18next";

/**
 * 管理 - 用户列表页面
 */
export default function AdminUsersPage() {

    // NOTE: Data
    const {t} = useTranslation();

    const columns: ProColumns<API.LoginUserVO>[] = [
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
            title: t("user_account"),
            width: 100,
            dataIndex: "userAccount",
            fixed: "left",
        },
        {
            title: t("user_wx_union"),
            dataIndex: "userWxUnion",
        },
        {
            title: t("user_mp_open"),
            dataIndex: "userMpOpen",
        },
        {
            title: t("user_email"),
            dataIndex: "userEmail",
        },
        {
            title: t("user_phone"),
            dataIndex: "userPhone",
        },
        {
            title: t("user_avatar"),
            dataIndex: "userAvatar",
        },
        {
            title: t("user_tags"),
            dataIndex: "userTags",
        },
        {
            title: t("user_nick"),
            dataIndex: "userNick",
        },
        {
            title: t("user_name"),
            dataIndex: "userName",
        },
        {
            title: t("user_profile"),
            dataIndex: "userProfile",
        },
        {
            title: t("user_birthday"),
            dataIndex: "userBirthday",
        },
        {
            title: t("user_country"),
            dataIndex: "userCountry",
        },
        {
            title: t("user_address"),
            dataIndex: "userAddress",
        },
        {
            title: t("user_role"),
            dataIndex: "userRole",
        },
        {
            title: t("user_level"),
            dataIndex: "userLevel",
        },
        {
            title: t("user_gender"),
            dataIndex: "userGender",
        },
    ];

    const [data, setData] = useState<API.LoginUserVO[]>([]);

    const [form] = Form.useForm();

    const [isModalOpen, setIsModalOpen] = useState(false);

    // NOTE: Func
    const handleRowClick = (record: API.LoginUserVO) => {
        form.setFieldsValue(record); // 填充表单数据
        setIsModalOpen(true);
    };

    const handleConfirm = async () => {
        try {
            setIsModalOpen(false);
            const values = await form.validateFields(); // 先获取表单数据 // TODO: 这里需要考虑校验的问题
            const res = await userUpdate(values); // 传入表单数据
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

    // NOTE: Hook
    useEffect(() => {
        (async () => {
            try {
                const res = await userSearch({});
                setData(Array.isArray(res?.data) ? res.data : []);
                void message.success("访问数据库成功");
            } catch (error) {
                void message.error("未知错误");
            }
        })();
    }, []);

    // NOTE: Render
    return (
        <div id="adminUsersPage">
            {/* 用户列表 */}
            <AdvancedTable<API.LoginUserVO>
                title={"用户列表记录"}
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
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label={t("id")} name="id">
                                <Input disabled/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label={t("user_account")} name="userAccount">
                                <Input disabled/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label={t("user_wx_union")} name="userWxUnion">
                                <Input/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label={t("user_mp_open")} name="userMpOpen">
                                <Input/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label={t("user_email")} name="userEmail">
                                <Input/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label={t("user_phone")} name="userPhone">
                                <Input/>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label={t("user_avatar")} name="userAvatar">
                                <Input/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label={t("user_tags")} name="userTags">
                                <Input/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label={t("user_nick")} name="userNick">
                                <Input/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label={t("user_name")} name="userName">
                                <Input/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label={t("user_profile")} name="userProfile">
                                <Input/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label={t("user_birthday")} name="userBirthday">
                                <Input/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label={t("user_country")} name="userCountry">
                                <Input/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label={t("user_address")} name="userAddress">
                                <Input/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label={t("user_role")} name="userRole">
                                <Input/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label={t("user_level")} name="userLevel">
                                <Input/>
                            </Form.Item> {/* TODO: 渲染 Tag 和权限 */}
                        </Col>
                    </Row>
                </Form>
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
                        color="primary"
                        variant="outlined"
                    >
                        {t("push_update")}
                    </Button>
                </Popconfirm>
            </Modal>
        </div>
    );
}

