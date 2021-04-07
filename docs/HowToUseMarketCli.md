## 功能

> 前置要求

需要在项目根目录编写配置文件 esp-config.js

```js
module.exports = {
	domain: 'http://xxxxxxx',
	appKey: 'xxxxxxxxxxxx',
}
```

字段说明:  
domain: 上传到服务器的域名(接口地址)  
appKey: 需要在官网 `密钥管理` 取得密钥

## 使用方法:

-   如果你需要批量上传请使用 esp submit
-   如果你需要发布单个组件请先 cd 到组件的根目录， 执行 esp build 保证打包成功后再执行 esp upload 即可发布单个组件

### create 创建空组件模板 根目录执行

```bash
esp upload
or
esp u
```

### submit 批量提交组件至组件市场 根目录执行

```bash
esp submit
or
esp s
```

### build 打包组件 组件目录执行

```bash
esp build
or
esp b
```

### upload 提交组件至组件市场 组件目录执行

```bash
esp upload
or
esp u
```
