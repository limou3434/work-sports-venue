"use client";

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/stores";
import { Card, Col, Divider, Row, Space, Statistic, Typography } from "antd";
import { TeamOutlined, UserOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";

/**
 * 主页页面
 */
export default function HomePage() {
    const router = useRouter();

    // 获取用户登录状态实例
    const loginUser = useSelector((state: RootState) => state.loginUser);
    const mockUser: API.LoginUserVO = { ...loginUser };

    return (
        <main
            id="homePage"
            className="flex min-h-screen flex-col items-center justify-start p-12"
        >
            <Typography.Title level={2} className="text-center">
                管理控制台
            </Typography.Title>

            <Space direction="vertical" size="large" style={{ width: "100%" }}>
                {/* 数据统计部分 */}
                <Row gutter={[16, 16]} justify="center">
                    <Col xs={24} sm={12} md={8} lg={6}>
                        <Card hoverable className="shadow-lg rounded-lg">
                            <Statistic
                                title="当前学员人数"
                                value={1128}
                                prefix={<UserOutlined />}
                                valueStyle={{ fontWeight: "bold" }}
                            />
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={6}>
                        <Card hoverable className="shadow-lg rounded-lg">
                            <Statistic
                                title="当前教练人数"
                                value={93}
                                prefix={<TeamOutlined />}
                                valueStyle={{ fontWeight: "bold" }}
                            />
                        </Card>
                    </Col>
                </Row>

                <Divider />

                {/* 功能模块 */}
                <Row gutter={[16, 16]} justify="center">
                    {[
                        { title: "用户管理模块", path: "/admin/users" },
                        { title: "课程管理模块", path: "/admin/curriculums" },
                        { title: "器械管理模块", path: "/admin/equipments" },
                    ].map((item, index) => (
                        <Col xs={24} sm={12} md={8} key={index}>
                            <Card
                                hoverable
                                onClick={() => router.replace(item.path)}
                                className="shadow-md rounded-xl transition-transform transform hover:scale-105"
                            >
                                <Typography.Title level={4} className="text-center">
                                    {item.title}
                                </Typography.Title>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Space>
        </main>
    );
}
