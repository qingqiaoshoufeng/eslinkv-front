<template>
	<div class="widget-part" :style="styles" v-if="data">
		<div class="num font-num">{{ data.value }}</div>
		<div class="desc">{{ config.config.desc }}</div>
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
	.num {
		padding-left: 18px;
		font-size: 48px;
		font-weight: bold;
		line-height: 48px;
		color: #fff;
		text-align: left;
	}

	.desc {
		width: 228px;
		height: 32px;
		padding-left: 18px;
		margin-top: 4px;
		font-size: 24px;
		line-height: 32px;
		color: #0df;
		text-align: left;
		background: linear-gradient(
			90deg,
			#004d96 0%,
			rgba(0, 77, 150, 0.3) 100%
		);
		border-radius: 16px;
	}
}
</style>
