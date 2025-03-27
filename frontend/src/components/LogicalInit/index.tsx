import React, { useCallback, useEffect, useState, useTransition } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/stores";
import { usePathname } from "next/navigation";
import { userStatus } from "@/api/userController";
import { setLoginUser } from "@/stores/loginUser";
import { Spin } from "antd";
import { useTheme } from "@/components/ThemeProvider";

const LogicalInit: React.FC<
    Readonly<{
        children: React.ReactNode;
    }>
> = ({ children }) => {
    // 状态管理器
    const dispath = useDispatch<AppDispatch>();

    // 存储加载状态
    const [loading, setLoading] = useState(true);

    // 存储页面过渡状态
    const [isPending, startTransition] = useTransition();

    // 存储加载动画
    const contentStyle: React.CSSProperties = {
        padding: 50,
        borderRadius: 4,
    };
    const content = <div style={contentStyle} />;

    // 获取路由
    const pathname = usePathname(); // 获取当前路由

    // NOTE: 逻辑, 设置测试初始
    const doInitTest = useCallback(() => {
        console.log("Do init.");
    }, []);

    // NOTE: 逻辑, 读取已登录用户信息
    const doInitLoginUser = useCallback(async () => {
        const res = await userStatus(); // 尝试获取到当前登陆用户的信息
        if (res.data) {
            dispath(setLoginUser(res.data as API.LoginUserVO)); // 获取得到则说明用户短期内已经登陆了, 更新用户信息全局状态即可
        } else {
            // TODO: 处理出错操作, 直接跳转到登录页面要求用户登陆即可
        }
        // eslint-disable-next-line
    }, []); // 这里使用可以缓存回调函数的 useCallback(), 只有在依赖项发生改变时才重新创建函数, 而不是重新挂载本组件时创建函数, 可以优化性能
    // TODO: 考虑去掉对 [] 的警告

    // 每次初始化调用一次
    useEffect(() => {
        doInitTest();
        doInitLoginUser().then(r => {
        }); // TODO: 考虑处理错误
        // 如果有的页面不需要初始化则可以考虑使用 userPathname() 来判断当前路由再根据条件判断进行屏蔽
        // 这里等接口文档服务导入接口后, 就可以书写在用户没有登陆时要求登陆的初始化逻辑
        // eslint-disable-next-line
    }, []);
    // TODO: 考虑去掉对 [] 的警告

    // 页面路由的变化调用
    useEffect(() => {
        // 当路由变更时触发加载动画
        setLoading(true);
        startTransition(() => {
            setLoading(false);
        });
    }, [pathname]); // 监听 pathname 变化

    // 如果正在加载, 则显示加载动画
    const { isDark } = useTheme(); // 获取当前主题状态
    if (loading) {
        return (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: isDark ? "#181818" : "#ffffff" }}>
                <Spin tip="Loading" size="small">
                    {content}
                </Spin>
            </div>
        );
    }

    return children;
};

export default LogicalInit;
