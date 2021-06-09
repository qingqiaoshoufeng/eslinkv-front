<template>
	<div class="widget-part" :style="styles" v-if="data">
		<ul class="list">
			<li
				v-for="(k, i) in data"
				:key="i"
				:class="{ active: i === index }"
			>
				<div
					class="li-progress"
					:style="{ right: `${100 - k.percent}%` }"
				></div>
				<div class="li-main">
					<div class="li-name">{{ k.name }}</div>
					<div class="li-percent">{{ k.percent }}%</div>
					<img src="/static/icons/arrow-right.svg" />
				</div>
			</li>
		</ul>
		<div class="rows">
			<div class="row">
				<div class="info">
					<img :src="config.config.img1" alt="" />
					<span class="info-txt">{{ config.config.desc1 }}</span>
					<span class="info-num font-num">
						{{ activeItem.num1 | toThousand }}
					</span>
				</div>
				<div class="progress">
					<div
						class="progress-line"
						:style="{ width: 468 * activeItem.rate1 + 'px' }"
					>
						<span class="dot"></span>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="info">
					<img :src="config.config.img2" alt="" />
					<span class="info-txt">{{ config.config.desc2 }}</span>
					<span class="info-num font-num">
						{{ activeItem.num2 | toThousand }}
					</span>
				</div>
				<div class="progress">
					<div
						class="progress-line"
						:style="{ width: 468 * activeItem.rate2 + 'px' }"
					>
						<span class="dot"></span>
					</div>
				</div>
			</div>
		</div>
		<div class="chart-wrap">
			<div class="chart" :id="id" />
			<div class="chart-info">
				<div class="chart-info-num font-num">
					{{ activeItem.finishRate }}%
				</div>
				<div class="chart-info-txt">{{ config.config.desc }}</div>
			</div>
		</div>
	</div>
</template>
<script>
import { widgetMixin } from '@eslinkv/vue2'
import getOption from './options'
import { customConfig, value } from './index.component'

export default {
	mixins: [widgetMixin],
	methods: {
		setOption(data) {
			this.instance &&
				this.instance.setOption(getOption(this.activeItem.finishRate))
		},
	},
	data() {
		return {
			index: 0,
			timer: null,
		}
	},
	computed: {
		activeItem() {
			return this.data ? this.data[this.index] : {}
		},
	},
	watch: {
		data: {
			handler(val) {
				if (this.id) {
					this.$nextTick(() => {
						this.instance = echarts.init(
							document.getElementById(this.id),
						)
					})
				}
			},
			deep: true,
			immediate: true,
		},
	},
	created() {
		this.configValue = this.parseConfigValue(value, customConfig)
	},
	mounted() {
		this.timer = setInterval(() => {
			if (this.index === this.data.length - 1) {
				this.index = 0
			} else {
				this.index++
			}
			this.setOption()
		}, 2000)
	},
	beforeDestroy() {
		clearInterval(this.timer)
		this.timer = null
	},
}
</script>
<style lang="scss" scoped>
.widget-part {
	display: flex;
	align-items: center;

	.list {
		display: flex;
		flex: none;
		flex-direction: column;
		justify-content: space-around;
		margin-right: 68px;

		li {
			position: relative;
			width: 200px;
			height: 40px;
			margin-bottom: 8px;
			font-size: 18px;
			color: rgba(255, 255, 255, 0.75);
			background: rgba(0, 31, 109, 0.5);

			&.active {
				color: #fff;
				border: 1px solid #0df;

				.li-progress {
					background: rgba(0, 221, 255, 0.5);
				}
			}

			.li-progress {
				position: absolute;
				top: 0;
				right: 30%;
				bottom: 0;
				left: 0;
				z-index: 5;
				background: #0057a9;
			}

			.li-main {
				position: absolute;
				top: 0;
				right: 0;
				bottom: 0;
				left: 0;
				z-index: 6;
				display: flex;
				align-items: center;
				padding: 0 12px;
				text-align: left;

				.li-name {
					width: 100px;
				}

				.li-percent {
					width: 30px;
					margin-right: 30px;
				}
			}
		}
	}

	.rows {
		width: 480px;
		margin-left: 20px;

		.row {
			&:first-child {
				margin-bottom: 26px;
			}

			.info {
				display: flex;
				align-items: center;
				margin-bottom: 8px;

				img {
					width: 32px;
					height: 32px;
					margin-right: 8px;
				}

				.info-txt {
					flex: 1;
					font-size: 24px;
					line-height: 24px;
					color: #feffff;
					text-align: left;
				}

				.info-num {
					font-size: 24px;
					line-height: 24px;
					color: #feffff;
				}
			}

			.progress {
				width: 480px;
				height: 16px;
				padding-top: 6px;
				padding-left: 6px;
				background: rgba(255, 255, 255, 0.1);

				.progress-line {
					position: relative;
					width: 200px;
					height: 4px;
					background: linear-gradient(
						90deg,
						rgba(1, 229, 255, 0.0001) 0%,
						#0df 100%
					);
					transition: all 0.3s;

					.dot {
						position: absolute;
						top: -8px;
						right: -10px;
						width: 20px;
						height: 20px;
						border: 2px solid rgba(0, 254, 207, 0.4);
						border-radius: 50%;

						&::after {
							position: absolute;
							top: 0;
							right: 0;
							bottom: 0;
							left: 0;
							display: block;
							width: 12px;
							height: 12px;
							margin: auto;
							content: '';
							background: #00ffcf;
							border-radius: 50%;
							box-shadow: 0 0 4px #00fecf;
						}
					}
				}
			}
		}
	}

	.chart-wrap {
		position: relative;
		width: 156px;
		height: 156px;
		margin-left: 48px;

		.chart {
			width: 156px;
			height: 156px;
		}

		.chart-info {
			position: absolute;
			top: 48px;
			right: 0;
			left: 0;

			.chart-info-num {
				font-size: 32px;
				font-weight: bold;
				line-height: 32px;
				color: #fff;
			}

			.chart-info-txt {
				margin-top: 8px;
				font-size: 18px;
				line-height: 25px;
				color: rgba(255, 255, 255, 0.75);
				text-align: center;
			}
		}
	}
}
</style>
