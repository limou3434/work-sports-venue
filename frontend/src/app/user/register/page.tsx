"use client";

import "./page.css";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { LoginForm, ProFormText } from "@ant-design/pro-components";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { message } from "antd";
import { ProForm } from "@ant-design/pro-form/lib";
import { useRouter } from "next/navigation";
import {userRegister} from "@/api/userController";
import {useTranslation} from "react-i18next";

// TODO: 把这个登陆页面集成到模板中
/**
 * 用户 - 注册页面
 */
export default function UserRegisterPage() {

    // NOTE: Data
    const { t } = useTranslation();

    // 项目名称
    const projectName = "健身房管理系统"; // TODO: 从文件中读取

    // 项目信息
    const projectInfo = "基于物联网技术的健身房管理系统"; // TODO: 从文件中读取

    // 表单实例
    const [form] = ProForm.useForm();

    // 重定向页面
    const router = useRouter();

    // NOTE: Func
    // 注册接口
    const doSubmit = async (values: API.UserRegisterRequest): Promise<void> => {
        // TODO: 拦截前端部分不正确的请求, 减轻后端压力
        // 提交登入表单
        try {
            const res = await userRegister(values);
            if (res.data) {
                message.success("注册成功"); // 提示登入成功
                router.replace("/user/login"); // 跳转页面
                form.resetFields(); // 重置表单
            }
        } catch (e) {}
    };

    // NOTE: Render
    return (
        <div id="userRegisterPage" className="max-width-content">
            {/* 登入组件 */}
            <LoginForm
                form={form}
                logo={
                    <Image
                        src="/assets/logo.svg"
                        alt={projectName}
                        height={45}
                        width={45}
                    />
                }
                title={t("register")}
                subTitle={projectInfo}
                submitter={{
                    searchConfig: {
                        submitText: t("register"),
                    },
                }}
                onFinish={doSubmit}
            >
                {/* 用户名称 */}
                <ProFormText
                    name="userAccount"
                    fieldProps={{
                        size: "large",
                        prefix: <UserOutlined />,
                    }}
                    placeholder={"请输入帐号"}
                    rules={[
                        {
                            required: true,
                            message: "请输入帐号!",
                        },
                    ]}
                />
                {/* 用户密码 */}
                <ProFormText.Password
                    name="userPasswd" // TODO: 密码字段被我修改了, 模板也需要修改一下
                    fieldProps={{
                        size: "large",
                        prefix: <LockOutlined />,
                    }}
                    placeholder={"请输入密码"}
                    rules={[
                        {
                            required: true,
                            message: "请输入密码！",
                        },
                    ]}
                />
                {/* 确认密码 */}
                <ProFormText.Password
                    name="checkPasswd"
                    fieldProps={{
                        size: "large",
                        prefix: <LockOutlined />,
                    }}
                    placeholder={"请重复输入确认的密码"}
                    rules={[
                        {
                            required: true,
                            message: "请重复输入确认的密码！",
                        },
                    ]}
                />
                {/* 注册帐号 */}
                <div
                    style={{
                        marginBlockEnd: 24,
                    }}
                >
                    <div
                        style={{
                            float: "right",
                            marginBlockEnd: 24,
                        }}
                    >
                        已经有帐号？
                        <Link href={"/user/login"}>登入帐号</Link>
                    </div>
                </div>
            </LoginForm>
        </div>
    );
};
