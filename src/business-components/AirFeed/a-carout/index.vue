<template>
	<div class="widget-part" :style="styles">
		<div class="carout-bg">
			<video
				src="/static/images/airfeed/carout01.webm"
				controls="controls"
				autoplay="autoplay"
				muted="muted"
				loop
				class="video"
			></video>
			<div class="carout-canvas-box">
				<div class="carout-canvas" :id="id" />
			</div>
		</div>

		<div class="pointBox" :style="style">
			<div class="radius"></div>
			<div class="carout_point"></div>
		</div>
	</div>
</template>
<script>
import mixins from '../../mixins';
import options from './options';
const config = { animation: true };
const value = {
	api: {
		data: JSON.stringify({
			value: 96,
		}),
	},
};
export default {
	mixins: [mixins],
	created() {
		this.configSource = this.parseConfigSource();
		this.configValue = this.parseConfigValue({ animation: true }, value);
	},
	computed: {
		style() {
			let rotate = (this.data.value / 100) * 360;
			return {
				transform: `translateX(-50%) rotate(${rotate}deg)`,
			};
		},
	},
	methods: {
		setOption(data) {
			console.log(options);
			let newData = [];
			for (var i = 0; i < data.value / 4; i++) {
				console.log(data.value);
				let opcity = 1 - (i * 4) / data.value;
				newData.push({
					value: 4,
					name: '直接访问',
					itemStyle: {
						borderWidth: 0,
						borderColor: `rgba(1, 76, 92,${opcity})`,
						borderRadius: 100,
						color: `rgba(1, 76, 92,${opcity})`,
					},
				});
			}
			newData.push({
				value: 100 - data.value,
				name: '邮件营销',
				itemStyle: {
					//颜色渐变
					color: '#01134C',
				},
			});
			console.log(newData);
			options.series[0].data = newData;
			this.instance && this.instance.setOption(options);
		},
		getEndPoint() {
			console.log(this.data.value);
			let val = this.data.value;
			const angle = (180 * val) / 50 / 2;
			const pointStart = [
				0.5 - 0.5 * Math.cos(angle) * Math.sin(angle),
				0.5 + 0.5 * Math.cos(angle) * Math.cos(angle),
			];
			// 渐变终点
			const pointEnd = [
				0.5 - 0.5 * Math.sin(angle),
				0.5 + 0.5 * Math.cos(angle),
			];
			return pointEnd;
		},
	},
	watch: {
		data: {
			handler(val) {
				if (this.id) {
					const data = { ...val };
					this.$nextTick(() => {
						this.instance = echarts.init(
							document.getElementById(this.id)
						);
						this.setOption(data);
					});
				}
			},
			deep: true,
			immediate: true,
		},
	},
};
</script>
<style lang="scss">
.carout-bg {
	width: 200px;
	height: 200px;
	position: relative;
	video::-webkit-media-controls {
		display: none !important;
	}
	.video {
		width: 200px !important;
		height: 200px !important;
	}
}
.carout-canvas-box {
	position: absolute !important;
	.carout-canvas {
		margin-top: 2px;
		width: 160px;
		height: 160px;
	}
}

.pointBox {
	height: 160px;
	width: 10px;
	// background: #fff;
	position: absolute;
	top: 0;
	left: 50%;
	// transform: translateX(-50%) !important;
	opacity: 1;
	.carout_point {
		width: 10px;
		height: 10px;
		background: #fff;
		position: absolute;
		bottom: -4px;
		border-radius: 10px;
	}
}
</style>

