<template>
	<div class="widget-part" :style="styles">
		<div
			class="icon"
			:style="`background-image: url(${
				config.config && config.config.icon
			})`"
		></div>
		<div class="num">
			{{ data && data.num }}{{ config.config && config.config.suffix }}
		</div>
		<div class="text">{{ config.config && config.config.text }}</div>
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
	text-align: center;

	.icon {
		width: 122px;
		height: 110px;
		margin: 0 auto 40px;
		background-size: 100% 100%;
	}

	.num {
		margin-bottom: 12px;
		font-size: 28px;
		font-weight: bold;
		line-height: 28px;
		color: #feffff;
	}

	.text {
		font-size: 20px;
		font-weight: normal;
		line-height: 24px;
		color: #0df;
	}
}
</style>
