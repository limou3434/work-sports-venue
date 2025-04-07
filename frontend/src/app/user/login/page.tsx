"use client";

import "./page.css";
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import {LoginForm, ProFormText} from "@ant-design/pro-components";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import {useDispatch} from "react-redux";
import {AppDispatch} from "@/stores";
import {ProForm} from "@ant-design/pro-form/lib";
import {useRouter} from "next/navigation";
import {message} from "antd";
import {setLoginUser} from "@/stores/loginUser";
import {userLogin} from "@/api/userController";
import {useTranslation} from "react-i18next";

/**
 * 用户 - 登入页面
 */
export default function UserLoginPage() {

    // NOTE: Data
    const { t } = useTranslation();

    // 项目名称
    const projectName = "工作室用户中心"; // TODO: 从文件中读取

    // 项目信息
    const projectInfo = "科教平台工作室用户中心系统"; // TODO: 从文件中读取

    // 状态工具
    const dispatch = useDispatch<AppDispatch>();

    // 表单实例
    const [form] = ProForm.useForm();

    // 重定向页面
    const router = useRouter();

    // NOTE: Func
    // 登入接口
    const doSubmit = async (values: API.UserLoginRequest): Promise<void> => {
        console.log("执行一次登入操作") // TODO: 不确定是否需要屏蔽

        // 提交登入表单
        try {
            const res = await userLogin(values);

            if (res?.data) {
                message.success("登入成功, 欢迎回来"); // 提示登入成功

                dispatch(setLoginUser(res.data as API.LoginUserVO)); // 保存用户登入状态, 这里时用 as 的原因是拦截器直接把 axios 中的 data 返回了, 但是类型没有被处理

                router.replace("/"); // 跳转页面
                form.resetFields(); // 重置表单
            }
        } catch (e) {
            message.error("未知错误"); // 提示登入失败
        }
    };

    // NOTE: Render
    return (
        <div id="userLoginPage" className="max-width-content">
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
                title={t("login")}
                subTitle={projectInfo}
                onFinish={doSubmit}
            >
                {/* 用户名称 */}
                <ProFormText
                    name="userAccount"
                    fieldProps={{
                        size: "large",
                        prefix: <UserOutlined/>,
                    }}
                    placeholder={"请输入正确的帐号"}
                    rules={[
                        {
                            required: true,
                            message: "请输入正确的帐号!",
                        },
                    ]}
                />
                {/* 用户密码 */}
                <ProFormText.Password
                    name="userPasswd"
                    fieldProps={{
                        size: "large",
                        prefix: <LockOutlined/>,
                    }}
                    placeholder={"请输入正确的密码"}
                    rules={[
                        {
                            required: true,
                            message: "请输入正确的密码！",
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
                        还没有帐号？
                        <Link href={"/user/register"}>注册帐号</Link>
                    </div>
                </div>
            </LoginForm>
        </div>
    );

};
