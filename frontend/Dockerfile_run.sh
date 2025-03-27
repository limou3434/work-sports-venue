#!/bin/bash
# 镜像运行脚本
#
# @author <a href="https://github.com/xiaogithuboo">limou3434</a>
version="0.2.0"
project_name=$(basename "$(dirname "$PWD")")
sudo docker container stop "${project_name}-frontend" || true
sudo docker container rm "${project_name}-frontend" || true
sudo docker run -d --restart=always --network host --name "${project_name}-frontend" "${project_name}-frontend:${version}"
sudo docker container logs "${project_name}-frontend"
sudo docker container ls -a
echo "${project_name}:${version} 项目的脚本结束"
