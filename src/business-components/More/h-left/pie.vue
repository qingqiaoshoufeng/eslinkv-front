<template>
	<div class="wrap">
		<div class="chart" ref="chart"></div>
		<div class="unit">单位：{{ unit }}</div>
	</div>
</template>

<script>

	export default {
		props: {
			data: {
				type: Array
			},
			text: {
				type: String,
				default: '区域'
			},
			subtext: {
				type: String,
				default: '销售气量'
			},
			unit: {
				type: String,
				default: '万m³'
			}
		},
		watch: {
			data: {
				handler(val) {
					this.$nextTick(() => {
						this.instance = echarts.init(this.$refs.chart).setOption(this.getOption())
					})
				},
				deep: true,
				immediate: true,
			},
		},
		methods: {
			getOption() {
				const total = this.data.reduce((p, n) => p + n.value, 0)
				return {
					title: {
						text: this.text,
						subtext: this.subtext,
						left: 'center',
						top: '35%',
						textStyle: {
							color: '#fff',
							fontSize: 24,
							fontWeight: 600
						},
						subtextStyle: {
							color: '#fff',
							fontSize: 24,
							fontWeight: 600
						}
					},
					series: [{
						type: 'pie',
						center: ['50%', '45%'],
						radius: ['52%', '64%'],
						avoidLabelOverlap: true,
						minAngle: 24,
						startAngle: 270,
						color: ['#db4f49', '#367cf6', '#84e4fc', '#f8cd47', '#fceb50', '#ed9144', '#5fcbb9'],
						label: {
							formatter: function (params) {
								const percent = (params.value * 100 / total).toFixed(2)
								return `{normal|${params.name} ${percent}%} \n {value|${Math.ceil(params.value / 10000)}}`
							},
							padding: [0, -100],
							rich: {
								normal: {
									fontSize: 14,
									lineHeight: 14,
									color: '#fff',
									padding: [6, 0, 0, 0],
									align: 'right'
								},
								value: {
									align: 'left',
									fontSize: 14,
									lineHeight: 14,
									color: '#fff',
									padding: [-8, 0, 0, 0],
								}
							}
						},
						labelLine: {
							length: 25,
							length2: 110
						},
						data: this.data
					}]
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.wrap {
		position: relative;
		width: 100%;
		height: 412px;

		.unit {
			position: absolute;
			bottom: 24px;
			right: 24px;
			font-size: 18px;
			line-height: 24px;
			color: #FFFFFF;
		}
	}

	.chart {
		width: 100%;
		height: 100%;
		background-image: url("/static/images/home/loop-bg.svg");
		background-repeat: no-repeat;
		background-position: 50% 40%;
	}
</style>
