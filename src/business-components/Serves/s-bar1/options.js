export default {
	grid: {
		left: 55,
		right: 30,
		top: 45,
		bottom: 40
	},
	xAxis: [{
		type: 'category',
		axisTick: {
			show: false,
		},
		axisLine: {
			show: false,
		},
		axisLabel: {
			textStyle: {
				color: '#fff',
			}
		},
	}],
	yAxis: [{
		type: 'value',
		show: true,
		splitLine: {
			lineStyle: {
				type: "solid",
				color: "rgba(199, 209, 219, 0.2)"
			}
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
			}
		},
		axisLine: {
			show: false,
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
			show: false
		},
		show: true,
		axisTick: {
			show: false,
			textStyle: {
				color: '#fff',
			}
		},
		axisLabel: {
			textStyle: {
				show: true,
				color: '#fff',
			}
		},
		interval: 25,
		axisLine: {
			show: false,
		}
	}],
	series: [{
		type: 'bar',
		yAxisIndex: 0,
		itemStyle: {
			normal: {
				color: '#E5615B',
			}
		},
		barWidth: 6,
	}, {
		type: 'bar',
		barWidth: 6,
		yAxisIndex: 0,
		barGap: 1,
		itemStyle: {
			normal: {
				color: '#00DDFF',
			}
		},
	}, {
		type: 'line',
		yAxisIndex: 1,
		show: true,
		axisTick: {
			show: false,
			textStyle: {
				color: '#fff',
			}
		},
		axisLabel: {
			textStyle: {
				color: '#fff',
				show: false,
			}
		},
		symbol: 'none',
		itemStyle: {
			normal: {
				color: '#01FDD2',
				lineStyle: {
					width: 2,
					type: 'solid'
				}
			}
		},
		smooth: true,
		axisLine: {
			show: false,
		}
	}]
};
