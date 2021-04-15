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
![](/node/docs-static/HowToDeployNginx-1.png)

