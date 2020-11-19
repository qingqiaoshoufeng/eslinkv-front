export default function (data, config) {
	const lineValue = data.yValue.map((item, index) => (data.yValue[index] / data.yValue1[index]) * 100)
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
				show: false,
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
			name: '户',
			type: 'value',
			show: true,
			axisTick: {
				show: false,
				textStyle: {
					color: '#fff',
				}
			},
			splitLine: {
				lineStyle: {
					color: "rgba(199, 209, 219, 0.2)"
				}
			},
			axisLabel: {
				textStyle: {
					color: '#fff',
					fontSize: 16,
					lineHeight: 16
				}
			},
			axisLine: {
				show: false,
			}
		}, {
			name: '%',
			nameLocation: 'start',
			nameTextStyle: {
				color: '#fff',
				fontSize: 16,
				align: 'left',
				padding: [2, 6, 5, 8],
				lineHeight: 10
			},
			type: 'value',
			splitLine: {
				show: false
			},
			axisTick: {
				show: false,
				textStyle: {
					color: '#fff',
				}
			},
			axisLabel: {
				textStyle: {
					color: '#fff',
					fontSize: 16,
					lineHeight: 16
				}
			},
			interval: 25,
			axisLine: {
				show: false,
			}
		}],
		barGap: -0.8,
		series: [{
			type: 'bar',
			yAxisIndex: 0,
			showBackground: true,
			itemStyle: {
				normal: {
					color: config.color2,
				}
			},
			barWidth: 10,
			data: data.yValue1
		}, {
			type: 'bar',
			barWidth: 6,
			yAxisIndex: 0,
			showBackground: true,
			itemStyle: {
				normal: {
					color: config.color1,
				}
			},
			data: data.yValue
		}, {
			type: 'line',
			yAxisIndex: 1,
			show: true,
			axisLabel: {
				textStyle: {
					color: '#fff',
				}
			},
			itemStyle: {
				normal: {
					color: config.color3
				}
			},
			data: lineValue
		}]
	}
}
