<template>
	<div class="widget-part" :style="styles">
		<div class="legend">
			<div class="legend-item">
				<div class="tanc"></div>
				<div class="txt">供气量</div>
			</div>
			<div class="legend-item">
				<div class="line-legend"></div>
				<div class="txt">同比</div>
			</div>
			<div class="legend-item">
				<div class="line-legend green"></div>
				<div class="txt">环比</div>
			</div>
		</div>
		<div class="chart" :id="id"></div>
	</div>
</template>
<script>
	import mixins from 'eslinkv-npm/mixins'
	import getOptions from './options'
	import format from 'date-fns/format'
	import { customConfig, value } from './index.component'

	export default {
		mixins: [mixins],
		computed: {},
		methods: {
			setOption () {
				const xData = this.data.map(item => item.xData)
				const barData = this.data.map(item => item.barData)
				const lineData = this.data.map(item => item.lineData)
				const dashLineData = this.data.map(item => item.dashLineData)
				this.instance && this.instance.setOption(
					getOptions(
						xData,
						barData,
						lineData,
						dashLineData
					)
				)
				this.instance.off('click', this.handleClick)
				this.instance.on('click', this.handleClick)
			},
			handleClick (params) {
				const item = this.data[params.dataIndex]
				let selectType = '日'
				let selectValue = format(new Date(), 'yyyy.MM.dd')
				if (item.xData.indexOf('月') !== -1) {
					selectType = '月'
					selectValue = format(new Date(item.time), 'yyyy.MM')
				} else if (item.xData.indexOf('年') !== -1) {
					selectType = '年'
					selectValue = format(new Date(item.time), 'yyyy')
				} else {
					selectValue = format(new Date(item.time), 'yyyy.MM.dd')
				}
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
							this.setOption(val)
						})
					}
				},
				deep: true,
				immediate: true
			}
		},
		created () {
			this.configValue = this.parseConfigValue(value, customConfig)
		}
	}
</script>
<style lang="scss" scoped>
	.widget-part {
		position: relative;

		.legend {
			position: absolute;
			top: 22px;
			left: 0;
			display: flex;
			justify-content: center;
			width: 100%;
			font-size: 16px;
			line-height: 16px;
			color: #fff;

			.legend-item {
				display: flex;
				align-items: center;
				margin: 0 8px;
			}

			.tanc {
				width: 16px;
				height: 8px;
				background: #0df;
			}

			.line-legend {
				width: 16px;
				height: 2px;
				background: #e5615b;

				&.green {
					background: #00ffcf;
				}
			}

			.txt {
				margin-left: 4px;
			}
		}
	}

	.chart {
		width: 100%;
		height: 100%;
	}
</style>

