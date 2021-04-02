<template>
	<div class="widget-part" :style="styles" v-if="data">
		<div class="title">
			<div class="title-txt">LNG宁波挂牌价(元/吨)</div>
			<div class="num">{{ data.lngPrice }}</div>
		</div>
		<div class="ul-wrap">
			<ul
				class="jars"
				:style="{ transform: `translateX(${-992 * groupIndex}px)` }"
			>
				<li
					v-for="(k, i) in data.station"
					:key="i"
					:class="{ active: currentIndex === i }"
					@click="changeStation(i)"
				>
					<div class="jar">
						<div class="jar-heart">
							<div
								class="water"
								:style="{ top: 100 - k.percent + '%' }"
							></div>
							<div class="jar-num font-num">{{ k.percent }}%</div>
						</div>
					</div>
					<div class="li-num">{{ k.value }}</div>
					<div class="li-name">{{ k.name }}</div>
					<div class="li-unit">储气量(m³)</div>
					<div class="active-dot" v-show="currentIndex === i">
						<div class="dot"></div>
					</div>
				</li>
			</ul>
			<div class="split-line" style="transform: translateY(-2px)"></div>
		</div>
		<div class="view">
			<div class="titles">
				<div>进出液</div>
				<div>气化量</div>
			</div>
			<div class="chart-wrap">
				<div class="legend">
					<div class="legend-item">
						<div class="legend-color"></div>
						<div class="legend-txt">进液量</div>
					</div>
					<div class="legend-item">
						<div class="legend-color red"></div>
						<div class="legend-txt">出液量</div>
					</div>
					<div class="legend-item">
						<div class="legend-color green"></div>
						<div class="legend-txt">气化量</div>
					</div>
				</div>
				<div class="chart" :id="id"></div>
				<div class="x-axis">
					<div class="month" v-for="k in month" :key="k">{{ k }}</div>
				</div>
			</div>
		</div>
		<div class="split-line"></div>
	</div>
</template>
<script>
import { widgetMixin } from 'eslinkv-sdk'
import getOptions from './options'
import { value } from './index.component'

export default {
	mixins: [widgetMixin],
	data() {
		return {
			currentIndex: 0,
			groupIndex: 0,
			timer: null,
			clickTimer: null,
			isClick: false,
		}
	},
	computed: {
		month() {
			if (this.data) {
				return this.data.station[this.currentIndex].chart.map(
					v => v.name,
				)
			}
			return []
		},
	},
	methods: {
		setOption() {
			this.instance &&
				this.instance.setOption(
					getOptions(this.data.station[this.currentIndex].chart),
				)
		},
		changeStation(i) {
			clearTimeout(this.clickTimer)
			this.currentIndex = i
			this.isClick = true
			this.clickTimer = setTimeout(() => {
				this.isClick = false
			}, 4000)
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
						this.setOption(val)
					})
				}
			},
			deep: true,
			immediate: true,
		},
	},
	created() {
		this.configValue = this.parseConfigValue(value)
	},
	mounted() {
		this.timer = setInterval(() => {
			if (this.isClick) return
			if (this.currentIndex === this.data.station.length - 1) {
				this.currentIndex = 0
				this.groupIndex = 0
			} else if (this.currentIndex === this.groupIndex * 5 + 4) {
				this.groupIndex++
				this.currentIndex++
			} else {
				this.currentIndex++
			}
			this.setOption()
		}, 2000)
	},
	beforeDestroy() {
		this.timer && clearInterval(this.timer)
		this.clickTimer && clearTimeout(this.clickTimer)
	},
}
</script>
<style lang="scss" scoped>
.view {
	display: flex;
	width: 100%;
}

.title {
	display: flex;
	align-items: center;
	width: 400px;
	height: 64px;
	padding-left: 22px;
	margin-bottom: 22px;
	background: url('/static/icons/long-bg.svg');
	background-size: 100% 100%;

	.title-txt {
		margin-right: 33px;
		font-size: 20px;
		line-height: 24px;
		color: #0df;
	}

	.num {
		font-size: 48px;
		font-weight: bold;
		line-height: 48px;
		color: #feffff;
	}
}

.ul-wrap {
	overflow: hidden;
}

