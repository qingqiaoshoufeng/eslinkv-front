<template>
	<div class="widget-part" :style="styles" v-if="data">
		<div class="main">
			<div class="chart" :id="id" />
			<div class="percent">
				<div
					class="percent-item"
					v-for="k in ~~((24 * curr.percent) / 100)"
					:key="k"
				></div>
			</div>
			<div class="legend">
				<div class="legend-item">
					<div class="color"></div>
					<div class="label">计划销气</div>
					<div class="num">{{ curr.plan }}</div>
				</div>
				<div class="legend-item">
					<div class="color light"></div>
					<div class="label">实际销气</div>
					<div class="num">{{ curr.actual }}</div>
				</div>
				<div class="legend-item">
					<div class="percent-color">
						<div class="percent-color-item"></div>
						<div class="percent-color-item"></div>
						<div class="percent-color-item"></div>
					</div>
					<div class="label">计划完成率</div>
					<div class="num">{{ curr.percent }}%</div>
				</div>
			</div>
			<div class="rates">
				<div class="rate">
					<div class="rate-num" :class="{ down: curr.rate1 < 0 }">
						{{ curr.rate1 < 0 ? '-' : '+' }}{{ curr.rate1 }}%
					</div>
					<div class="rate-txt">实际销气同比</div>
				</div>
				<div class="rate">
					<div class="rate-num" :class="{ down: curr.rate2 < 0 }">
						{{ curr.rate2 < 0 ? '-' : '+' }}{{ curr.rate2 }}%
					</div>
					<div class="rate-txt">实际销气同比</div>
				</div>
			</div>
		</div>
		<p class="date">{{ curr.name }}</p>
	</div>
</template>
<script>
import { widgetMixin } from 'eslinkv-sdk'
import getOption from './options'
import { value } from './index.component'

export default {
	mixins: [widgetMixin],
	data() {
		return {
			currIndex: 0,
			timer: null,
		}
	},
	methods: {
		setOption() {
			this.instance && this.instance.setOption(getOption(this.data.list))
			this.instance.dispatchAction({
				type: 'highlight',
				seriesIndex: 0,
				dataIndex: this.currIndex,
			})
			this.instance.dispatchAction({
				type: 'highlight',
				seriesIndex: 1,
				dataIndex: this.currIndex,
			})
			this.animate()
		},
		animate() {
			clearInterval(this.timer)
			this.timer = setInterval(() => {
				if (!this.instance) return
				this.instance.dispatchAction({
					type: 'downplay',
					seriesIndex: 0,
					dataIndex: this.currIndex,
				})
				this.instance.dispatchAction({
					type: 'downplay',
					seriesIndex: 1,
					dataIndex: this.currIndex,
				})
				if (this.currIndex === 5) {
					this.currIndex = 0
				} else {
					this.currIndex++
				}
				this.instance.dispatchAction({
					type: 'highlight',
					seriesIndex: 0,
					dataIndex: this.currIndex,
				})
				this.instance.dispatchAction({
					type: 'highlight',
					seriesIndex: 1,
					dataIndex: this.currIndex,
				})
			}, 2000)
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
						this.setOption()
					})
				}
			},
			deep: true,
			immediate: true,
		},
	},
	computed: {
		curr() {
			return this.data ? this.data.list[this.currIndex] : {}
		},
	},
	created() {
		this.configValue = this.parseConfigValue(value)
	},
	beforeDestroy() {
		clearInterval(this.timer)
		this.timer = null
	},
}
</script>
<style lang="scss" scoped>
.main {
	display: flex;
	align-items: center;
}

.chart {
	position: relative;
	width: 90px;
	height: 142px;
}

.percent {
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
	width: 24px;
	height: 142px;
	padding: 4px;
	margin: 0 16px 0 12px;
	background: rgba(255, 255, 255, 0.2);

	.percent-item {
		width: 16px;
		height: 4px;
		background: #00ffcf;

		& + .percent-item {
			margin-top: 2px;
		}
	}
}

.legend {
	text-align: left;

	.legend-item {
		display: flex;
		align-items: center;
		margin-top: 22px;

		.color {
			width: 16px;
			height: 16px;
			background: #0057a9;

			&.light {
				background: #0df;
			}
		}

		.label {
			width: 97px;
			margin-left: 4px;
			font-size: 18px;
			color: #fff;
		}

		.num {
			font-family: 'font-num';
			font-size: 24px;
			font-weight: bold;
			color: #fff;
		}

		.percent-color {
			width: 16px;
			height: 16px;

			.percent-color-item {
				width: 16px;
				height: 4px;
				margin-bottom: 2px;
				background: #00ffcf;
			}
		}
	}
}

.rates {
	margin-left: 53px;

	.rate {
		width: 132px;
		height: 72px;
		padding-top: 12px;
		margin-bottom: 8px;
		background: linear-gradient(
			180deg,
			rgba(255, 255, 255, 0) 0%,
			rgba(255, 255, 255, 0.1) 100%
		);

		.rate-txt {
			margin-top: 4px;
			font-size: 18px;
			line-height: 24px;
			color: #fff;
		}

		.rate-num {
			font-family: 'font-num';
			font-size: 24px;
			font-weight: bold;
			line-height: 24px;
			color: #e5615b;

			&.down {
				color: #00ffcf;
			}
		}
	}
}

.date {
	padding-left: 65px;
	font-size: 18px;
	line-height: 24px;
	color: #0df;
	text-align: left;
}
</style>
