#!/bin/bash
# 镜像终止脚本
#
# @author <a href="https://github.com/xiaogithuboo">limou3434</a>
project_name=$(basename "$(dirname "$PWD")") # 设置当前目录名
sudo docker container stop "${project_name}-backend" || true
sudo docker container rm "${project_name}-backend" || true
sudo docker container logs "${project_name}-backend"
sudo docker container ls -a
sudo docker image prune -a
echo "${project_name} 项目的脚本结束"

