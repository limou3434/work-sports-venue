#!/bin/bash
# 镜像打包脚本
#
# @author <a href="https://github.com/xiaogithuboo">limou3434</a>
version="0.2.0"
project_name=$(basename "$(dirname "$PWD")")
sudo docker save -o "${project_name}-frontend-docker-image-${version}.tar" "${project_name}-frontend:${version}"
echo "传输镜像文件可以使用: \"sudo rsync -avz ${project_name}-frontend-docker-image-${version}.tar <user>@<ip>:/home/<user>/\""
echo "加载镜像文件可以使用: \"sudo docker load -i ${project_name}-frontend-docker-image-${version}.tar\""
echo "${project_name}:${version} 项目的脚本结束"
