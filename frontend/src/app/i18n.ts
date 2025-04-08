/**
 * ./src/app/i18n.ts: 国际化配置
 *
 * 保证引入 import {useTranslation} from 'react-i18next';
 * 使用国际化文本只需要在 @/app/i18n.ts 文件中定义, 以及使用来支持国际化文本
 * const {t} = useTranslation();
 * {t("internationalization_text")}
 * 这样在点击右上角的语言切换按钮时就会进行自动翻译
 * 如果需要在组件外部使用, 则可以直接引入
 * import i18n from "@/app/i18n";
 * i18n.t("internationalization_text")
 */
import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import zhCN from 'antd/es/locale/zh_CN';
import enUS from 'antd/es/locale/en_US';

// TODO: 把一些文本修改为国际化

i18n.use(initReactI18next).init({
    resources: {
        zh: {
            translation: {
                work_user_centre: "工作室用户中心",
                switch_language_button: "语言切换按钮",
                switch_theme_button: "主题切换按钮",
                made: "制作",
                by_work: "by me",
                admin_user_list: "用户列表",
                sort: "排序",
                unknown: "未知",
                push_update: "提交更新",
                are_you_sure_to_submit_the_changes: "你确定提交更新么?",
                confirm_submission: "确认提交",
                push_update_success: "提交更新成功",
                push_update_failed: "提交更新失败",
                user_table: "用户表格",
                modify_form: "修改表单",
                login: "登入",
                register: "注册",
                id: "ID",
                user_account: "账号",
                user_wx_union: "微信号",
                user_mp_open: "公众号",
                user_email: "邮箱",
                user_phone: "手机",
                user_avatar: "头像",
                user_tags: "标签",
                user_nick: "昵称",
                user_name: "姓名",
                user_profile: "简介",
                user_birthday: "生日",
                user_country: "国家",
                user_address: "地址",
                user_role: "角色",
                user_level: "等级",
                user_gender: "性别",
            }
        },
        en: {
            translation: {
                work_user_centre: "Work User Centre",
                switch_language_button: "Switch Language Button",
                switch_theme_button: "Switch Theme Button",
                welcome_to_work_user_centre: "Welcome to Work User Centre",
                made: "Made",
                by_work: "by Work",
                admin_user_list: "User List",
                sort: "Sort",
                unknown: "Unknown",
                push_update: "Push Update",
                are_you_sure_to_submit_the_changes: "Are you sure to submit the changes?",
                confirm_submission: "Confirm Submission",
                push_update_success: "Push Update Success",
                push_update_failed: "Push Update Failed",
                user_table: "User Table",
                modify_form: "Modify Form",
                login: "Login",
                register: "Register",
                id: "ID",
                user_account: "Account",
                user_wx_union: "WxUnion",
                user_mp_open: "MpOpen",
                user_email: "Email",
                user_phone: "Phone",
                user_avatar: "Avatar",
                user_tags: "Tags",
                user_nick: "Nick",
                user_name: "Name",
                user_profile: "Profile",
                user_birthday: "Birthday",
                user_country: "Country",
                user_address: "Address",
                user_role: "Role",
                user_level: "Level",
                user_gender: "User Gender"
            }
        },
    },
    lng: 'zh', // 默认语言
    fallbackLng: 'en', // 默认回退语言
    interpolation: {
        escapeValue: false,
    },
});

export {zhCN, enUS};
export default i18n;
