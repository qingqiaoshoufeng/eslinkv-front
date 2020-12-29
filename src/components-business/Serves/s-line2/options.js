import {hexToRgba} from '@/utils/index'

export default function (data, config) {
	return {
		grid: {
			top: '20%',
			left: '8%',
			right: '4%',
			bottom: '20%',
		},
		tooltip: {
			trigger: "axis",
			triggerOn: 'mousemove|click',
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
		legend: {
			icon: 'rect',
			orient: 'horizontal',
			align: 'left',
			top: '4%',
			right: 'center',
			itemWidth: 16,
			itemHeight: 8,
			itemGap: 16,
			textStyle: {
				color: '#fff',
				fontSize: 16
			}
		},
		textStyle: {
			color: '#fff',
			fontSize: 16
		},
		xAxis: [{
			type: 'category',
			data: data.data.map(v => v.x),
			axisLabel: {
				show: true
			},
			axisTick: {
				show: false
			},
			splitLine: {
				show: false,

			},
			axisLine: {
				show: false,
			},

		}],
		yAxis: [{
			name: config.unit,
			type: 'value',
			axisLabel: {
				show: true
			},
			nameTextStyle: {
				padding: [0, 30, 0, 0]
			},
			splitLine: {
				show: true,
				lineStyle: {
					color: "rgba(199, 209, 219, 0.2)"
				}
			},
			axisTick: {
				show: false,
			},
			axisLine: {
				show: false,
			},
			splitArea: {
				show: false
			}
		}],
		series: [{
			name: data.nowTime,
			type: 'line',
			data: data.data.map(v => v.y1),
			lineStyle: {
				color: config.color1
			},
			areaStyle: {
				normal: {
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
						offset: 0,
						color: hexToRgba(config.color1, 0.6)
					},
						{
							offset: 1,
							color: hexToRgba(config.color1, 0)
						}
					], false)
				}
			},
			symbol: 'emptyCircle',
			showSymbol: false, //是否显示 symbol, 如果 false 则只有在 tooltip hover 的时候显示。
			itemStyle: {
				color: config.color1
			},
			smooth: true
		},
			{
				name: data.lastTime,
				type: 'line',
				data: data.data.map(v => v.y2),
				lineStyle: {
					color: config.color2,
				},
				areaStyle: {
					normal: {
						color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
							offset: 0,
							color: hexToRgba(config.color2, 0.6)
						},
							{
								offset: 1,
								color: hexToRgba(config.color2, 0)
							}
						], false)
					}
				},
				symbol: 'emptyCircle',
				showSymbol: false,
				itemStyle: {
					color: config.color2
				},
				smooth: true
			}
		]
	}
}
