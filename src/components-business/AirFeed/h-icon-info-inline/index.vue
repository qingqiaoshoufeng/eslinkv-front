<template>
	<div class="widget-part" :style="styles">
		<div
			class="icon"
			:style="`background-image: url(${
				config.config && config.config.icon
			})`"
		></div>
		<div class="info">{{ config.config && config.config.text }}</div>
		<div class="number font-num">{{ data && data.count }}</div>
	</div>
</template>
<script>
const { widgetMixin } = eslinkV
import { customConfig, value } from './index.component'

export default {
	mixins: [widgetMixin],
	methods: {},
	computed: {},
	created() {
		this.configValue = this.parseConfigValue(value, customConfig)
	},
}
</script>
<style lang="scss" scoped>
.widget-part {
	display: flex;
	align-items: center;
	background: linear-gradient(
		89.95deg,
		rgba(255, 255, 255, 0.08) 0.04%,
		rgba(255, 255, 255, 0) 100.59%
	);

	.icon {
		width: 64px;
		height: 64px;
		background-size: 100% 100%;
	}

	.info {
		width: 214px;
		margin-left: 24px;
		font-size: 18px;
		line-height: 24px;
		color: #0df;
	}

	.number {
		font-size: 32px;
		font-weight: bold;
		line-height: 32px;
		color: #fff;
	}
}
</style>
