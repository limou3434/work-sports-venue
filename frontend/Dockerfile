# 基础镜像
FROM node:22.11.0

# 工作目录
WORKDIR /app

# 编译代码
# 请在本地直接使用 npm i && npm run build 进行编译避免容器过大
COPY ./.next/standalone ./

# 运行端口
EXPOSE 3000

# 启动命令
CMD ["node", "--harmony", "server.js"]

