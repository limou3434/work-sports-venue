# Dockerfile
#
# @author <a href="https://github.com/xiaogithubooo">limou3434</a>

# 使用官方 OpenJDK 镜像作为基础镜像
FROM openjdk:17-jdk-slim

# 设置容器内部的工作目录并且切换到工作目录
WORKDIR /app

# 复制 target 目录下的 JAR 文件
COPY ./target/*.jar ./app.jar

# 设置容器启动时运行的命令
ENTRYPOINT ["java", "-jar", "./app.jar"]

# 容器运行时监听的端口
EXPOSE 8000
