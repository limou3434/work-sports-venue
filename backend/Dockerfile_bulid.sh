#!/bin/bash
# 镜像编译脚本
#
# @author <a href="https://github.com/xiaogithuboo">limou3434</a>
# 设置版本号码
version="0.2.0"

# 拉取基础镜像
sudo docker pull openjdk:17-jdk-slim

# 编译项目源码
# TODO: 由于 Java 语言的特殊性, 暂时需要拉取到 IDEA 中进行打包后再来执行

# 打包项目镜像
project_name=$(basename "$(dirname "$PWD")") # 设置当前目录名
sudo docker build -t "${project_name}-backend:${version}" .
echo "${project_name}:${version} 项目的脚本结束"
