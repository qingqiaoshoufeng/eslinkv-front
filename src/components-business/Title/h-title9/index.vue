<template>
	<div class="widget-part" :style="styles">
		<div class="h-title-9">
			<p class="pos-r text-left">
				{{ config.config && config.config.title }}
			</p>
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
<style lang="scss">
.h-title-9 {
	height: 100%;
	background: linear-gradient(
		90deg,
		rgba(0, 87, 169, 0.4) 0%,
		rgba(0, 87, 169, 0) 100%
	);

	p {
		padding-left: 12px;
		font-size: 20px;
		font-weight: 600;
		line-height: 40px;
		color: #fff;

		&::before {
			position: absolute;
			top: 0;
			left: 0;
			width: 4px;
			height: 40px;
			content: '';
			background: #0df;
		}
	}
}
</style>
