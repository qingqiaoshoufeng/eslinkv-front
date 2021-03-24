
<template>
	<div class="widget-part pos-r" :style="styles">
		<div class="accident-box">
			<div class="video-box">
				<video
					src="/static/images/serves/accident.webm"
					controls="controls"
					autoplay="autoplay"
					muted="muted"
					loop
				></video>
			</div>

			<div class="context">
				<div class="accident-value font-num">{{ data && data.value }}</div>
				<div class="accident-desc">{{ data && data.desc }}</div>
			</div>
		</div>
	</div>
</template>
<script>
	import { widgetMixin } from 'eslinkv-npm'
	import { value } from './index.component'

	export default {
		mixins: [widgetMixin],
		methods: {},
		created () {
			this.configValue = this.parseConfigValue(value)
		}
	}
</script>
<style lang="scss">
.accident-box {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 340px;
	height: 160px;

	video::-webkit-media-controls {
		display: none !important;
	}

	video {
		flex: none;
		width: 160px;
		height: 160px;
		margin-left: 22px;
	}

	.context {
		display: flex;
		flex-direction: column;
		justify-content: center;
		width: 100%;
		height: 100%;
		margin-left: 50px;

		.accident-value {
			padding-left: 8px;
			font-size: 48px;
			color: #ff7217;
			text-align: left;
		}

		.accident-desc {
			width: 150px;
			height: 32px;
			margin-top: 13px;
			font-size: 20px;
			font-style: normal;
			font-weight: normal;
			line-height: 32px;
			color: #fff;
			text-align: center;
			background-color: #001f6d;
		}
	}
}
</style>

