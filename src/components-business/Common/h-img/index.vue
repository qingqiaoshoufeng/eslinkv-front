<template>
	<div class="widget-part pos-r" :style="styles">
		<div class="h-img">
			<img :src="config.config&&config.config.img" alt=""/>
		</div>
	</div>
</template>
<script>
	import mixins from 'eslinkv-npm/mixins'
	import {customConfig, value} from './index.component'

	export default {
		mixins: [mixins],
		created() {
			this.configValue = this.parseConfigValue(value, customConfig)
		}
	}
</script>
<style lang="scss" scoped>
	.h-img {
		height: 100%;
		width: 100%;

		img {
			width: 100%;
			height: 100%;
		}
	}
</style>

