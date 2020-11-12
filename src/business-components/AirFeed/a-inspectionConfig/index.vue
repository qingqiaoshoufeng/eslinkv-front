
<template>
	<div class="widget-part pos-r" :style="styles">
		<div class="inspection-box">
			<div class="video-box">
				<video
					src="/static/images/airfeed/car.webm"
					controls="controls"
					autoplay="autoplay"
					muted="muted"
					loop
				></video>
			</div>

			<div class="context">
				<div class="inspection-value font-num">{{data&&data.value}}</div>
				<div class="inspection-desc">{{data&&data.desc}}</div>
			</div>
		</div>
	</div>
</template>
<script>
import mixins from '../../mixins';
// import options from './options'

const config = { animation: true };
const value = {
	api: {
		data: JSON.stringify({
			desc: '客户事故数(件)',
			value: 298,
		}),
	},
};
export default {
	mixins: [mixins],
	methods: {},
	created() {
		this.configSource = this.parseConfigSource(config);
		this.configValue = this.parseConfigValue(config, value);
	},
};
</script>
<style lang="scss" scope>
.inspection-box {
	height: 200px;
	width: 497px;
	display: flex;
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
			padding-left: 8px;
		}
		.inspection-desc {
			margin-top: 13px;
			width: 150px;
			height: 32px;
			line-height: 32px;
			font-family: PingFang SC;
			font-style: normal;
			font-weight: normal;
			font-size: 20px;
			color: #00DDFF;
			text-align: center;
		}
	}
}
</style>

