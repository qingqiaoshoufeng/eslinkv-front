export default function getOption (data) {
	return {
		grid: {
			left: 35,
			right: 30,
			top: 45,
			bottom: 40
		},
		xAxis: [{
			type: 'category',
			axisTick: {
				show: false
			},
			axisLabel: {
				textStyle: {
					color: '#fff',
					fontSize: 16,
					lineHeight: 16
				}
			},
			data: data.xValue
		}],
		yAxis: [{
			type: 'value',
			show: true,
			axisTick: {
				show: false,
				textStyle: {
					color: '#fff'
				}
			},
			axisLabel: {
				textStyle: {
					color: '#fff',
					fontSize: 16,
					lineHeight: 16
				}
			},
			splitLine: {
				show: false
			},
			axisLine: {
				show: false
			}
		}, {
			name: '%',
			nameTextStyle: {
				color: '#fff',
				fontSize: 16,
				align: 'left',
				padding: [2, 6, 5, 8],
				lineHeight: 10
			},
			type: 'value',
			splitLine: {
				lineStyle: {
					type: 'solid',
					color: 'rgba(199, 209, 219, 0.2)'
				}
			},
			show: true,
			axisTick: {
				show: false,
				textStyle: {
					color: '#fff'
				}
			},
			axisLabel: {
				textStyle: {
					show: true,
					color: '#fff',
					fontSize: 16,
					lineHeight: 16
				}
			},
			axisLine: {
				show: true
			}
		}],
		barGap: -0.8,
		series: [{
			type: 'bar',
			yAxisIndex: 0,
			showBackground: true,
			itemStyle: {
				normal: {
					color: new echarts.graphic.LinearGradient(
						0, 0, 0, 1,
						[
							{ offset: 0, color: '#00DDFF' },
							{ offset: 1, color: 'rgba(0, 221, 255, 0)' }
						])
				}
			},
			barWidth: 10,
			data: data.yValue
		}, {
			type: 'line',
			yAxisIndex: 1,
			show: true,
			axisTick: {
				show: false,
				textStyle: {
					color: '#fff'
				}
			},
			axisLabel: {
				textStyle: {
					color: '#fff',
					show: false
				}
			},
			symbol: 'none',
			itemStyle: {
				normal: {
					lineStyle: {
						width: 2,
						type: 'dotted', // 'dotted'虚线 'solid'实线
						color: data.color2
					}
				}
			},
			smooth: true,
			axisLine: {
				show: false
			},
			data: data.yValue1
		}]
	}
}
