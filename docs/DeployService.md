<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
<div class="help-menu pos-f">目录</div>

- [所需环境](#%E6%89%80%E9%9C%80%E7%8E%AF%E5%A2%83)
- [下载](#%E4%B8%8B%E8%BD%BD)
- [安装依赖](#%E5%AE%89%E8%A3%85%E4%BE%9D%E8%B5%96)
- [启动命令](#%E5%90%AF%E5%8A%A8%E5%91%BD%E4%BB%A4)
- [配置文件](#%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6)
- [配置项](#%E9%85%8D%E7%BD%AE%E9%A1%B9)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 所需环境
node >= 14.15.1 [如何安装node环境](/help/HowToDeployNode)

mongodb >= 3.4 [如何安装node环境](/help/HowToDeployMongodb)

egg >= 2.15.1 [egg官网](https://eggjs.org/)

## 下载
```
git clone http://10.200.1.145/framework/web/es-lab/eslink-v/dvdp-expand-node.git
```

## 安装依赖
```
npm i 
```

## 启动命令
```
npm start // 生产环境启动
npm stop // 生产环停止
npm run test // 测试环境启动
npm run stopTest // 测试环境启动
```

## 配置文件
```
config/config.default.js // 默认配置
config/config.local.js // 本地配置
config/config.prod.js // 生产环境配置
config/config.test.js // 测试环境配置
config/plugin.js // 插件配置
```
配置为叠加在一起

例如你当前环境为`测试环境`那么你的配置是`config/config.default.js`+`config/config.test.js`

## 配置项
```javascript
const path = require('path')

module.exports = appInfo => {
	const config = {}
	
	config.keys = appInfo.name + '_1491794325123_604'
	
	// log地址
	config.logger = {
		appLogName: 'app.log',
		coreLogName: 'core.log',
		agentLogName: 'agent.log',
		errorLogName: 'error.log',
	}

	// 中间件配置
	config.middleware = ['errorHandler', 'notfoundHandler']

	// security模块配置
	config.security = {
		csrf: false,
	}

	// multipart模块配置
	config.multipart = {
		mode: 'stream',
		fileExtensions: ['.webm'],
	}

	// session模块配置
	config.session = {
		renew: true,
	}

	// mongodb配置
	config.mongoose = {
		url: 'mongodb://*****:*****@127.0.0.1/test',
		options: {
			useUnifiedTopology: true,
		},
	}

	// cors配置
	config.cors = {
		origin: '*',
		allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
	}

	// 静态资源配置
	config.static = {
		dir: [
			path.join(appInfo.baseDir, 'app/public'),
			path.join(appInfo.baseDir, 'app/public/upload'),
		],
		prefix: '/',
	}

	// swagger文档配置
	config.swaggerdoc = {
		dirScanner: './app/controller', // 配置自动扫描的控制器路径。
		apiInfo: {
			title: 'EslinkV',
			description: 'swagger-ui for EslinkV document.',
			version: '1.0.0',
		},
		schemes: ['http'], // 配置支持的协议。
		consumes: ['application/json'], // 指定处理请求的提交内容类型（Content-Type），例如application/json, text/html。
		produces: ['application/json'], // 指定返回的内容类型，仅当request请求头中的(Accept)类型中包含该指定类型才返回。
		enableSecurity: false, // 是否启用授权，默认 false（不启用）。
		// enableValidate: true,    // 是否启用参数校验，默认 true（启用）。
		routerMap: false, // 是否启用自动生成路由，默认 true (启用)。
		enable: true, // 默认 true (启用)。
	}

	// cluster配置
	config.cluster = {
		listen: {
			path: '',
			port: 7001,
			hostname: '0.0.0.0',
		},
	}
	
	return config
}
```
