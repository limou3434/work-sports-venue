"use client";

import React from 'react';
import UserProfileCard from "@/components/UserProfileCard";
import {useSelector} from "react-redux";
import {RootState} from "@/stores";
import LetterGlitch from "@/components/LetterGlitch";
import Aurora from '@/components/Aurora';
import {Alert, Space} from "antd";
import Marquee from "react-fast-marquee";

/**
 * 主页页面
 */
export default function HomePage() {

    // NOTE: Data
    const loginUser = useSelector((state: RootState) => state.loginUser); // 获取用户登陆状态实例

    // NOTE: Func
    const mockUser: API.LoginUserVO = {
        ...loginUser
    };

    // NOTE: Render
    return (
        <main
            id="homePage"
            className="flex min-h-screen flex-col items-center justify-between p-24"
        >
            <Space direction="vertical" size="small" style={{display: 'flex'}}>
                {/* 全局公告 */}
                <Alert
                    type="success"
                    banner
                    message={
                        <Marquee pauseOnHover gradient={false}>
                            欢迎来到本项目
                        </Marquee>
                    }
                />
                {/* 乱序代码 */}
                {/*<LetterGlitch*/}
                {/*    glitchSpeed={50}*/}
                {/*    centerVignette={false}*/}
                {/*    outerVignette={true}*/}
                {/*    smooth={true}*/}
                {/*/>*/}
                {/* 用户卡片 */}
                <UserProfileCard user={mockUser}/>
            </Space>
        </main>
    );

}
