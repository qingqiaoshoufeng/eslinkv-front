export default  {
	grid: {
		top: 40,
		left: 60,
		bottom: 30,
		right: 0
	},
	xAxis: {
		type: 'category',
		axisTick: {
			show: false
		},
		splitLine: {
			show: false
		},
		boundaryGap: ['10%', '10%'],
		axisLine: {
			lineStyle: {
				color: 'rgba(255, 255, 255,.1)'
			}
		},
		axisLabel: {
			interval: 0,
			textStyle: {
				color: "rgba(255, 255, 255, 1)",
				fontSize: 16,
				lineHeight: 16
			},
			formatter:function (value, index) {
				if (index%3===0)
					return value
				return ''
			}

		}
	},
	yAxis: {
		type: 'value',
		axisTick: {
			show: false
		},
		splitNumber: 4,
		axisLine: {
			show: false
		},
		splitLine: {
			lineStyle: {
				color: 'rgba(255, 255, 255,0.2)'
			}
		},
		axisLabel: {
			formatter: function (value) {
				if (value >= 1000) {
					return value / 1000 + 'k'
				} else {
					return value
				}
			},
			textStyle: {
				color: "rgba(255, 255, 255, 1)",
				fontSize: 16,
				lineHeight: 16
			}
		}
	},
	series: [
		{
			type: 'line',
			smooth: true,
			symbol: 'none',
			itemStyle: {
				normal: {
					color: '#00FFCF',
					lineStyle: {
						width: 2
					}
				}
			},
			areaStyle: {
				color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
					offset: 1,
					color: 'rgba(0, 255, 207, 0.3)'
				}, {
					offset: 0,
					color: 'rgba(0, 255, 207, 0.3)'
				}])
			},
			data: []
		}
	]
}
