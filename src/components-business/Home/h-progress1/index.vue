<template>
	<div class="widget-part" :style="styles" v-if="data">
		<div class="fn-flex flex-row h-progress-1">
			<div class="fn-flex flex-column">
				<h2>{{ config.config.title }}</h2>
				<h3 class="font-num">
					{{ data.value | toThousand }}
					<span class="unit">{{ config.config.unit }}</span>
				</h3>
			</div>
			<p class="font-num">{{ data.percent }}%</p>
			<div class="pos-a h-progress-1-ratio">
				<i class="pos-a" :style="{ width: `${data.percent}%` }"></i>
			</div>
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
.h-progress-1-ratio {
	bottom: 0;
	left: 0;
	width: 100%;
	height: 4px;
	background: rgba(255, 255, 255, 0.3);

	i {
		top: 0;
		left: 0;
		height: 4px;

		&::before {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 4px;
			content: '';
			background: linear-gradient(
				270deg,
				#0df 1.23%,
				rgba(0, 221, 255, 0.2) 100%
			);
		}
	}
}

.h-progress-1 {
	padding-bottom: 8px;

	h2 {
		font-size: 18px;
		font-weight: normal;
		line-height: 24px;
		color: #0df;
		text-align: left;
		word-wrap: break-word;
		white-space: nowrap;
	}

	h3 {
		margin-top: 4px;
		font-size: 24px;
		font-weight: bold;
		line-height: 24px;
		color: #fff;
		text-align: left;
		word-wrap: break-word;
		white-space: nowrap;

		.unit {
			font-family: inherit;
			font-size: 16px;
			line-height: 16px;
			color: rgba(255, 255, 255, 0.75);
		}
	}

	p {
		margin-left: auto;
		font-size: 48px;
		font-weight: bold;
		line-height: 48px;
		color: #fff;
	}
}
</style>
