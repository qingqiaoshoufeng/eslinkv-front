

export default function getOption(data, config) {
	return {
		textStyle: {
			fontSize: 16,
			color: '#FFF'
		},
		grid: {
			top: 40,
			left: 60,
			bottom: 30,
			right: 40
		},
		tooltip: {
			trigger: 'axis',
			triggerOn: 'mousemove|click'
		},
		legend: {
			icon: 'rect',
			orient: 'horizontal',
			align: 'left',
			top: '2%',
			right: '25%',
			itemWidth: 16,
			itemHeight: 2,
			itemGap: 8,
			textStyle: {
				color: '#fff',
				fontSize: 16
			}
		},
		color: "#52EDC5",
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
				lineHeight: 16,
				interval: 0
			},
			offset: 5,
			data: data.xValue
		}],
		yAxis: [
			{
				type: 'value',
				show: true,
				name: config.unit1,
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
				splitLine: {
					show: true,
					lineStyle: {
						type: "solid",
						color: "rgba(199, 209, 219, 0.2)",
					}
				},
				axisLine: {
					show: false,
				}
			},
			{
				name: config.unit2,
				type: "value",
				splitLine: {
					show: false
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
		series: [
			{
				name: config.legend1,
				type: "line",
				symbolSize: 16,
				symbol: 'none',
				lineStyle: {
					color: "#00DDFF",
					type: 'dotted'
				},
				itemStyle: {
					color: "#00DDFF",
				},
				data: data.yValue1
			},
			{
				name: config.legend2,
				type: "line",
				symbolSize: 16,
				symbol: 'none',
				lineStyle: {
					color: "#FFD200",
					type: 'dotted'
				},
				itemStyle: {
					color: "#FFD200",
				},
				data: data.yValue2
			},
			{
				name: config.legend3,
				type: "line",
				symbolSize: 16,
				symbol: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFWSURBVHgBjVPRUYNAEH2XcfxOB9KByViASQWxBNNBOhArSDqADtAKknw5oxPBCkIHYAGyvuUOORhksjMvYZe3u+9uF4O+yccCuF4B1QO9wEUzh2eYee7TJ21iOiW2wFXC5G9GliSbGsCaOBL7mqNcZ+YvWV8CX8SGSSWGrOZVIfveuwZl80Kr7nCpSRpbtdYJiLMvS0QCYk8UYi3RWO+4BbEwkCwCfo4wd3GTzL+UmPb6qty5MSa3RU6hcniJMuOZMo+4HUiGi0WtO4mJlcqRzvHGrUD3LmQy0Gl4Aq2KjmmBHPJ548WykQKvXveZclmgYlDWHmn9jwqNbTy/LqCVFm4k/TEmzbndSAOv+9SN3sXktKMT4VLzFq+/ygfYD2Zklesxq/x6le0UbMKS96EFUyp6hLzP2sQ33dYnPp2J5kMrWwXdLgF/Q+LWdVLLYSfwwsSDT/8FGjPas7LeaZQAAAAASUVORK5CYII=',
				itemStyle: {
					color: "#00FFCF",
				},
				lineStyle: {
					color: "#00FFCF"
				},
				yAxisIndex: 1,
				areaStyle: {
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
						offset: 0,
						color: "rgba(0, 255, 207, 0.5)"
					},
						{
							offset: 1,
							color: "rgba(0, 255, 207, 0)"
						}
					], false)
				},
				data: data.yValue3
			}
		]
	}
}
