"use client"

import "./page.css";
import React, {useEffect, useState} from "react";
import {Button, Card, Form, Input, message, Popconfirm, Popover, Space, Tag} from "antd";
import {useTranslation} from "react-i18next";
import {userStatus, userUpdateSelf} from "@/api/userController";
import ProfileCompletion from "@/components/ProfileCompletion";


/**
 * 表单页面
 */
export default function FormPage() {

    const roleMap = {
        0: "普通用户",
        1: "管理员",
        2: "超级管理员",
    };

    const genderMap = {
        0: "不透露",
        1: "男",
        2: "女",
    };

    // NOTE: Data
    const {t} = useTranslation();
    const [form] = Form.useForm();
    const [data, setData] = useState<API.LoginUserVO>();
    const [avatar, setAvatar] = useState<string>("");
    const [tags, setTags] = useState<string[]>([]);
    const [role, setRole] = useState<number>(-1);
    const [gender, setGender] = useState<number>(-1);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    // @ts-ignore
    const [editValue, setEditValue] = useState<string>(genderMap[gender]); // 编辑框中显示的值

    const handleTagClick = () => {
        setEditValue(gender.toString()); // 转成字符串
        setIsEditing(true);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditValue(e.target.value);
    };

    const handleInputBlur = () => {
        const parsed = parseInt(editValue);
        if (parsed in genderMap) {
            setGender(parsed); // ✅ 设置 gender 为数字
        }
        setIsEditing(false);
    };

    // NOTE: Func
    const handleConfirm = async () => {
        try {
            const values = await form.validateFields();
            delete values.id;
            delete values.userRole;
            delete values.userLevel;

            // 在提交时，处理 tags，将其变为字符串并加入到 values 中
            values.userTags = tags.join(",");  // 将标签数组转换成逗号分隔的字符串

            const res = await userUpdateSelf(values);
            if (res?.data) {
                // @ts-ignore
                setData(res.data || []);
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
                const res = await userStatus();
                form.setFieldsValue(res.data);
                // @ts-ignore
                setAvatar(res.data.userAvatar || ""); // 设置头像预览
                // @ts-ignore
                setRole(res.data.userRole);
                // @ts-ignore
                setGender(res.data.userGender);
                console.log("访问数据库成功");

                // 如果tags是字符串，解析成数组
                // @ts-ignore
                const fetchedTags = res.data.userTags ? res.data.userTags : "";
                const tagArray = fetchedTags
                    ? fetchedTags.replace(/[\[\]"]/g, "").split(",").map((tag: string) => tag.trim()) // 去除[]和引号，然后按逗号分隔
                    : [];
                setTags(tagArray);
            } catch (error) {
                console.log("未知错误");
            }
        })();
    }, []);

    // 处理标签的输入变化
    const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;
        // 解析输入的标签字符串
        if (input.includes(',')) {
            const newTags = input.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
            setTags(newTags);
        }
    };

    // 处理回车添加标签
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && e.currentTarget.value.trim()) {
            const newTag = e.currentTarget.value.trim();
            if (!tags.includes(newTag)) {
                setTags([...tags, newTag]);
                e.currentTarget.value = '';  // 清空输入框
            }
        }
    };

    // 删除标签
    const handleDeleteTag = (tag: string) => {
        const newTags = tags.filter(t => t !== tag);
        setTags(newTags);
    };

    // NOTE: Render
    return (
        <div id="formPage">
            <Space direction="vertical" size="small" style={{display: 'flex'}}>
                <ProfileCompletion/>
                <Card variant="borderless" hoverable={true} style={{width: "100%", height: "90%"}}>
                    <Form
                        form={form}
                        layout="horizontal"
                        initialValues={{remember: true}}
                        autoComplete="off"
                    >
                        <Form.Item label={t("id")} name="id">
                            <Input disabled/>
                        </Form.Item>
                        <Form.Item label={t("user_account")} name="userAccount">
                            <Input disabled/>
                        </Form.Item>
                        <Form.Item label={t("user_wx_union")} name="userWxUnion">
                            <Input/>
                        </Form.Item>
                        <Form.Item label={t("user_mp_open")} name="userMpOpen">
                            <Input/>
                        </Form.Item>
                        <Form.Item label={t("user_email")} name="userEmail">
                            <Input/>
                        </Form.Item>
                        <Form.Item label={t("user_phone")} name="userPhone">
                            <Input/>
                        </Form.Item>
                        <Form.Item label={t("user_avatar")} name="userAvatar">
                            <Popover
                                content={
                                    avatar ? (
                                        <img
                                            src={avatar}
                                            alt="Avatar Preview"
                                            style={{
                                                width: 100,
                                                height: 100,
                                                objectFit: "cover",
                                                borderRadius: 8,
                                            }}
                                        />
                                    ) : (
                                        "请输入头像 URL"
                                    )
                                }
                                trigger="hover"
                            >
                                <Input
                                    value={avatar}
                                    onChange={(e) => setAvatar(e.target.value)}
                                    placeholder="输入头像 URL，悬停预览"
                                />
                            </Popover>
                        </Form.Item>
                        <Form.Item label={t("user_tags")} name="userTags">
                            <Input
                                onKeyDown={handleKeyDown}  // 监听回车键事件
                                placeholder="输入标签（回车添加标签）"
                            />
                            <div style={{marginTop: 10}}>
                                {Array.isArray(tags) && tags.map((tag, index) => (
                                    <Tag
                                        key={index} // 使用index作为key
                                        closable
                                        onClose={() => handleDeleteTag(tag)}
                                        style={{marginBottom: 5}}
                                    >
                                        {tag}
                                    </Tag>
                                ))}
                            </div>
                        </Form.Item>
                        <Form.Item label={t("user_nick")} name="userNick">
                            <Input/>
                        </Form.Item>
                        <Form.Item label={t("user_name")} name="userName">
                            <Input/>
                        </Form.Item>
                        <Form.Item label={t("user_profile")} name="userProfile">
                            <Input/>
                        </Form.Item>
                        <Form.Item label={t("user_birthday")} name="userBirthday">
                            <Input/>
                        </Form.Item>
                        <Form.Item label={t("user_country")} name="userCountry">
                            <Input/>
                        </Form.Item>
                        <Form.Item label={t("user_address")} name="userAddress">
                            <Input/>
                        </Form.Item>
                        <Form.Item label={t("user_role")} name="userRole">
                            <Tag color={role === 2 ? "red" : role === 1 ? "gold" : role === 0 ? "green" : "gray"}
                                 style={{marginBottom: 5}}>
                                {/* @ts-ignore */}
                                {role !== undefined && roleMap[role] ? roleMap[role] : t("未知")}（无法修改）
                            </Tag>
                        </Form.Item>
                        <Form.Item label={t("user_gender")} name="userGender">
                            {/* 如果是编辑状态，显示输入框，否则显示标签 */}
                            {isEditing ? (
                                <Input
                                    value={editValue}  // 显示当前输入的值
                                    onChange={handleInputChange}  // 修改输入框的值
                                    onBlur={handleInputBlur}  // 退出编辑时更新性别
                                    autoFocus
                                />
                            ) : (
                                <Tag
                                    color={gender === 2 ? "pink" : gender === 1 ? "blue" : "gray"}
                                    style={{ cursor: "pointer" }}
                                    onClick={handleTagClick}  // 点击标签进入编辑状态
                                >
                                    {/* @ts-ignore */}
                                    {genderMap[gender]}（点击编辑）
                                </Tag>
                            )}
                        </Form.Item>
                        <Form.Item label={null}>
                            <Popconfirm
                                placement="top"
                                title={t("are_you_sure_to_submit_the_changes")}
                                description={t("confirm_submission")}
                                okText="Yes"
                                cancelText="No"
                                onConfirm={handleConfirm}
                            >
                                <Button color="primary" variant="outlined">
                                    {t("push_update")}
                                </Button>
                            </Popconfirm>
                        </Form.Item>
                    </Form>
                </Card>
            </Space>
        </div>
    );
}
