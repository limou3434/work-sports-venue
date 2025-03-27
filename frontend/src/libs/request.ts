import axios from "axios";
import {message} from "antd";

const mode = "develop"; // 读取 MODE 环境变量得到运行模式

const hosts: Record<string, string> = { // 读取 XXXXXXX_HOST 环境变量
    "develop": "127.0.0.1:8000", // 开发环境(无代理)
    "release": "10.10.174.95:80", // 测试环境(有代理)
    "product": "", // 生产环境(有代理)
};

const host = hosts[mode]; // 必须先读取为常量, 否则浏览器中无法动态获取...
// console.info(mode);
// console.info(host);

const api = "work_user_centre_api";
// console.info(api);

const baseURL = `http://${host}/${api}`;
// console.info(baseURL);
``
/**
 * 创建 Axios 实例(如果需要选择多个 api 服务需要配置多个 axios 实例)
 */
const myAxios = axios.create({
    baseURL: baseURL, // 请求后端(IP+PORT)
    timeout: 10000, // 响应时间(10s)
    withCredentials: true, // 凭证携带(开启)
});

/**
 * 拦截后调用的函数
 */
const handleLoginError = (data: any, preUrl: any) => { // TODO: any 有点不太好
    // 特殊处理
    if (data.code === 40100) {
        // 不是获取用户信息接口, 或者不是登录页面, 则重定向跳转到登录页面
        if (
            !preUrl.includes("user/get/login") && // 判断之前的请求中不包含获取登录接口, 这个接口本来就是为了获取状态的, 无需跳转
            !window.location.pathname.includes("/user/login") // 判断当前页面不是处于登录页面, 这个页面本来就是为了登录的, 无需跳转
        ) {
            window.location.href = `/user/login?redirect=${window.location.href}`; // 这一句代码的作用是将用户重定向到登录页面, 并在登录页面的 URL 中添加一个 redirect 参数, 方便用户登陆请求成功后切回原来的界面, 做到无缝体验， redirect 保存了当前页面的 URL
        }
        void message.error("登录已过期, 请重新登录");
    }
}

/**
 * 创建请求拦截器
 */
myAxios.interceptors.request.use(
    // 处理请求前执行, 整体为一个回调函数被调用
    function (config) {
        console.log("检查请求前的配置"); // TODO: 不确定是否需要屏蔽
        console.log(config); // TODO: 不确定是否需要屏蔽

        return config;
    },

    // 处理请求后错误, 整体为一个回调函数被调用
    function (error) {
        console.log("检查请求后的错误"); // TODO: 不确定是否需要屏蔽
        console.log(error); // TODO: 不确定是否需要屏蔽

        return Promise.reject(error);
    },
);

/**
 * 创建响应拦截器
 */
myAxios.interceptors.response.use(
    // 响应成功(为 2xx 响应触发), 整体为一个回调函数被调用
    function (response) {
        console.log("检查响应后的报文"); // TODO: 不确定是否需要屏蔽
        console.log(response); // TODO: 不确定是否需要屏蔽

        const {data} = response;
        const preUrl = response.request.responseURL;
        handleLoginError(data, preUrl);

        return data; // 当前端打印 res 时, 看到的是 Axios 包装的完整响应对象, 而 res.data 才是服务器返回的实际数据部分, 这里返回 data 有助于前端请求函数不用写 res.data.data 这种冗长的写法
    },

    // 响应失败(非 2xx 响应触发), 整体为一个回调函数被调用, 不过其实几乎用不到, 每个接口无论错误都会返回 200
    function (error) {
        console.log("检查响应后的错误"); // TODO: 不确定是否需要屏蔽
        console.log(error); // TODO: 不确定是否需要屏蔽

        return Promise.reject(error); // 返回一个被拒绝的 Promise, 配合后续 async/await 日志打印
    },
);

export default myAxios;
