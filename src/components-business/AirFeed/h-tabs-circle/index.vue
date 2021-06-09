<template>
	<div class="widget-part h-tabs-circle" :style="styles" v-if="data">
		<h-vertical-tabs
			class="h-tabs-circle__tabs"
			:source="tabSource"
			:defaultActived="tabActived"
			@actived-change="tabActivedChange"
		/>
		<pie
			class="chart-circle"
			v-if="tabActived === 2"
			:data="data.circle[tabActived]"
		></pie>
		<div class="chart-circle" ref="circle" v-else></div>
		<ul class="circle-legend">
			<li v-for="(k, i) in curr" :key="i">
				<div class="circle-legend-color"></div>
				<div class="circle-legend-name">{{ k.name }}</div>
				<div class="circle-legend-num">
					<span class="font-num">{{ k.count | toThousand }}</span>
					{{ k.unit }}
				</div>
				<div class="circle-legend-percent font-num">
					{{ k.percent }}%
				</div>
			</li>
		</ul>
	</div>
</template>
<script>
import { widgetMixin } from '@eslinkv/vue2'
import HVerticalTabs from './HVerticalTabs'
import pie from './pie'
import { getCircleOption } from './options'
import { value } from './index.component'

export default {
	name: 'h-tabs-circle',
	components: {
		HVerticalTabs,
		pie,
	},
	data() {
		return {
			tabSource: [
				{
					name: '管网压力等级',
				},
				{
					name: '管网材质',
				},
				{
					name: '管网口径',
				},
			],
			tabActived: 2,
		}
	},
	computed: {
		curr() {
			return this.data ? this.data.circle[this.tabActived] : []
		},
	},
	watch: {
		data: {
			handler(val) {
				if (this.id) {
					this.$nextTick(() => {
						this.$refs.circle &&
							echarts
								.init(this.$refs.circle)
								.setOption(getCircleOption(this.curr))
					})
				}
			},
			deep: true,
			immediate: true,
		},
	},
	mixins: [widgetMixin],
	created() {
		this.configValue = this.parseConfigValue(value)
	},
	methods: {
		tabActivedChange(tabActived) {
			this.tabActived = tabActived
			this.$nextTick(() => {
				this.$refs.circle &&
					echarts
						.init(this.$refs.circle)
						.setOption(getCircleOption(this.curr))
			})
		},
	},
}
</script>
<style lang="scss" scoped>
.h-tabs-circle {
	display: flex;
	align-items: center;

	.chart-circle {
		width: 280px;
		height: 163px;
		margin: 0 30px;
	}

	.circle-legend {
		li {
			display: flex;
			align-items: center;
			margin-bottom: 16px;
			font-size: 18px;
			color: #fff;

			.circle-legend-color {
				box-sizing: content-box;
				width: 6px;
				height: 6px;
				margin-right: 10px;
				background: transparent;
				border: 4px solid #2c99ff;
				border-radius: 50%;
			}

			&:nth-child(2) .circle-legend-color {
				border-color: #18ceb9;
			}

			&:nth-child(3) .circle-legend-color {
				border-color: #fb592c;
			}

			&:nth-child(4) .circle-legend-color {
				border-color: #367cf6;
			}

			&:nth-child(5) .circle-legend-color {
				border-color: #84e4fc;
			}

			&:nth-child(6) .circle-legend-color {
				border-color: #f8cd47;
			}

			&:nth-child(7) .circle-legend-color {
				border-color: #fceb50;
			}

			&:nth-child(8) .circle-legend-color {
				border-color: #ed9144;
			}

			&:nth-child(9) .circle-legend-color {
				border-color: #5fcbb9;
			}

			.circle-legend-name {
				width: 238px;
				text-align: left;
			}

			.circle-legend-num {
				width: 100px;
				text-align: right;

				> span {
					margin-right: 8px;
					font-size: 24px;
					font-weight: bold;
				}
			}

			.circle-legend-percent {
				width: 80px;
				font-size: 24px;
				font-weight: bold;
				line-height: 24px;
				color: #fff;
				text-align: right;
			}
		}
	}

	&__cvs {
		position: relative;
	}

	&__tabs {
		position: relative;
	}
}
</style>
