"use client";

import {useEffect} from "react";

/**
 * 其他页面
 */
export default function AtestPage() {

    useEffect(() => {
        // 在组件挂载后，设置状态为 true 来触发消息显示
    }, []); // 空依赖数组，确保只在组件挂载时触发一次

    return (
        <div>
            {/* 动态渲染 MessageProvider */}
        </div>
    );
}
