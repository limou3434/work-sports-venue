// ./openapi.config.ts
import { generateService } from "@umijs/openapi";

generateService({
    requestLibPath: "import request from '@/libs/request'", // 请求库
    schemaPath: "http://127.0.0.1:8000/work_user_centre_api/v3/api-docs", // 后端接口规范(Open API 以前称为 Swagger)
    serversPath: "./src", // 生成代码对应的父目录, 会得到一个 api/ 目录
}).then(r => {});

// 并且需要 package.json 中编写 "openapi": "ts-node openapi.config.ts" 脚本, 如果后端编写了接口就可以在后端启动的时候启动本脚本快速获取接口
