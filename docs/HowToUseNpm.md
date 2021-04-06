## 安装

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
