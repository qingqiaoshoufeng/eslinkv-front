import {getInput} from "@lib/views/core/widgets/parts/lib/config-tools";

export const config = {
	animation: true,
	config: {
		title: true,
		desc: true
	},
}
export const value = {
	layout: {
		size: {
			width: 160,
			height: 208
		},
		position: {
			value: 'relative'
		}
	},
	api: {
		data: JSON.stringify({
			num: 59,
			chartData: [
				{
					x: '2020.1',
					y: 30
				},
				{
					x: '2020.2',
					y: 40
				},
				{
					x: '2020.3',
					y: 46
				},
				{
					x: '2020.4',
					y: 55
				},
				{
					x: '2020.5',
					y: 60
				},
				{
					x: '2020.6',
					y: 76
				},
				{
					x: '2020.7',
					y: 90
				}
			]
		})
	},
	config: {
		title: '近7日抢修数量',
		desc: '近7日趋势'
	}
}
export const configSource = {
	config: {
		fields: {
			title: getInput('title', '标题'),
			desc: getInput('desc', '底下描述')
		}
	},
}
