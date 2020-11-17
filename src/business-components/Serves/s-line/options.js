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
	color: "#00DDFF",
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
		symbol: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFUSURBVHgBjVNBTsNADJzNgSPqDwhCHDjBE+AF8AT6A35AeQH8IPwg9AWBFyQ3JNqwOXFNOSEhgbG9bfE2SdWRnGy83rHXnjhsYkbnSHDJqyu2dOmt1L5xhxPX2PBkvSppBE/37Mnxi09+X+DIObUEYxBesIcCNcdIbARx1FRiTo9MMsIQZG9ODxobkUhm2dgVkkgqUbxSyh/eZiailK1gaykgF19USU2t9osXGTNebxxeHbRoI5IZTULVcp83OjMEOQ2jMFWEyvlB9nq0HW3UCz6b9LRogWF0JiQEDT7owPiqLQTT9Spcu0pYIFN8sVD+MR6oQnw3JrUSBOnKSMrOGHPT/SKaQBCe10Yqgroy7IqO8EQY7zzOXp0bhMyZjn4pvDCFQ7eA45+H+LmPUoVltKGlerrlPc8x4UeTMwzXU16KH0x455S/ViSNNpvwhGP3bMP/AKHGMIU7wYTyAAAAAElFTkSuQmCC',
		itemStyle: {
			color: "#fff",
			borderColor: "#00DDFF",
		},
		lineStyle: {
			color: "#00DDFF"
		},
		areaStyle: {
			color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
				offset: 0,
				color: "rgba(0, 221, 255, 0)"
			},
				{
					offset: 1,
					color: "rgba(0, 221, 255, 0.5)"
				}
			], false)

		},
	}
	]
}
