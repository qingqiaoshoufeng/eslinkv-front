import addMonths from 'date-fns/addMonths'
import format from 'date-fns/format'

const dataTest = []
for (let i = 1; i < 13; i++) {
	const obj = {}
	obj.xData = format(addMonths(new Date(), `-${i}`), 'M') + '月'
	obj.time = addMonths(new Date(), `-${i}`)
	obj.barData = parseInt(i * Math.random() * 100)
	obj.lineData = parseInt(Math.random() * 100)
	obj.dashLineData = parseInt(Math.random() * 100)
	dataTest.push(obj)
}

export const data = dataTest

export default function (xData, barData, lineData, dashLineData) {
	return {
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'shadow',
				textStyle: {
					color: '#fff'
				}

			}
		},
		grid: {
			top: 40,
			bottom: 30,
			left: 60,
			right: 40
		},
		textStyle: {
			fontSize: 16,
			color: '#FFF'
		},
		barWidth: 20,
		calculable: true,
		xAxis: [{
			type: 'category',
			axisLine: {
				lineStyle: {
					color: 'rgba(255, 255, 255, 0.2)',
					fontSize: 16,
					lineHeight: 16
				}
			},
			splitLine: {
				show: false
			},
			axisTick: {
				show: false
			},
			splitArea: {
				show: false
			},
			axisLabel: {
				interval: 0
			},
			data: xData
		}],
		yAxis: [{
			name: '万m³',
			nameTextStyle: {
				color: '#fff',
				fontSize: 16,
				align: 'right',
				padding: [3, 6, 5, 3]
			},
			type: 'value',
			splitLine: {
				show: true,
				lineStyle: {
					color: 'rgba(255, 255, 255, 0.2)'
				}
			},
			axisLine: {
				show: false
			},
			axisTick: {
				show: false
			},
			splitNumber: 4,
			axisLabel: {
				interval: 0,
				color: '#fff',
				fontSize: 16,
				lineHeight: 16

			},
			splitArea: {
				show: false
			}

		}, {
			name: '%',
			nameTextStyle: {
				color: '#fff',
				fontSize: 16,
				align: 'left',
				padding: [3, 6, 5, 3]
			},
			type: 'value',
			splitLine: {
				show: false,
				lineStyle: {
					color: 'rgba(255, 255, 255, 0.2)'
				}
			},
			splitNumber: 4,
			axisLine: {
				show: false
			},
			axisTick: {
				show: false
			},
			axisLabel: {
				interval: 0
			},
			splitArea: {
				show: false
			}
		}],
		series: [{
			name: '供气量',
			type: 'bar',
			stack: '总量',
			barWidth: 12,
			itemStyle: {
				normal: {
					color: {
						type: 'linear',
						x: 0,
						y: 0,
						x2: 0,
						y2: 1,
						colorStops: [{
							offset: 0,
							color: 'rgba(0, 221, 255, 1)' // 0% 处的颜色
						}, {
							offset: 1,
							color: 'rgba(0, 221, 255, 0)' // 100% 处的颜色
						}],
						global: false // 缺省为 false
					}
				}
			},
			data: barData,
			label: {
				show: false
			}
		}, {
			name: '同比',
			type: 'line',
			symbolSize: 1,
			showSymbol: false,
			yAxisIndex: 1,
			label: {
				show: false

			},
			smooth: true,
			lineStyle: {
				width: 2,
				color: '#E5615B',
				type: 'dotted'
			},
			data: dashLineData
		}, {
			name: '环比',
			type: 'line',
			symbolSize: 1,
			smooth: true,
			showSymbol: false,
			yAxisIndex: 1,
			label: {
				show: false

			},
			itemStyle: { color: '#00FFCF' },
			lineStyle: {
				width: 2,
				color: '#00FFCF'
			},
			data: lineData
		}]
	}
}
