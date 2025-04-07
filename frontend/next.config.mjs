/** @type {import('next').NextConfig} */

const nextConfig = {
    output: "standalone", // 这里修改为使用 standalone 模式来部署(这样上传服务器不用上传 node_modules/), 而 ./.next/standalone/ 目录就是可独立部署包, 不过还需要把 ./public 复制到 ./.next/standalone/ 内, 把 .next/static 复制到 .next/standalone/.next 内, 前面已经在 package.json 中对 build 指令进行了修改

    typescript: {
        ignoreBuildErrors: true, // 即使项目存在类型错误, 也允许产品构建成功完成
    },

    reactStrictMode: false
};

export default nextConfig;
