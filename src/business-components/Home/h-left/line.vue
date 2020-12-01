<template>
	<div class="chart" ref="chart"></div>
</template>

<script>

	import {hexToRgba} from "@/utils";

	export default {
		props: ['data'],
		watch: {
			data: {
				handler(val) {
					this.$nextTick(() => {
						this.instance = echarts.init(this.$refs.chart).setOption(this.getOption())
					})
				},
				deep: true,
				immediate: true
			},
		},
		methods: {
			getOption() {
				return {
					textStyle: {
						fontSize: 16,
						color: '#FFF'
					},
					grid: {
						top: '25%',
						bottom: '15%',
						left: '10%',
						right: '2%',
					},
					legend: {
						icon: 'rect',
						orient: 'horizontal',
						align: 'left',
						top: '14%',
						right: 'center',
						itemWidth: 16,
						itemHeight: 2,
						itemGap: 16,
						textStyle: {
							color: '#fff',
							fontSize: 16
						}
					},
					xAxis: [{
						type: "category",
						axisTick: {
							show: false
						},
						axisLine: {
							show: false
						},
						axisLabel: {
							color: "#fff",
							fontSize: 16,
							lineHeight: 16
						},
						offset: 5,
						data: this.data.map(item => item.x)
					}],
					yAxis: [{
						name: "吨",
						type: "value",
						splitLine: {
							show: true,
							lineStyle: {
								type: "solid",
								color: "rgba(199, 209, 219, 0.2)"
							}
						},
						axisLabel: {
							color: "#fff",
							fontSize: 16,
							lineHeight: 16
						},
						axisLine: {
							show: false
						},
						axisTick: {
							show: false
						},
						nameTextStyle: {
							color: "#fff"
						},
						offset: 5
					}],
					series: [{
						name: '年度LNG气化量趋势',
						type: "line",
						symbolSize: 16,
						symbol: 'none',
						itemStyle: {
							color: '#00DDFF'
						},
						smooth: true,
						lineStyle: {
							color: '#00DDFF'
						},
						areaStyle: {
							color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
								offset: 0,
								color: hexToRgba('#00DDFF', 0)
							},
								{
									offset: 1,
									color: hexToRgba('#00DDFF', 0.5)
								}
							], false)
						},
						data: this.data.map(item => Math.ceil(item.y / 10000))
					}
					]
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
