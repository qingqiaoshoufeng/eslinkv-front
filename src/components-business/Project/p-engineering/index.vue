<template>
	<div class="widget-part pos-r" :style="styles">
		<div class="engineering-box">
			<video
				src="/static/images/project/engineering.webm"
				controls="controls"
				autoplay="autoplay"
				muted="muted"
				loop
			></video>
			<div class="engineering-value font-num">
				{{ data && data.value }}
			</div>
			<div class="engineering-desc">
				{{ config.config && config.config.desc }}
			</div>
		</div>
	</div>
</template>
<script>
	import { widgetMixin } from 'eslinkv-sdk'
	import { value, customConfig } from './index.component'

	export default {
		mixins: [widgetMixin],
		methods: {},
		created () {
			this.configValue = this.parseConfigValue(value, customConfig)
		}
	}
</script>
<style lang="scss">
	.engineering-box {
		position: relative;
		width: 340px;
		height: 150px;

		video::-webkit-media-controls {
			display: none !important;
		}

		.engineering-value {
			position: absolute;
			top: 0;
			left: 0;
			width: 150px;
			height: 150px;
			font-size: 48px;
			line-height: 150px;
			color: #fff;
			text-align: center;
		}

		.engineering-desc {
			position: absolute;
			top: 0;
			left: 170px;
			height: 150px;
			font-size: 20px;
			font-style: normal;
			font-weight: normal;
			line-height: 150px;
			color: #fff;
		}
	}
</style>

