// ./src/layouts/BasicLayout/components/Header/page.tsx: 网页页头组件

"use client";

import "./index.css";
import React from "react";

interface HeaderProps {
  logo: React.ReactNode;
  title: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ logo, title }) => {
  return (
    <a className="header">
      {" "}
      {logo}
      {title}
    </a>
  );
};

export default Header;
