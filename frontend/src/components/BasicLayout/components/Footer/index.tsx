// ./src/layouts/BasicLayout/components/Footer/index.tsx: 网页页脚组件

"use client";

import "./index.css";
import {useTranslation} from "react-i18next";
const Footer = () => {
    const {t} = useTranslation();
    const currentYear = new Date().getFullYear();

    return (
    <div className="footer">
      <div>© {currentYear} {t("made")}</div>
      <div>by me</div>
    </div>
    );
};

export default Footer;
