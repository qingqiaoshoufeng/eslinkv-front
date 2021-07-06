<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
<div class="help-menu pos-f">目录</div>

- [下载示例](#%E4%B8%8B%E8%BD%BD%E7%A4%BA%E4%BE%8B)
- [custom.vue](#customvue)
- [index.component.ts](#indexcomponentts)

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

## custom.vue
```
<template lang="pug">
widget-normal(:value="value", :customConfig="customConfig")
    h2 {{data.title}} {{config.config.test}}
    img(:src="config.config.background")
    p(:style="{color: config.config.color}") hello world
</template>
<script lang="ts">
	import { Component } from 'vue-property-decorator'
	import { mixins } from 'vue-class-component'
	import { value, customConfig } from './index.component'
	import { widgetMixin, widgetNormal } from '@eslinkv/vue2'

    @Component({
    	components:{
    		widgetNormal
    	}
    })
	export default class HelloWorld extends mixins(widgetMixin) {
		value = value
		customConfig = customConfig
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
    type: 'func-image',
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
