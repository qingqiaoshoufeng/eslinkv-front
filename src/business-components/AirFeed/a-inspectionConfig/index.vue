<template>
	<div class="widget-part pos-r" :style="styles">
		<div class="a-inspectionConfig fn-flex">
			<div class="video-box">
				<video
					:src="data&&data.videoUrl"
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

	const config = {animation: true};
	const value = {
		api: {
			data: JSON.stringify({
				desc: '客户事故数(件)',
				value: 298,
				videoUrl: '/static/images/airfeed/car.webm'
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

