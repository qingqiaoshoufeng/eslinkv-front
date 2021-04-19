<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
<div class="help-menu pos-f">目录</div>

- [配置如下](#%E9%85%8D%E7%BD%AE%E5%A6%82%E4%B8%8B)
- [部署成功](#%E9%83%A8%E7%BD%B2%E6%88%90%E5%8A%9F)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 配置如下
```
server{
	listen 3000;
	charset      utf-8;
	# 网页页面
	server_name  localhost;
        location /{
        # 网页端 最后的打包地址
		root /usr/local/project/****/dist;
		proxy_set_header   Host $host;
		proxy_set_header   X-Real-IP        $remote_addr;
		proxy_set_header   X-Forwarded-For  $proxy_add_x_forwarded_for;
		index index.html;
		try_files $uri $uri/ /index.html;
	}
	location ~ ^/cdn{
		# 服务端静态资源
		proxy_pass http://127.0.0.1:7002;
	}	
	location ~ ^/server{
		# 你的业务服务
		rewrite ^/server/(.*)$ /$1 break;
		proxy_pass http://url;
	}
	location ~ ^/node {
		# 服务端接口
		rewrite ^/node/(.*)$ /$1 break;
		proxy_pass http://127.0.0.1:7002;
	}
}
```

## 部署成功
按照如上配置的话，我们打开`http://ip:3000`
你看到登录就证明部署成功啦～恭喜你！
![](/node/docs-static/DeployNginx-1.jpg)

