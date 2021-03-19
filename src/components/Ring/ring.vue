<template>
	<div class="chart" ref="chart"></div>
</template>

<script>

	export default {
		props: {
			percent: Number,
			backColor: String,
			color: String
		},
		watch: {
			percent: {
				handler (val) {
					this.$nextTick(() => {
						this.instance = echarts.init(this.$refs.chart).setOption(this.getOption())
					})
				},
				immediate: true
			}
		},
		methods: {
			getOption () {
				return {
					series: [{
						name: '',
						type: 'pie',
						radius: ['75%', '95%'],
						avoidLabelOverlap: false,
						hoverAnimation: false,
						startAngle: 270,
						label: {
							show: false
						},
						itemStyle: {},
						labelLine: {
							show: false
						},
						data: [{
								value: this.percent,
								name: '亮',
								itemStyle: {
									color: this.color
								}
							},
							{
								value: 100 - this.percent,
								name: '暗',
								itemStyle: {
									color: this.backColor
								}
							}
						]
					}]
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
.chart {
	width: 100%;
	height: 100%;
}
</style>