.jars {
	display: flex;
	flex-wrap: nowrap;
	justify-content: space-between;
	padding-bottom: 24px;
	transition: all 0.4s;

	li {
		position: relative;
		box-sizing: border-box;
		flex: none;
		width: 160px;
		height: 230px;
		padding-top: 16px;
		margin-right: 48px;
		text-align: center;
		background: linear-gradient(
			180deg,
			rgba(0, 68, 169, 0.3) 0%,
			rgba(0, 68, 169, 0) 100%
		);

		&:nth-child(5n) {
			margin-right: 0;
		}

		.jar {
			position: relative;
			width: 48px;
			height: 104px;
			margin: 0 auto 16px;
			background: url('/static/icons/jar.svg') no-repeat;
			background-size: 100% 100%;

			.jar-heart {
				position: absolute;
				top: 3px;
				left: 4px;
				display: flex;
				align-items: center;
				justify-content: center;
				width: 40px;
				height: 92px;
				overflow: hidden;
				background: #001f6d;
				border-radius: 16px;
			}

			.water {
				position: absolute;
				top: 100%;
				bottom: 0;
				left: 0;
				width: 40px;
				background: linear-gradient(
					to top,
					rgba(0, 221, 255, 0),
					rgba(0, 221, 255, 1)
				);
			}

			.jar-num {
				z-index: 1;
				font-size: 24px;
				font-weight: bold;
				line-height: 24px;
				color: #fff;
				text-align: center;
			}
		}

		.li-num {
			margin-bottom: 4px;
			font-size: 32px;
			font-weight: bold;
			line-height: 32px;
			color: #fff;
			text-align: center;
		}

		.li-name {
			margin-bottom: 4px;
			font-size: 20px;
			line-height: 24px;
			color: #0df;
			text-align: center;
		}

		.li-unit {
			font-size: 18px;
			line-height: 24px;
			color: rgba(255, 255, 255, 0.75);
			text-align: center;
		}

		&.active {
			border: 1px solid rgba(0, 221, 255, 0.5);

			&::after {
				position: absolute;
				right: 0;
				bottom: 0;
				left: 0;
				display: block;
				height: 4px;
				content: '';
				background: #0df;
			}
		}

		.active-dot {
			position: absolute;
			right: 0;
			bottom: -20px;
			left: 0;
			width: 2px;
			height: 20px;
			margin: auto;
			background: #00ffcf;

			.dot {
				position: absolute;
				bottom: -8px;
				left: -3px;
				width: 8px;
				height: 8px;
				background: #00ffcf;
			}
		}
	}
}

.split-line {
	position: relative;
	width: 100%;
	height: 2px;
	background: rgba(0, 221, 255, 0.5);

	&::before {
		position: absolute;
		top: 0;
		left: 0;
		display: block;
		width: 40px;
		height: 2px;
		content: '';
		background: #0df;
	}

	&::after {
		position: absolute;
		top: 0;
		right: 0;
		display: block;
		width: 40px;
		height: 2px;
		content: '';
		background: #0df;
	}
}

.chart-wrap {
	position: relative;
	width: 100%;
	height: 435px;
	margin-top: 24px;

	.legend {
		position: absolute;
		top: 0;
		right: 0;
		left: 0;
		display: flex;
		justify-content: space-between;
		width: 320px;
		margin: auto;

		.legend-item {
			display: flex;
			align-items: center;

			.legend-color {
				width: 16px;
				height: 8px;
				background: #2194ff;

				&.red {
					background: #e5615b;
				}

				&.green {
					background: #00ffcf;
				}
			}

			.line-legend {
				width: 16px;
				height: 2px;
				background: #0df;
			}

			.legend-txt {
				margin-left: 4px;
				font-size: 16px;
				line-height: 16px;
				color: #fff;
			}
		}
	}
}

.chart {
	position: relative;
	width: 100%;
	height: 100%;
}

.x-axis {
	position: absolute;
	right: 50px;
	bottom: 10px;
	left: 50px;
	z-index: 999;
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: 24px;
	padding: 0 18px;
	background: rgba(0, 87, 169, 0.2);
	border-radius: 12px;

	.month {
		font-size: 16px;
		font-style: normal;
		font-weight: normal;
		line-height: 16px;
		color: #fff;
		text-align: center;
	}
}

.titles {
	flex: none;
	width: 82px;

	> div {
		padding-top: 98px;
		font-size: 20px;
		font-style: normal;
		font-weight: normal;
		line-height: 24px;
		color: #fff;

		&:last-child {
			padding-top: 192px;
		}
	}
}
</style>
