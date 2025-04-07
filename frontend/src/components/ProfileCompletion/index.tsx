/**
 * ./src/components/ProfileCompletion/page.tsx: 用户信息完成度组件(参考 https://www.kirilv.com/canvas-confetti/)
 */
"use client";

// TODO: 这一段不是特别了解

import "./index.css"
import React from "react";
import {useSelector} from "react-redux";
import {Card, List, Progress} from "antd";
import {RootState} from "@/stores";
import CompletionCheckmark from "@/components/CompletionCheckmark";

/**
 * 提示字段
 */
const fieldLabels: Record<string, string> = {
    userAvatar: "上传头像",
    userName: "实名账户",
    userEmail: "绑定邮箱",
    userPhone: "绑定手机",
    userProfile: "个人介绍",
    userBirthday: "填写生日",
    userCountry: "填写国家",
    userGender: "填写性别",
};

/**
 * 字段权重
 */
const weights: Record<string, number> = {
    userAvatar: 10,
    userName: 10,
    userEmail: 10,
    userPhone: 10,
    userProfile: 10,
    userBirthday: 10,
    userCountry: 10,
    userGender: 10,
};

/**
 * 计算信息完成度
 *
 * @param user 用户信息
 */
const calculateCompletion = (user: API.LoginUserVO): number => {
    const fields = Object.keys(fieldLabels); // 获取所有字段
    const totalWeight = fields.reduce((sum, key) => sum + weights[key], 0); // 计算总权重, sum 是上一次累加的结果(从 0 开始), key 是当前循环的字段
    const completedWeight = fields.reduce((sum, key) => {
        const value = user[key as keyof API.LoginUserVO];
        return sum + ((value !== null && value !== "") ? weights[key] : 0); // 如果字段值不为空则加上权重
    }, 0); // 计算已完成的权重

    return Math.round((completedWeight / totalWeight) * 100);
};

/**
 * 获取未完成的字段
 *
 * @param user 用户信息
 */
const getIncompleteFields = (user: API.LoginUserVO): string[] => {
    return Object.keys(fieldLabels)
        .filter((key) => user[key as keyof API.LoginUserVO] === null || user[key as keyof API.LoginUserVO] === "")
        .map((key) => fieldLabels[key]);
};

const ProfileCompletion: React.FC = () => {
    // 直接从 Redux 获取 loginUser 数据
    const loginUser = useSelector((state: RootState) => state.loginUser);

    if (!loginUser) return null; // 如果 Redux 状态为空，不渲染组件

    const completion = calculateCompletion(loginUser);
    const incompleteFields = getIncompleteFields(loginUser);

    return (
        <div className="profile-completion" style={{width: "100%", margin: "0 auto"}}>
            <Card variant="borderless" hoverable={true} style={{width: "100%", height: "100%"}}>
                {/* 标题 */}
                <h3>当前登录用户信息完成度</h3>

                {/* 进度 */}
                <Progress percent={completion} status={completion < 100 ? "active" : "success"}/>
                {incompleteFields.length > 0 && (
                    <List
                        header={<b>完善以下信息可提升完成度：</b>}
                        dataSource={incompleteFields}
                        renderItem={(item, index) => <List.Item style={{color: 'red'}} key={index}>✗ {item}</List.Item>}
                    />
                )}
            </Card>
            {/* 礼炮 */}
            {completion >= 100 && (<CompletionCheckmark/>)}
        </div>
    );
};

export default ProfileCompletion;
