<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
<div class="help-menu pos-f">目录</div>

- [下载示例](#%E4%B8%8B%E8%BD%BD%E7%A4%BA%E4%BE%8B)
- [安装cli](#%E5%AE%89%E8%A3%85cli)
- [打包&上传组件](#%E6%89%93%E5%8C%85%E4%B8%8A%E4%BC%A0%E7%BB%84%E4%BB%B6)
- [上传组件](#%E4%B8%8A%E4%BC%A0%E7%BB%84%E4%BB%B6)
- [打包组件](#%E6%89%93%E5%8C%85%E7%BB%84%E4%BB%B6)
- [目录规范](#%E7%9B%AE%E5%BD%95%E8%A7%84%E8%8C%83)
- [custom.vue](#customvue)
- [index.component.ts](#indexcomponentts)
- [esp-config.js](#esp-configjs)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 下载示例
```
git clone http://10.200.1.145/framework/web/es-lab/eslink-v/eslinkv-template.git
```

```
cd eslinkv-template && npm install
```

```
npm run serve
```

## 安装cli

工具包运行于Node环境，推荐使用 Node >= 14.15.0 的版本，如果您没有安装NodeJS，可以进入[NodeJS官网](https://nodejs.org/)下载并安装。安装成功后，在命令行操作界面执行`node -v`和`npm -v`命令（Mac在terminal中执行，Windows可中可在git bash或powershell中执行），查看Node和npm版本。
```
npm i eslinkv-cli -g
```
安装完成后，执行`esp --version`查看工具包版本。

## 打包&上传组件
```
esp submit/npm run submit
```

## 上传组件
```
esp upload
```

## 打包组件
```
esp build
```


## 目录规范

项目必须指定组件目录（默认为packages），一个组件目录下可以有多个组件，组件以文件夹为单位，在开发组件时，请遵循以下规范。
以组件文件夹（e-hello ）为例

> 每个组件必须包含一个`index.js`入口文件
>
> 每个组件必须包含一个`custom.vue`视图文件
>
> 每个组件必须有`index.component.ts/js`配置文件

```
|- examples                      // 本地开发演示主目录
|- |- App.vue                    // 组件容器，包含截图等附加功能
|- |- main.ts                    // 入口ts文件
|- |- shims-tsx.d.ts             // ts相关配置
|- |- shims-vue.d.ts             // ts相关配置
|- |- shims-vue.d.ts             // ts相关配置
|- └- vue.d.ts                   // ts相关配置
|- packages                      // 开发主目录
|- |- e-hello                    // 单个组件目录
|- |- |- custom.vue              // ★自定义组件
|- |- |- index.component.ts      // ★自定义组件配置文件
|- └---- index.js                // 打包文件
|- public                        // 网站静态文件
|- └---- ……                      
|- └- index.html           
|- esp-config.js                 // ★eslinkv-cli配置文件   
```

## custom.vue
```
<template lang="pug">
  .widget-part(:style="styles" v-if="data")
    h2 {{data.title}} {{config.config.test}}
    img(:src="config.config.background")
    p(:style="{color: config.config.color}") hello world
</template>
<script lang="ts">
	import { Component } from 'vue-property-decorator'
	import { mixins } from 'vue-class-component'
	import { value, customConfig } from './index.component'
	import { widgetMixin } from 'eslinkv-sdk'

    @Component
	export default class HelloWorld extends mixins(widgetMixin) {
		// 这个方法是将index.component.ts文件中的配置传入到该组件中，不可少
		created () {
			this.configValue = this.parseConfigValue(value, customConfig)
		}
	}
</script>
<style lang="scss" scoped>
h2 {
  font-size: 24px;
  font-weight: 600;
}

p {
  margin-top: 10px;
  border: 1px solid olivedrab;
}
</style>
```
## index.component.ts
```ts
// 组件中文名唯一
export const name = '测试组件e-hello'
// 组件名唯一
export const type = 'e-hello'
// 打包代码时
// 检测当前组件名，版本唯一，类似npm发布策略
export const version = '1.0.0'
// 自定义配置
export const customConfig = [
  {
    prop: 'test',
    label: '测试',
    type: 'func-image'
  },
  {
    prop: 'background',
    label: '背景图片',
    type: 'func-background',
    options: [
      '/static/h-title3-1.svg',
      '/static/h-title3-2.svg',
      '/static/h-title3-3.svg',
      '/static/h-title3-4.svg'
    ]
  },
  {
    prop: 'color',
    label: '测试颜色',
    type: 'func-color'
  }
]
// 配置
export const value = {
  api: {
    // 接口请求数据默认值
    data: JSON.stringify({ title: 'Title' })
  },
  layout: {
    // 宽高
    size: {
      width: 480,
      height: 160
    },
    position: {
      value: 'relative'
    }
  },
  // 自定义配置默认值
  config: {
    background: '/static/h-title3-1.svg',
    test: 'World',
    color: ''
  },
  widget: {
    componentVersion: version
  }
}
```
## esp-config.js
```javascript
module.exports = {
    domain: 'http://eslinkv.eslink.cc/node/', // cli 接口 domain 设置
    appKey: '******', // AppKey
    include: [], // 只上传哪些组件
    exclude: [], // 不上传哪些组件
}
```

> [appKey/appSecret 申请使用查看密钥管理相关文档](/help/HowToSecretKey)
