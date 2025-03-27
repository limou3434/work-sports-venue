# Dockerfile
#
# @author <a href="https://github.com/xiaogithubooo">limou3434</a>

# 使用基础镜像
FROM node:22.11.0

# 设置容器内部的工作目录并且切换到工作目录
WORKDIR /app

# 拷贝可直接部署的前端项目包
COPY .next/standalone ./

# 向宿主机暴露 Next.js 运行的端口
EXPOSE 3000

# 设置环境变量修改地址
ENV HOSTNAME=127.0.0.1

# 使用启动 Next.js
CMD ["node", "--harmony", "server.js"]
