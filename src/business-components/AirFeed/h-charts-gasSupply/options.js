let xData = [];
let barDataTest = [];
let lineData1 = [];
let lineData2 = [];
for (let i = 1; i < 13; i++) {
	xData.push(i + "月");
	barDataTest.push(parseInt(i * Math.random() * 100))
	lineData1.push(parseInt(Math.random() * 100))
	lineData2.push(parseInt(Math.random() * 100))
}

export const barData = barDataTest
export const lineData = lineData1
export const dashLineData = lineData2

export default function (barData, lineData, dashLineData) {
	return {
		"tooltip": {
			"trigger": "axis",
			"axisPointer": {
				"type": "shadow",
				textStyle: {
					color: "#fff"
				}

			},
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
		"barWidth": 20,
		"calculable": true,
		"xAxis": [{
			"type": "category",
			"axisLine": {
				lineStyle: {
					color: 'rgba(255, 255, 255, 0.2)',
					fontSize: 16,
					lineHeight: 16
				}
			},
			"splitLine": {
				"show": false
			},
			"axisTick": {
				"show": false
			},
			"splitArea": {
				"show": false
			},
			"axisLabel": {
				"interval": 0
			},
			"data": xData,
		}],
		"yAxis": [{
			"name": '万m3',
			nameTextStyle: {
				color: '#fff',
				fontSize: 16,
				align: 'right',
				padding: [3, 6, 5, 3]
			},
			"type": "value",
			"splitLine": {
				"show": true,
				lineStyle: {
					color: 'rgba(255, 255, 255, 0.2)',
				}
			},
			"axisLine": {
				"show": false
			},
			"axisTick": {
				"show": false
			},
			splitNumber: 4,
			"axisLabel": {
				"interval": 0,
				color: '#fff',
				fontSize: 16,
				lineHeight: 16

			},
			"splitArea": {
				"show": false
			}

		}, {
			"name": '%',
			nameTextStyle: {
				color: '#fff',
				fontSize: 16,
				align: 'left',
				padding: [3, 6, 5, 3]
			},
			"type": "value",
			"splitLine": {
				"show": false,
				lineStyle: {
					color: 'rgba(255, 255, 255, 0.2)'
				}
			},
			splitNumber: 4,
			"axisLine": {
				"show": false
			},
			"axisTick": {
				"show": false
			},
			"axisLabel": {
				"interval": 0
			},
			"splitArea": {
				"show": false
			}
		}],
		"series": [{
			"name": "供气量",
			"type": "bar",
			"stack": "总量",
			barWidth: 17,
			"itemStyle": {
				"normal": {
					"color": {
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
			"data": barData,
			label: {
				show: false
			}
		}, {
			"name": "同比",
			"type": "line",
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
			"data": dashLineData
		}, {
			"name": "环比",
			"type": "line",
			symbolSize: 1,
			smooth: true,
			showSymbol: false,
			yAxisIndex: 1,
			label: {
				show: false

			},
			itemStyle: {color: '#00FFCF'},
			lineStyle: {
				width: 2,
				color: '#00FFCF'
			},
			"data": lineData
		}]
	}
}
