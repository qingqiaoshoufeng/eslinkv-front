export const customConfig = [
	{
		prop: 'color',
		label: '线条颜色',
		type: 'func-color'
	},
	{
		prop: 'unit',
		label: '纵坐标单位',
		type: 'func-input'
	},
	{
		prop: 'icon',
		label: '拐点图标', // png转base64，data:开头
		type: 'func-input'
	}
]
export const value = {
	layout: {
		size: {
			width: 480,
			height: 228
		},
		position: {
			value: 'relative'
		}
	},
	api: {
		data: JSON.stringify({
			data: [
				{
					name: '10-1',
					value: 10
				},
				{
					name: '10-2',
					value: 40
				},
				{
					name: '10-3',
					value: 30
				},
				{
					name: '10-4',
					value: 20
				},
				{
					name: '10-5',
					value: 10
				},
				{
					name: '10-6',
					value: 50
				},
				{
					name: '10-7',
					value: 70
				},
				{
					name: '10-8',
					value: 60
				},
				{
					name: '10-9',
					value: 80
				},
				{
					name: '10-10',
					value: 40
				}
			]
		})
	},
	config: {
		unit: '户',
		color: '#00DDFF',
		icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFUSURBVHgBjVNBTsNADJzNgSPqDwhCHDjBE+AF8AT6A35AeQH8IPwg9AWBFyQ3JNqwOXFNOSEhgbG9bfE2SdWRnGy83rHXnjhsYkbnSHDJqyu2dOmt1L5xhxPX2PBkvSppBE/37Mnxi09+X+DIObUEYxBesIcCNcdIbARx1FRiTo9MMsIQZG9ODxobkUhm2dgVkkgqUbxSyh/eZiailK1gaykgF19USU2t9osXGTNebxxeHbRoI5IZTULVcp83OjMEOQ2jMFWEyvlB9nq0HW3UCz6b9LRogWF0JiQEDT7owPiqLQTT9Spcu0pYIFN8sVD+MR6oQnw3JrUSBOnKSMrOGHPT/SKaQBCe10Yqgroy7IqO8EQY7zzOXp0bhMyZjn4pvDCFQ7eA45+H+LmPUoVltKGlerrlPc8x4UeTMwzXU16KH0x455S/ViSNNpvwhGP3bMP/AKHGMIU7wYTyAAAAAElFTkSuQmCC'
	}
}
