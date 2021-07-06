<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
<div class="help-menu pos-f">目录</div>

- [安装cli](#%E5%AE%89%E8%A3%85cli)
- [cli配置](#cli%E9%85%8D%E7%BD%AE)
- [打包单个组件](#%E6%89%93%E5%8C%85%E5%8D%95%E4%B8%AA%E7%BB%84%E4%BB%B6)
- [上传单个组件](#%E4%B8%8A%E4%BC%A0%E5%8D%95%E4%B8%AA%E7%BB%84%E4%BB%B6)
- [全组件打包&上传组件](#%E5%85%A8%E7%BB%84%E4%BB%B6%E6%89%93%E5%8C%85%E4%B8%8A%E4%BC%A0%E7%BB%84%E4%BB%B6)
- [自定义打包](#%E8%87%AA%E5%AE%9A%E4%B9%89%E6%89%93%E5%8C%85)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 安装cli

> 工具包运行于Node环境，推荐使用 Node >= 14.15.0 的版本，如果您没有安装NodeJS，可以进入[NodeJS官网](https://nodejs.org/)下载并安装。安装成功后，在命令行操作界面执行`node -v`和`npm -v`命令（Mac在terminal中执行，Windows可中可在git bash或powershell中执行），查看Node和npm版本。
```
npm i @eslinkv/cli -g
```
mac 使用如下
```
sudo npm i @eslinkv/cli -g  --unsafe-perm=true --allow-root
```
安装完成后，执行`esp -v`查看工具包版本。

## cli配置
esp-config.js
```javascript
module.exports = {
    domain: 'http://eslinkv.eslink.cc/node/', // cli 接口 domain 设置
    appKey: '******', // AppKey
    include: [], // 只上传哪些组件
    exclude: [], // 不上传哪些组件
}
```

> [appKey/appSecret 申请使用查看密钥管理相关文档](/help/HowToSecretKey)

## 打包单个组件
```
cd 组件目录 && esp build
```
一般组件限制在1m以内，如果你要打包大于1m的组件请使用`--no-max`
```
cd 组件目录 && esp build --no-max
```
## 上传单个组件
```
cd 组件目录 && esp upload
```

## 全组件打包&上传组件
```
esp submit
```
## 自定义打包
> 如果你想自定义打包，我们提供的打包无法满足你的需要，也是可以的
>
> 你在配置中需要添加如下
>
> 排除打包部分，否则会造成包特别大
>
> 然后用esp upload上传，使用工具上传时，注意固定上传目录格式

```javascript
config.externals = [
	{
		vue: 'Vue',
		'@eslinkv/core': 'eslinkV',
		'@eslinkv/vue2': 'eslinkV',
		'vue-router': 'VueRouter',
		echarts: 'echarts',
		'vue-class-component': 'VueClassComponent',
	},
]
```
