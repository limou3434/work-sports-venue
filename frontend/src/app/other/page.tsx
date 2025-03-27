"use client";

import "./page.css";
import React from "react";
import GridMotion from "@/components/GridMotion";
import {useTranslation} from "react-i18next";

/**
 * 其他页面
 */
export default function OtherPage() {

    // NOTE: Data
    const {t} = useTranslation();

    const items = [
        t("work_user_centre"),
        <div key='jsx-item-1'>健身房管理系统</div>,
        'https://images.unsplash.com/photo-1723403804231-f4e9b515fe9d?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        t("work_user_centre"),
        <div key='jsx-item-2'>健身房管理系统</div>,
        t("work_user_centre"),
        <div key='jsx-item-2'>健身房管理系统</div>,
        'https://images.unsplash.com/photo-1723403804231-f4e9b515fe9d?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        t("work_user_centre"),
        <div key='jsx-item-2'>健身房管理系统</div>,
        '这是一个用健身房管理系统的管理系统，主要提供面向健身房教练和管理员的相关功能。',
        'https://images.unsplash.com/photo-1723403804231-f4e9b515fe9d?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        <div key='jsx-item-2'>支持用户查看自己的登陆数据</div>,
        t("work_user_centre"),
        <div key='jsx-item-2'>健身房管理系统</div>,
        t("work_user_centre"),
        <div key='jsx-item-3'>{"开放的 OpenAPI 接口文档让本项目易于调试。"}</div>,
        'https://images.unsplash.com/photo-1723403804231-f4e9b515fe9d?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        '支持小程序用户端的集成',
        <div key='jsx-item-2'>健身房管理系统</div>,
        t("work_user_centre"),
        <div key='jsx-item-4'>健身房管理系统</div>,
        'https://images.unsplash.com/photo-1723403804231-f4e9b515fe9d?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        t("work_user_centre"),
    ];

    // NOTE: Reducer
    return (
        <div id="otherPage" style={{width: "100%", margin: "0 auto"}}>
            {/* @ts-ignore */}
            <GridMotion items={items}/>
        </div>
    );

}
