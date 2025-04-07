// ./src/layouts/BasicLayout/components/Actions/page.tsx: 网页文档组件

"use client";

import "./index.css";
import { GithubFilled } from "@ant-design/icons";
import SearchInput from "@/components/BasicLayout/components/SearchInput";
import React from "react";

interface ActionsProps {
  isMobile?: boolean;
  layout?: "side" | "top" | "mix";
}

const Actions: React.FC<ActionsProps> = ({ isMobile, layout }) => {
  // 小屏幕就隐藏
  if (isMobile) return null;

  // 大屏幕就显示
  return [
    layout !== "side" ? ( // 不是侧边模式就会显示搜索条
      <SearchInput key={"searchFilled"} />
    ) : undefined,
    <a
      className="actions"
      key="github"
      href="https://github.com/xiaogithubooo"
      target="_blank"
    >
      <GithubFilled key="GithubFilled" />
    </a>,
    // <InfoCircleFilled key="InfoCircleFilled" />,
    // <QuestionCircleFilled key="QuestionCircleFilled" />,
  ];
};

export default Actions;
