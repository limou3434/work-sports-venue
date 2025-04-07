/**
 * ./src/components/LanguageSwitch/page.tsx: 语言切换组件
 *
 * 使用该组件需要搭配 @/app/i18n.ts 文件使用
 */
"use client"

import React, {useEffect, useState} from 'react';
import {ConfigProvider, FloatButton} from 'antd';
import {useTranslation} from 'react-i18next';
import {enUS, zhCN} from '@/app/i18n';
import {GlobalOutlined, TranslationOutlined} from '@ant-design/icons';

// 语言切换组件
interface LanguageSwitchProps {
    children: React.ReactNode;
}

const LanguageSwitch: React.FC<LanguageSwitchProps> = ({children}) => {
    const {t, i18n} = useTranslation();

    const [icon, setIcon] = useState<React.ReactNode>(<TranslationOutlined/>);

    const changeLanguage = () => {
        const newLang = i18n.language === 'zh' ? 'en' : 'zh';
        i18n.changeLanguage(newLang).then(r => {
        });
    };

    useEffect(() => {
        setIcon(i18n.language === 'zh' ? <TranslationOutlined/> : <GlobalOutlined/>);
    }, [i18n.language]); // 当语言变化时，更新图标

    return (
        <ConfigProvider locale={i18n.language === 'zh' ? zhCN : enUS}>
            <div>
                {/* 渲染传递的子组件 */}
                {children}

                {/* 右上角悬浮的语言切换按钮 */}
                <div style={{position: "fixed", bottom: 80, right: 20, zIndex: 1000}}>
                    <FloatButton
                        icon={icon} // 使用 Ant Design 图标
                        tooltip={t('switch_language_button')}
                        onClick={changeLanguage}
                        style={{bottom: "105px"}} // 强制覆盖
                    />
                </div>
            </div>
        </ConfigProvider>
    );
};

export default LanguageSwitch;
