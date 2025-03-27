/**
 *  ./src/components/BasicLayout/components/Access/index.tsx: 网页权限组件
 */
"use client"
import "./index.css";
import { useSelector } from "react-redux";
import { RootState } from "@/stores";
import { usePathname } from "next/navigation";
import checkAccess from "@/access/checkAccess";
import Forbidden from "@/app/forbidden";
import React from "react";
import { ACCESS_ENUM } from "@/constants";
import { MenuDataItem } from "@ant-design/pro-layout";
import menus from "../../../../app/menus";

/**
 * 根据传入的路径, 查找菜单数组中的某一个对路径的描述元素
 *
 * @param menus
 * @param path
 */
const findMenuItemByPath = (
  menus: MenuDataItem[],
  path: string
): MenuDataItem | null => {
  for (const menu of menus) {
    if (menu.path === path) {
      return menu;
    }
    if (menu.children) {
      const matchedMenuItem = findMenuItemByPath(menu.children, path);
      if (matchedMenuItem) {
        return matchedMenuItem;
      }
    }
  }
  return null;
};

// 根据传入的路径查找所有菜单
const findAllMenuItemByPath = (path: string): MenuDataItem | null => {
  return findMenuItemByPath(menus, path);
};

const Access: React.FC<
  Readonly<{
    children: React.ReactNode;
  }>
> = ({ children }) => {
  // 获取当前路由
  const pathname = usePathname();

  // 获取用户登陆状态
  const loginUser = useSelector((state: RootState) => state.loginUser);

  // 权限校验
  const menu = findAllMenuItemByPath(pathname) || {}; // 找到当前路由对应的描述元素
  const needAccess = menu?.access ?? ACCESS_ENUM.NOT_LOGIN; // 取出需要的权限
  const canAccess = checkAccess(loginUser, needAccess); // 取出用户的权限

  // 如果没有权限, 则返回 403 页面, 否则返回原页面
  if (!canAccess) {
    return <Forbidden />;
  }
  return <>{children}</>;
};

export default Access;
