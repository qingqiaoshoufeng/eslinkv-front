export default {
	legend: {
		show: true,
		textStyle: {
			color: '#fff'
		}
	},
	tooltip: {
		trigger: 'axis',
		backgroundColor: '#001A77',
		borderWidth: 1,
		borderColor: '#00DDFF',
		padding: 8,
		triggerOn: 'mousemove|click',
		axisPointer: {
			type: 'shadow'
		},
		formatter: function (params, ticket, callback) {
			return `<div style="color: #00FFCF;text-align: left;">${params[0].data[2]}</div>
<div style="text-align: left;">供气量：${params[0].data[1]}</div>
<div style="text-align: left;">同比：${params[0].data[3]}</div>
<div style="text-align: left;">环比：${params[0].data[4]}</div>`
		}
	},
	grid: {
		top: 40,
		left: 40,
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
			textStyle: {
				color: "rgba(255, 255, 255, 1)",
				fontSize: 16,
				lineHeight: 16
			}
		}
	},
	series: [
		{
			name: '供气量',
			type: 'bar',
			barWidth: 10,
			smooth: true,
			symbol: 'none',
			symbolSize: 5,
			itemStyle: {
				normal: {
					color: '#00DDFF'
				}
			},
			data: []
		}
	]
}
