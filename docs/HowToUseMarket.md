## 下载示例
```
git clone http://10.200.1.145/framework/web/es-lab/dvdp-expand-example
```

```
cd dvdp-expand-example&& npm install
```

```
npm run serve
```

## 安装cli
```
npm i eslinkv-cli -g
```

## 上传组件
```
esp submit/npm run submit
```

## 目录
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
|- |- eslinkv-npm                // ★eslinkv-npm插件包   
|- |- |- eslinkv-npm.umd.min.js                
|- └---- ……                      
|- └- index.html           
|- esp-config.json               // ★eslinkv-cli配置文件   
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
	import { widgetMixin } from 'eslinkv-npm'

    @Component
	export default class HelloWorld extends mixins(widgetMixin) {
		// 这个方法是将index.component.ts文件中的配置传入到该组件中，不可少

		// 我们现在直接修改下mysql，模拟下打包发布组件的过程
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
```
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
