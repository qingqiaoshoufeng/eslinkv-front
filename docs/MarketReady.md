## 安装cli

工具包运行于Node环境，推荐使用 Node >= 14.15.0 的版本，如果您没有安装NodeJS，可以进入[NodeJS官网](https://nodejs.org/)下载并安装。安装成功后，在命令行操作界面执行`node -v`和`npm -v`命令（Mac在terminal中执行，Windows可中可在git bash或powershell中执行），查看Node和npm版本。
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

## 全组件打包&上传组件
```
esp submit
```

## 打包单个组件
```
cd 组件目录&&esp build
```

## 上传单个组件
```
cd 组件目录&&esp upload
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
