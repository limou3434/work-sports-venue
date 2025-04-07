# 基础镜像
FROM nginx:1.18.0

# 命令操作
COPY ./init/default.conf /etc/nginx/conf.d/default.conf

# 暴露端口
EXPOSE 80

# 启动服务
CMD ["nginx", "-g", "daemon off;"]
