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
				<div class="pointBox" :style="style">
					<div class="radius"></div>
					<div class="carout_point"></div>
				</div>
				<div class="pointBox" :style="style">
					<div class="radius"></div>
					<div class="carout_point"></div>
				</div>
				<div class="context">
					<div class="value font-num">{{data&&data.value}}</div>
					<div class="desc1">{{data&&data.desc1}}</div>
					<div class="desc2">{{data&&data.desc2}}</div>
				</div>
			</div>
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
			desc1: '抢修3分钟',
            desc2: '出车率',
            rgb1:[1,76,92],
            color:'#002444'
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
			let rotate = (this.data&&this.data.value / 100) * 360;
			return {
				transform: `translateX(-50%) rotate(${rotate}deg)`,
			};
		},
	},
	methods: {
		setOption(data) {
			console.log(options);
			let newData = [];
			let newData1 = [];
			for (var i = 0; i < data.value / 4; i++) {
				console.log(data.value);
				let opcity = 1 - (i * 4) / data.value;
				newData.push({
					value: 4,
					name: '直接访问',
					itemStyle: {
						borderRadius: 100,
                        color: `rgba(${data.rgb1[0]}, ${data.rgb1[1]}, ${data.rgb1[2]},${opcity})`,

					},
				});
				newData1.push({
					value: 4,
					name: '直接访问',
					itemStyle: {
						borderColor: `rgba(${data.rgb1[0]}, ${data.rgb1[1]}, ${data.rgb1[2]},${opcity})`,
						color: `#fff`,
					},
				});
			}
			newData.push({
				value: 100 - data.value,
				name: '邮件营销',
				itemStyle: {
					//颜色渐变
					color: data.color,
				},
			});
			newData1.push({
				value: 100 - data.value,
				name: '邮件营销',
				itemStyle: {
					//颜色渐变
					color: data.color,
				},
			});
			console.log(newData);
			options.series[0].data = newData1;
			options.series[1].data = newData;
			this.instance && this.instance.setOption(options);
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
	.context {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		display: flex;
		flex-direction: column;
		align-items: center;
        justify-content: center;
        color: #fff;
        margin-top: 15px;
		.value {
			font-size: 40px;
			font-weight: 700;
			text-align: center;
		}
		.desc1 {
			font-family: PingFang SC;
			font-size: 16px;
			font-style: normal;
			font-weight: 400;
			line-height: 20px;
			letter-spacing: 0px;
            text-align: center;
            margin-top: 10px;
            opacity: 0.75;
		}
		.desc2 {
			font-family: PingFang SC;
			font-size: 16px;
			font-style: normal;
			font-weight: 400;
			line-height: 20px;
			letter-spacing: 0px;
            text-align: center;
            opacity: 0.75;
		}
	}
}
.carout-canvas-box {
	position: absolute !important;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
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

