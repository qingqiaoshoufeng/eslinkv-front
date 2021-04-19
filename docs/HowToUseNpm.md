<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
<div class="help-menu pos-f">目录</div>

- [安装工具](#%E5%AE%89%E8%A3%85%E5%B7%A5%E5%85%B7)
- [VIEW](#view)
- [STORE](#store)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 安装工具

工具包运行于Node环境，推荐使用 Node >= 14.15.0 的版本，如果您没有安装NodeJS，可以进入[NodeJS官网](https://nodejs.org/)下载并安装。安装成功后，在命令行操作界面执行`node -v`和`npm -v`命令（Mac在terminal中执行，Windows可中可在git bash或powershell中执行），查看Node和npm版本。
```
npm i eslinkv-sdk
```

## VIEW

```
<template lang="pug">
.home-container
	<!-- 顶部操作条 -->
	d-detail
	<!-- 大屏 -->
	d-screen
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { dScreen, dDetail, market } from 'eslinkv-sdk'

@Component({
	components: { dScreen, dDetail },
})
export default class editor extends Vue {
	mounted() {
		market()
	}
}
</script>
<style lang="scss">
.home-container {
	height: 100%;
	overflow: hidden;
}
</style>
```

## STORE

```javascript
import { platform, scene, instance, custom, event } from 'eslinkv-sdk'

// platform
// 大屏配置信息

// scene
// 场景配置信息

// instance
// 实例配置信息

// custom
// 自定义组件信息

// event
// 自定义事件信息
```
