#!/bin/bash
# 镜像编译脚本
#
# @author <a href="https://github.com/xiaogithuboo">limou3434</a>
# 设置版本号码
version="0.2.0"

# 拉取基础镜像
sudo docker pull node:22.11.0

# 编译项目源码
npm install
npm run build
npm run package

# 打包项目镜像
project_name=$(basename "$(dirname "$PWD")") # 获取当前目录名
sudo docker build -t "${project_name}-frontend:${version}" .
echo "${project_name}:${version} 项目的脚本结束"
