// ./src/layouts/BasicLayout/components/SearchInput/page.tsx: 网页搜索组件

"use client";

import "./index.css";
import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";

const Index = () => {
  return (
    <div
      className="search-input"
      key="SearchOutlined"
      aria-hidden
      style={{
        display: "flex",
        alignItems: "center",
        marginInlineEnd: 24,
      }}
      onMouseDown={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
    >
      <Input
        style={{
          borderRadius: 4,
          marginInlineEnd: 12,
        }}
        prefix={<SearchOutlined />}
        placeholder="搜索"
        variant="borderless"
      />
    </div>
  );
};

export default Index;
