<template>
	<div class="widget-part" :style="styles">
		<div class="project-flex">
			<div class="title">{{ config.config && config.config.desc }}</div>
			<div class="value font-num">{{ data && data.value }}</div>
		</div>
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
<style lang="scss">
.project-flex {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	height: 120px;

	.title {
		width: 240px;
		height: 40px;
		padding-left: 16px;
		font-size: 24px;
		line-height: 40px;
		color: #0df;
		text-align: left;
		background: linear-gradient(
			90deg,
			#00217d 0%,
			rgba(0, 33, 125, 0.0001) 100%
		);
		border-left: 2px solid #0df;
	}

	.value {
		width: 240px;
		height: 72px;
		padding-left: 16px;
		font-size: 40px;
		font-weight: 700;
		line-height: 72px;
		color: #fff;
		text-align: left;
		background: #000f58;
		background-image: url('/static/images/project/value-bg.svg');
	}
}
</style>
