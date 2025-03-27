#!/bin/bash
# 停止代理脚本
# 
# @author <a href="https://github.com/xiaogithuboo">limou3434</a>
project_name=$(basename "$(dirname "$PWD")")
config_name="proxy.conf"
sudo systemctl stop nginx
sudo rm -f "/etc/nginx/sites-available/${project_name}-${config_name}"
sudo rm -f "/etc/nginx/sites-enabled/${project_name}-${config_name}"
ls -al /etc/nginx/sites-available/
ls -al /etc/nginx/sites-enabled/
echo "脚本结束"
