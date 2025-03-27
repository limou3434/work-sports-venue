#!/bin/bash
# 魔法代理脚本
#
# @author <a href="https://github.com/xiaogithuboo">limou3434</a>
cat <<EOF >> ~/.bashrc

export HTTP_PROXY="http://10.10.174.75:7890"
export HTTPS_PROXY="http://10.10.174.75:7890"
export NO_PROXY="localhost,127.0.0.1,10.96.0.0/12,192.168.59.0/24,192.168.49.0/24,192.168.39.0/24"

export http_proxy="http://10.10.174.75:7890"
export https_proxy="http://10.10.174.75:7890"
export no_proxy="localhost,127.0.0.1,10.96.0.0/12,192.168.59.0/24,192.168.49.0/24,192.168.39.0/24"
EOF

source "$HOME/.bashrc"

git config --global http.proxy "http://10.10.174.75:7890"
git config --global https.proxy "http://10.10.174.75:7890"

echo "脚本结束"
