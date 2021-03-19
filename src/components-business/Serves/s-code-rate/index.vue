<template>
	<div class="widget-part" :style="styles" v-if="data">
		<div class="left">
			<div class="row">
				<img :src="config.config.img1" alt="">
				<span class="row-txt">{{ config.config.desc1 }}</span>
				<span class="row-num font-num">{{ data.value2 | toThousand }}</span>
			</div>
			<div class="row">
				<img :src="config.config.img2" alt="">
				<span class="row-txt">{{ config.config.desc2 }}</span>
				<span class="row-num font-num">{{ data.value1 | toThousand }}</span>
			</div>
		</div>
		<div class="chart-wrap">
			<div class="chart" :id="id"/>
			<div class="pointBox" :style="style">
				<div class="radius"></div>
				<div class="carout_point"></div>
			</div>
			<div class="content">
				<div class="content-num font-num">{{ data.rate }}%</div>
				<div class="content-txt">{{ config.config.title }}</div>
			</div>
		</div>
	</div>
</template>
<script>
	import mixins from 'eslinkv-npm/mixins'
	import getOption from './options'
	import { customConfig, value } from './index.component'

	export default {
		mixins: [mixins],
		methods: {
			setOption () {
				this.instance && this.instance.setOption(getOption(this.data.rate))
			}
		},
		watch: {
			data: {
				handler (val) {
					if (this.id) {
						this.$nextTick(() => {
							this.instance = echarts.init(
								document.getElementById(this.id)
							)
							this.setOption()
						})
					}
				},
				deep: true,
				immediate: true
			}
		},
		computed: {
			style () {
				if (this.data) {
					const rotate = ((this.data.rate / 100) * 360) + 6
					return {
						transform: `translateX(-50%) rotate(${rotate}deg)`
					}
				}
				return {
					transform: 'translateX(-50%) rotate(0deg)'
				}
			}
		},
		created () {
			this.configValue = this.parseConfigValue(value, customConfig)
		}
	}
</script>
<style lang="scss" scoped>
	.widget-part {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-left: 16px;

		.left {
			display: flex;
			flex-direction: column;
			justify-content: center;

			.row {
				display: flex;

				&:first-child {
					margin-bottom: 32px;
				}

				img {
					width: 32px;
					height: 32px;
					margin-right: 8px;
				}

				.row-txt {
					width: 132px;
					font-size: 20px;
					line-height: 25px;
					color: #fff;
					text-align: left;
				}

				.row-num {
					flex: 1;
					font-size: 32px;
					font-weight: bold;
					line-height: 32px;
					color: #fff;
					text-align: right;
				}
			}
		}

		.chart-wrap {
			position: relative;
			display: flex;
			align-items: center;
			justify-content: center;
			width: 196px;
			height: 196px;
			background: url('./img/rate-bg.svg') no-repeat;
			background-size: 100% 100%;

			.chart {
				width: 160px;
				height: 160px;
			}

			.content {
				position: absolute;
				top: 62px;
				right: 0;
				left: 0;

				.content-txt {
					font-size: 18px;
					line-height: 32px;
					color: #fff;
				}

				.content-num {
					font-size: 40px;
					font-weight: bold;
					line-height: 48px;
					color: #feffff;
				}
			}
		}
	}

	.pointBox {
		position: absolute;
		top: 16px;
		left: 50%;
		width: 10px;
		height: 160px;
		opacity: 1;

		.carout_point {
			position: absolute;
			bottom: -4px;
			width: 15px;
			height: 15px;
			background: #fff;
			border-radius: 10px;
		}
	}
</style>

