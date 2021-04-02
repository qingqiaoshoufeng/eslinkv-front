<template>
	<div class="widget-part" :style="styles" v-if="data">
		<div class="title">{{ config.config.title }}</div>
		<div class="num font-num">{{ data.count | toThousand }}</div>
	</div>
</template>
<script>
import { widgetMixin } from 'eslinkv-sdk'
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
	.title {
		height: 32px;
		margin-bottom: 8px;
		font-size: 24px;
		line-height: 32px;
		color: #fff;
		background: #0057a9;
		border-right: 6px solid #fff;
		border-left: 6px solid #fff;
	}

	.num {
		width: 100%;
		height: 80px;
		font-size: 48px;
		font-weight: bold;
		line-height: 80px;
		color: #fff;
		text-align: center;
		background: linear-gradient(
			180deg,
			rgba(0, 87, 169, 0.5) 0%,
			rgba(0, 87, 169, 0) 100%
		);
	}
}
</style>
