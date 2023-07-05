#!/bin/bash

# 以下的代码用于生成独立部署所需的文件

# 文件夹路径
folder_path="./.next-standalone"
# 删除文件夹（如果存在）
if [ -d "$folder_path" ]; then
  rm -r "$folder_path"
fi
# 服务器代码
cp -r ./.next/standalone "$folder_path"
# 复制文件
cp package.json "$folder_path/package.json"
cp yarn.lock "$folder_path/yarn.lock"
cp .env.local "$folder_path/.env.local"
# 复制文件夹
cp -r ./public "$folder_path/public"
cp -r ./.next/static "$folder_path/static"

# cp -r ./.next/server "$folder_path/.next/server"