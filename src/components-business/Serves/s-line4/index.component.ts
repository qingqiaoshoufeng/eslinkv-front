import {getInput, getBooleanInput} from "@lib/views/core/widgets/parts/lib/config-tools";

export const config = {
	animation: true,
	config: {
		unit: true,
		lineColor: true,
		scale: true,
		isShowXAxis: true
	}
};
export const value = {
	layout: {
		size: {
			width: 958,
			height: 140
		},
		position: {
			value: 'relative'
		}
	},
	api: {
		data: JSON.stringify([
			{
				x: '13:00',
				y: 8
			},
			{
				x: '14:00',
				y: 12
			},
			{
				x: '15:00',
				y: 22
			},
			{
				x: '16:00',
				y: 32
			},
			{
				x: '17:00',
				y: 25
			},
			{
				x: '18:00',
				y: 29
			},
			{
				x: '19:00',
				y: 32
			},
			{
				x: '20:00',
				y: 15,
			}
		])
	},
	config: {
		unit: 'm³',
		lineColor: '#FFDC45',
		lineStopColor: '',
		scale: false,
		isShowXAxis: false
	}
}
export const configSource = {
	config: {
		fields: {
			unit: getInput('unit', '单位'),
			lineColor: getInput('lineColor', '线条颜色'),
			lineStopColor: getInput('lineStopColor', '渐变后颜色'),
			isShowXAxis: getBooleanInput('isShowXAxis', '显示横坐标'),
			scale: getBooleanInput('scale', '纵坐标是否以0开始'),
		}
	},
}
