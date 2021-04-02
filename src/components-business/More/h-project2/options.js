export default {
	grid: {
		top: 10,
		left: 0,
		bottom: 0,
		right: 0,
	},
	xAxis: {
		type: 'category',
		show: false,
	},
	yAxis: {
		type: 'value',
		axisTick: {
			show: false,
		},
		splitNumber: 4,
		axisLine: {
			show: false,
		},
		splitLine: {
			show: false,
		},
		axisLabel: {
			show: false,
		},
	},
	series: [
		{
			type: 'line',
			smooth: true,
			symbol: 'none',
			itemStyle: {
				normal: {
					color: '#00DDFF',
					lineStyle: {
						width: 1,
					},
				},
			},
			areaStyle: {
				color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
					{
						offset: 1,
						color: 'rgba(0, 221, 255, 0.0001)',
					},
					{
						offset: 0,
						color: 'rgba(0, 221, 255, 0.5)',
					},
				]),
			},
			data: [],
		},
	],
}
