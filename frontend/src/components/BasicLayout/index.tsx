// ./src/layouts/BasicLayout/page.tsx: 基本布局组件
"use client";

import "./index.css";
import {LoginOutlined, LogoutOutlined} from "@ant-design/icons";
import {ProLayout} from "@ant-design/pro-components";
import {Dropdown, message} from "antd";
import React, {useState} from "react";
import Image from "next/image";
import {usePathname, useRouter} from "next/navigation";
import Link from "next/link";
import menus from "@/app/menus";
import Footer from "@/components/BasicLayout/components/Footer";
import Header from "@/components/BasicLayout/components/Header";
import Actions from "@/components/BasicLayout/components/Actions";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/stores";
import accessControlDisplay from "@/access/accessControlDisplay";
import {userLogout} from "@/api/userController";
import {setLoginUser} from "@/stores/loginUser";
import {DEFAULT_USER} from "@/constants";
import {useTranslation} from "react-i18next";

interface Props {
    children: React.ReactNode;
}

export default function BasicLayout({children}: Props) {
    const pathname = usePathname(); // 获取当前页面地址

    const loginUser = useSelector((state: RootState) => state.loginUser); // 获取用户登陆状态实例
    const dispatch = useDispatch<AppDispatch>(); // 登入状态
    const router = useRouter(); // 重定向页面路由工具
    const { t } = useTranslation();

    // 用户登出
    const doUserLogout = async () => {
        try {
            await userLogout();
            message.success("登出成功"); // 提示登入成功
            dispatch(setLoginUser(DEFAULT_USER)); // 恢复用户默认状态
            router.push("/user/login"); // 跳转页面
        } catch (e) {}
    };

    return (
        <div
            style={{
                height: "100vh",
                overflow: "auto",
            }}
        >
            {/* 核心组件 */}
            <ProLayout
                // 网站标题
                title="工作室用户中心" // TODO: 集成到配置文件中
                // 网站图标
                logo={
                    <Image
                        src="/assets/logo.svg"
                        height={32}
                        width={32}
                        alt="logo"
                        style={{width: "auto", height: "auto"}} // 解决 Next.js 警告
                    />
                }
                // 布局类型, 可选值 top 或 side
                layout="side"
                // 是否高亮
                location={{
                    pathname,
                }}
                // 用户数据
                avatarProps={{
                    src: loginUser.userAvatar || "/assets/not_login_user.svg",
                    size: "small",
                    title: loginUser.userAccount || "未登陆",
                    // @ts-ignore
                    render: (_, dom) => {
                        return (
                            <Dropdown
                                menu={{
                                    items: [
                                        {
                                            key: "login",
                                            icon: <LoginOutlined/>,
                                            label: "登录页面",
                                        },
                                        {
                                            key: "logout",
                                            icon: <LogoutOutlined/>,
                                            label: "退出登录",
                                        },
                                    ],
                                    onClick: async (event: { key: React.Key }) => {
                                        const key = event.key;
                                        if (key === "login") {
                                            router.push("/user/login");
                                        } else if (key === "logout") {
                                            await doUserLogout();
                                            router.push("/user/login");
                                        }
                                    },
                                }}
                            >
                                {dom}
                            </Dropdown>
                        );
                    },
                }}
                // 监听标题
                // @ts-ignore
                onMenuHeaderClick={(e) => console.log(e)}
                // 菜单数据
                menuDataRender={() => {
                    // return menus; // 无需考虑权限的写法
                    return accessControlDisplay(loginUser, menus); // 这个函数会自动根据页面权限的设置来过滤菜单项, 以控制对应用户看到对应的菜单项
                }}
                // 菜单跳转
                // @ts-ignore
                menuItemRender={(item, dom) => {
                    return (
                    // 根据菜单进行页面跳转但需要约定路由的实际支持(也就是要编写对应的目录, 并且在这里可以拓展菜单的属性)
                    // <Link href={item.path || "/public"} target={item.target}>
                    //     {dom}
                    // </Link>
                    <div onClick={() => {console.log("点击了一次跳转")}}>
                        <Link
                            href={item.path || "/public"} target={item.target}>
                            {dom}
                        </Link>
                    </div>
                )}}
                // 渲染文档
                // @ts-ignore
                actionsRender={(props) => {
                    return <Actions isMobile={props.isMobile} layout={props.layout}/>;
                }}
                // 渲染头部
                // @ts-ignore
                headerTitleRender={(logo, title, _) => {
                    return <Header logo={logo} title={title}/>;
                }}
                // 渲染侧边底部
                // @ts-ignore
                menuFooterRender={(props) => {
                  if (props?.collapsed) return undefined;
                  return (
                      <div
                          style={{
                            textAlign: 'center',
                            paddingBlockStart: 12,
                          }}
                      >
                          <Footer />
                      </div>
                  );
                }}
                // 渲染底边底部
                footerRender={() => {
                    return (
                        <div
                            style={{
                                textAlign: 'center',
                                paddingBlockStart: 12,
                                paddingBottom: 20,
                            }}
                        >
                            <Footer/>
                        </div>
                    );
                }}
            >
                {children}
            </ProLayout>
        </div>
    );
}
