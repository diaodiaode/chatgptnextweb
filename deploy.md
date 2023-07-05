[配置]
一些常用的配置如api key、数据库连接、关键字、访问密码
可在.env.local文件中找到(如果没有则需要手动创建)
格式如下:
OPENAI_API_KEY=xxxxx
MONGODB_URI=xxxx
CODE=1,2,3
KEYWORDS=监督抽检,召回通报,比较试验,质量安全,合格率,监督抽查,款数,批次,广东,广州,深圳,珠海,中山,上海,宁波,浙江,江苏,南通,温州,无锡,台州,汕头

[build]
部署方式一共2种：独立部署和源码部署
无论哪一种部署方式均需要先执行build(需要先配置.env.local文件)，生成的文件在.next目录

[静态资源访问配置]
由于该nextjs服务器仅public目录具有有限的静态文件访问能力
因此完成后需要使用nginx代理static目录的静态文件访问
nginx配置类似如下:
server {
    listen 80;
    server_name localhost;
    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-$http_x_custom_header $http_x_custom_header;
        proxy_set_header X-Real-IP $remote_addr;
    }
    location /_next/static/ {
        alias .../.next/static/;
    }
}

[1.源码部署]
当然，由于在不同的操作系统上部署时需要安装对应的依赖同时也需要build，所以使用源码部署也行：
先运行build再执行npm run start,然后使用nginx配置.next/static的静态文件访问（参见[静态资源访问配置]）

[2.独立部署]
在执行build后，执行pub.sh脚本，将输出.next-standalone目录
配置.next-standalone/static的静态资源访问（参见[静态资源访问配置]）
启动后端：在.next-standalone目录执行node server.js