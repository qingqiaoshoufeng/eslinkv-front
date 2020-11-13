<template>
	<div class="widget-part pos-r" :style="styles">
		<div class="a-inspectionConfig fn-flex">
			<div class="video-box">
				<video
					:src="config.config && config.config.videoUrl"
					controls="controls"
					autoplay="autoplay"
					muted="muted"
					loop
				></video>
			</div>
			<div class="context">
				<div class="inspection-value font-num">
					{{ data && data.value }}
				</div>
				<div class="inspection-desc">
					{{ config.config && config.config.desc }}
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import mixins from '../../mixins';
import { getInput, getSelect } from '../../../../lib';
// 组件配置项
const config = {
	animation: true,
	config: {
		desc: true,
		videoUrl: true,
	},
};
// 组件选择框配置
const configSource = {
	config: {
		fields: {
			desc: getInput('desc', '描述'),
			videoUrl: getSelect('videoUrl', '图片地址', [
				'/static/images/airfeed/car.webm',
				'/static/images/airfeed/people.webm',
			]),
		},
	},
};
const value = {
	api: {
		data: JSON.stringify({
			value: 298,
		}),
	},
	config: {
		desc: '客户事故数(件)',
		videoUrl: '/static/images/airfeed/car.webm',
	},
};
export default {
	mixins: [mixins],
	methods: {},
	created() {
		this.configSource = this.parseConfigSource(config, configSource);
		this.configValue = this.parseConfigValue(config, value);
	},
};
</script>
<style lang="scss">
.a-inspectionConfig {
	height: 200px;
	width: 497px;

	video::-webkit-media-controls {
		display: none !important;
	}

	video {
		margin-left: 22px;
		height: 200px !important;
		width: 240px;
		flex: none;
	}

	.context {
		width: 100%;
		padding-top: 85px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		height: 100%;
		margin-left: 50px;

		.inspection-value {
			text-align: left;
			font-size: 40px;
			color: #fff;
		}

		.inspection-desc {
			margin-top: 13px;
			width: 150px;
			height: 32px;
			line-height: 32px;
			font-size: 20px;
			white-space: nowrap;
			color: #00DDFF;
			text-align: center;
		}
	}
}
</style>

