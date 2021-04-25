<template>
	<div class="widget-part" :style="styles" v-if="data">
		<div class="title">{{ config.config.title }}</div>
		<div class="num font-num" :style="{ color: config.config.numColor }">
			{{ data.num }}
		</div>
	</div>
</template>
<script>
const { widgetMixin } = eslinkV
import { customConfig, value } from './index.component'

export default {
	mixins: [widgetMixin],
	created() {
		this.configValue = this.parseConfigValue(value, customConfig)
	},
}
</script>
<style lang="scss" scoped>
.widget-part {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 8px;
	background: url('./border.svg') no-repeat;
	background-size: 100% 100%;

	.title {
		font-size: 24px;
		line-height: 24px;
		color: #0df;
	}

	.num {
		font-size: 40px;
		font-weight: bold;
		color: #feffff;
	}
}
</style>
