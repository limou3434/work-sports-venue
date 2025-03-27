/**
 * ./src/app/menus.tsx: 配置菜单
 * 配置菜单的时候也必须保证具有对应约定路由
 */
import {MenuDataItem} from "@ant-design/pro-layout";
import {
    BarChartOutlined,
    BulbOutlined,
    CalendarOutlined,
    CrownOutlined,
    HomeOutlined,
    SnippetsOutlined
} from "@ant-design/icons";
import {ACCESS_ENUM} from "@/constants";

const menus = [
    {
        path: "/",
        name: "主页",
        icon: <HomeOutlined/>,
        // access: ACCESS_ENUM.NOT_LOGIN,
    },
    {
        path: "/curriculum",
        name: "课程",
        icon: <CalendarOutlined/>,
        // access: ACCESS_ENUM.NOT_LOGIN,
    },
    {
        path: "/admin",
        name: "管理",
        icon: <CrownOutlined/>,
        // access: ACCESS_ENUM.ADMIN,
        children: [
            {
                path: "/admin/users",
                name: "用户列表",
            },
            {
                path: "/admin/curriculums",
                name: "课程列表",
            },
            {
                path: "/admin/equipments",
                name: "器械列表",
            }
        ],
    },
    {
        path: "/other",
        name: "其他",
        icon: <BulbOutlined/>,
        // access: ACCESS_ENUM.NOT_LOGIN,
    },
] as MenuDataItem[]; // 这样写会提供编写本菜单配置的智能提示

export default menus;
