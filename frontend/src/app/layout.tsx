/**
 *  ./src/app/layout.tsx: 应用全局初始, 无论访问什么页面都会执行这段代码
 *
 *  这段代码会执行: 引入组件库、加页面水印、状态管理器、主题提供者、逻辑初始化、渲染初始化、页面权限化
 */
"use client";

import "./globals.css";
import BasicLayout from "../components/BasicLayout";
import {AntdRegistry} from "@ant-design/nextjs-registry";
import React from "react";
import {Provider} from "react-redux";
import Access from "@/components/BasicLayout/components/Access";
import {WaterMark} from "@ant-design/pro-layout";
import {ThemeProvider} from "@/components/ThemeProvider";
import store from "@/stores";
import "nprogress/nprogress.css";
import LogicalInit from "../components/LogicalInit";
import LanguageSwitch from "@/components/LanguageSwitch"; // 英文
import {useTranslation} from 'react-i18next';

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    const {t} = useTranslation(); // 支持国际化文本

    return (
        <html lang="zh">
        <body>
        {/* 引入组件库 */}
        <AntdRegistry>
            {/* 加语言切换 */}
            <LanguageSwitch>
                {/* 加页面水印 */}
                <WaterMark content={"健身房管理系统"} fontSize={18}> {/* TODO: 可以加上用户的 account, 并且打算配置化 */}
                    {/* 状态管理器 */}
                    <Provider store={store}>
                        {/* 主题提供者 */}
                        <ThemeProvider>
                            {/* 逻辑初始化 */}
                            <LogicalInit>
                                {/* 渲染初始化 */}
                                <BasicLayout>
                                    {/* 页面权限化 */}
                                    <Access>
                                        {children}
                                    </Access>
                                </BasicLayout>
                            </LogicalInit>
                        </ThemeProvider>
                    </Provider>
                </WaterMark>
            </LanguageSwitch>
        </AntdRegistry>
        </body>
        </html>
    );
}
