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
        <div key='jsx-item-1'>{t("work_user_centre")}</div>,
        'https://images.unsplash.com/photo-1723403804231-f4e9b515fe9d?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        t("work_user_centre"),
        <div key='jsx-item-2'>{t("work_user_centre")}</div>,
        t("work_user_centre"),
        <div key='jsx-item-2'>{t("work_user_centre")}</div>,
        'https://images.unsplash.com/photo-1723403804231-f4e9b515fe9d?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        t("work_user_centre"),
        <div key='jsx-item-2'>{t("work_user_centre")}</div>,
        '这是一个用户中心项目，用于管理用户信息，并作为微服务的一环存在于工作室微服务架构中。',
        'https://images.unsplash.com/photo-1723403804231-f4e9b515fe9d?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        <div key='jsx-item-2'>支持用户查看自己的登陆数据，并且借用该服务进行单点登陆。</div>,
        t("work_user_centre"),
        <div key='jsx-item-2'>{t("work_user_centre")}</div>,
        t("work_user_centre"),
        <div key='jsx-item-3'>{"开放的 OpenAPI 接口文档让您不再需要编写复杂的登陆逻辑。"}</div>,
        'https://images.unsplash.com/photo-1723403804231-f4e9b515fe9d?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        '支持管理查看自己的登陆服务，并且借用该服务进行用户操作。',
        <div key='jsx-item-2'>{t("work_user_centre")}</div>,
        t("work_user_centre"),
        <div key='jsx-item-4'>{t("work_user_centre")}</div>,
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
