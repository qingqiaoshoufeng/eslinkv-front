<template>
	<div class="widget-part" :style="styles" v-if="data">
		<div class="color"></div>
		<div class="title">{{ config.config.title }}</div>
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

	.color {
		width: 6px;
		height: 28px;
		margin-right: 8px;
		background: #0df;
		transform: skewY(30deg);
	}

	.title {
		font-size: 24px;
		font-weight: 600;
		color: #fff;
	}
}
</style>
