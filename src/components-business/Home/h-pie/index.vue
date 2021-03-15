<template>
	<div class="widget-part" :style="styles" v-if="data">
		<pie
			class="pie"
			:data="data"
			:unit="config.config.unit"
			:text="config.config.title1"
			:subtext="config.config.title2"
			:startAngle="config.config.startAngle"
		></pie>
	</div>
</template>
<script>
	import mixins from 'eslinkv-npm/mixins'
	import pie from './pie'
	import { customConfig, value } from './index.component'

	export default {
		mixins: [mixins],
		components: { pie },
		created () {
			this.configValue = this.parseConfigValue(value, customConfig)
		}
	}
</script>
<style lang="scss" scoped>
	.pie {
		width: 100%;
		height: 100%;
	}
</style>

