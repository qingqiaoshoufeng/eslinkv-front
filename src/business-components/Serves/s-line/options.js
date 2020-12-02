import {hexToRgba} from '@/utils'

export default function getOption(data, config) {
	return {
		textStyle: {
			fontSize: 16,
			color: '#FFF'
		},
		grid: {
			top: 40,
			bottom: 30,
			left: 65,
			right: 10
		},
		tooltip: {
			trigger: "axis",
			axisPointer: {
				lineStyle: {
					color: {
						type: "linear",
						x: 0,
						y: 0,
						x2: 0,
						y2: 1,
						colorStops: [{
							offset: 0,
							color: "rgba(0, 255, 207, 0.5)"
						}, {
							offset: 1,
							color: "rgba(0, 255, 207, 0)"
						}],
						global: false
					}
				}
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
			data: data.map(item => item.name)
		}],
		yAxis: [{
			name: config.unit,
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
			type: "line",
			symbolSize: 16,
			symbol: 'image://' + config.icon,
			itemStyle: {
				color: config.color,
			},
			lineStyle: {
				color: config.color
			},
			areaStyle: {
				color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
					offset: 0,
					color: hexToRgba(config.color, 0.5)
				},
					{
						offset: 1,
						color: hexToRgba(config.color, 0)
					}
				], false)
			},
			data: data.map(item => item.value)
		}
		]
	}
}
