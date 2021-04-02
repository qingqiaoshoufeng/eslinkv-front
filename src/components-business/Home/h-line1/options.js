export default {
	grid: {
		top: 40,
		left: 40,
		bottom: 30,
		right: 0,
	},
	xAxis: {
		type: 'category',
		axisTick: {
			show: false,
		},
		splitLine: {
			show: false,
		},
		boundaryGap: ['10%', '10%'],
		axisLine: {
			lineStyle: {
				color: 'rgba(255, 255, 255,.1)',
			},
		},
		axisLabel: {
			interval: 0,
			textStyle: {
				color: 'rgba(255, 255, 255, 1)',
				fontSize: 16,
				lineHeight: 16,
			},
		},
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
			lineStyle: {
				color: 'rgba(255, 255, 255,0.2)',
			},
		},
		axisLabel: {
			textStyle: {
				color: 'rgba(255, 255, 255, 1)',
				fontSize: 16,
				lineHeight: 16,
			},
		},
	},
	series: [
		{
			type: 'bar',
			barWidth: 10,
			smooth: true,
			symbol: 'none',
			symbolSize: 5,
			label: {
				show: true,
				position: 'top',
				formatter: '{a}',
				color: '#00DDFF',
				backgroundColor: '#00DDFF',
				fontSize: 1,
				width: 10,
				height: 4,
				rich: {
					a: {
						color: '#fff',
					},
				},
			},
			itemStyle: {
				normal: {
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
						{ offset: 0, color: 'rgba(255,255,255,.6)' },
						{ offset: 1, color: 'rgba(255,255,255,0)' },
					]),
				},
			},
			data: [],
		},
	],
}
