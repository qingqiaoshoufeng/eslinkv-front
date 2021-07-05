<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
<div class="help-menu pos-f">目录</div>

- [安装工具](#%E5%AE%89%E8%A3%85%E5%B7%A5%E5%85%B7)
- [View](#view)
- [Core](#core)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 安装工具

工具包运行于 Node 环境，推荐使用 Node >= 14.15.0 的版本，如果您没有安装 NodeJS，可以进入[NodeJS 官网](https://nodejs.org/)下载并安装。安装成功后，在命令行操作界面执行`node -v`和`npm -v`命令（Mac 在 terminal 中执行，Windows 可中可在 git bash 或 powershell 中执行），查看 Node 和 npm 版本。

```
npm i @eslinkv/vue2 @eslinkv/core
```

## View

```
<template lang="pug">
.home-container
	<!-- 顶部工具条 内部为获取大屏数据并序列化，可设置为不显示 -->
	d-detail(:show="false")
	<!-- 大屏内容 -->
	d-view
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { dScreen, dDetail } from '@eslinkv/vue2'
import '@eslinkv/core/lib/core.css'
import '@eslinkv/vue2/lib/v2.css'

@Component({
	components: { dScreen, dDetail },
})
export default class editor extends Vue {
}
</script>
<style lang="scss">
.home-container {
	height: 100%;
	overflow: hidden;
}
</style>
```

## Core

```javascript
import { Editor } from '@eslinkv/core'

// screen
// 大屏数据

// scene
// 场景数据

// current
// 编辑器当前数据

// ruler
// 标尺参考线数据
```
