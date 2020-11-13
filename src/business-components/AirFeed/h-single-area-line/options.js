export default {
	textStyle: {
		fontSize: 16,
		color: '#FFF'
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
			color: "#fff"
		},
		offset: 5
	}],
	yAxis: [{
		name: "%",
		type: "value",
		splitLine: {
			show: true,
			lineStyle: {
				type: "solid",
				color: "rgba(199, 209, 219, 0.4)"
			}
		},
		axisLabel: {
			color: "#fff"
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
		name: "机构登录数",
		type: "line",
		symbolSize: 16,
		symbol: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFWSURBVHgBjVPRUYNAEH2XcfxOB9KByViASQWxBNNBOhArSDqADtAKknw5oxPBCkIHYAGyvuUOORhksjMvYZe3u+9uF4O+yccCuF4B1QO9wEUzh2eYee7TJ21iOiW2wFXC5G9GliSbGsCaOBL7mqNcZ+YvWV8CX8SGSSWGrOZVIfveuwZl80Kr7nCpSRpbtdYJiLMvS0QCYk8UYi3RWO+4BbEwkCwCfo4wd3GTzL+UmPb6qty5MSa3RU6hcniJMuOZMo+4HUiGi0WtO4mJlcqRzvHGrUD3LmQy0Gl4Aq2KjmmBHPJ548WykQKvXveZclmgYlDWHmn9jwqNbTy/LqCVFm4k/TEmzbndSAOv+9SN3sXktKMT4VLzFq+/ygfYD2Zklesxq/x6le0UbMKS96EFUyp6hLzP2sQ33dYnPp2J5kMrWwXdLgF/Q+LWdVLLYSfwwsSDT/8FGjPas7LeaZQAAAAASUVORK5CYII=',
		itemStyle: {
			color: "#fff",
			borderColor: "#00FFCF",
		},
		lineStyle: {
			color: "#00FFCF"
		},
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
	}
	]
}