<template>
	<div class="widget-part" :style="styles" v-if="data">
		<div class="carout-bg">
			<video
				:src="config.config.background"
				controls="controls"
				autoplay="autoplay"
				muted="muted"
				loop
				class="video"
			></video>
			<div class="carout-canvas-box">
				<div class="carout-canvas" :id="id"/>
				<div class="pointBox" :style="style">
					<div class="radius"></div>
					<div class="carout_point"></div>
				</div>
				<div class="pointBox" :style="style">
					<div class="radius"></div>
					<div class="carout_point"></div>
				</div>
				<div class="context">
					<div class="value font-num">{{ data.value1 }}%</div>
					<div class="desc1 text-center">{{ desc1 }}</div>
					<div class="desc2 text-center">
						{{ config.config.desc2 }}
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import mixins from '../../../../lib/mixins'
	import options from './options';
	import {customConfig, value} from './index.component'

	export default {
		mixins: [mixins],
		created() {
			this.configValue = this.parseConfigValue(value, customConfig)
		},
		computed: {
			desc1() {
				if (this.data) {
					return this.config.config.desc1.replace(
						'{x}',
						this.data.value2
					)
				}
				return ''
			},
			style() {
				if (this.data) {
					let rotate = (this.data.value1 / 100) * 360 + 6
					return {
						transform: `translateX(-50%) rotate(${rotate}deg)`,
					}
				}
				return {
					transform: `translateX(-50%) rotate(0deg)`,
				}
			},
		},
		methods: {
			setOption(data) {
				let newData = []
				let newData1 = []
				let color = JSON.parse(this.config.config.color)
				console.log(color)
				for (let i = data.value1; i > 0; i--) {
					let opacity = 1 - i / data.value1
					if (opacity < 0) opacity = 0.1
					newData.push({
						value: 1,
						itemStyle: {
							borderRadius: 100,
							color: `rgba(${color[0]}, ${color[1]}, ${color[2]},${opacity})`,
						},
					})
				}
				while (newData.length < 100) {
					newData.push({
						value: 1,
						itemStyle: {
							borderRadius: 100,
							color: `rgba(${color[0]}, ${color[1]}, ${color[2]},0)`,
						},
					})
				}
				newData1.push({
					value: 100,
					itemStyle: {
						color: `rgba(${color[0]}, ${color[1]}, ${color[2]},0.1)`,
					},
				})
				options.series[0].data = newData1
				options.series[1].data = newData
				this.instance && this.instance.setOption(options)
			},
		},
		watch: {
			data: {
				handler(val) {
					if (this.id) {
						const data = {...val}
						this.$nextTick(() => {
							this.instance = echarts.init(
								document.getElementById(this.id)
							)
							this.setOption(data)
						})
					}
				},
				deep: true,
				immediate: true,
			},
		},
	}
</script>
<style lang="scss" scoped>
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
				font-size: 16px;
				font-weight: 400;
				line-height: 20px;
				letter-spacing: 0;
				margin-top: 10px;
				opacity: 0.75;
				white-space: nowrap;
			}

			.desc2 {
				font-size: 16px;
				font-weight: 400;
				line-height: 20px;
				letter-spacing: 0;
				opacity: 0.75;
				white-space: nowrap;
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
		position: absolute;
		top: 0;
		left: 50%;
		opacity: 1;

		.carout_point {
			width: 15px;
			height: 15px;
			background: #fff;
			position: absolute;
			bottom: -4px;
			border-radius: 10px;
		}
	}
</style>

