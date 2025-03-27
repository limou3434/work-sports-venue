#!/bin/bash
# 运行代理脚本
# 
# @author <a href="https://github.com/xiaogithuboo">limou3434</a>
sudo apt update && sudo apt install -y nginx
config_name="proxy.conf"
project_name=$(basename "$(dirname "$PWD")")
sudo cp "$config_name" "/etc/nginx/sites-available/${project_name}-$config_name"
sudo ln -sf "/etc/nginx/sites-available/${project_name}-${config_name}" "/etc/nginx/sites-enabled/"
sudo systemctl restart nginx
ls -al /etc/nginx/sites-available/
ls -al /etc/nginx/sites-enabled/
echo "脚本结束"
