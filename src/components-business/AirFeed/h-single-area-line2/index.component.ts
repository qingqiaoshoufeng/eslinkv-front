import {getInput} from '../../../../lib';

export const configSource = {
	config: {
		fields: {
			title: getInput('title', '标题'),
		}
	}
}

export const config = {
	animation: true,
	config: {
		title: true
	}
}
export const value = {
	layout: {
		size: {
			width: 480,
			height: 208
		},
		position: {
			value: 'relative'
		}
	},
	api: {
		data: JSON.stringify({
			data: [
				{
					name: "1月",
					value: 10
				},
				{
					name: "2月",
					value: 40
				},
				{
					name: "3",
					value: 30
				},
				{
					name: "4月",
					value: 20
				},
				{
					name: "5月",
					value: 10
				},
				{
					name: "6月",
					value: 50
				}
			]
		})
	},
	config: {
		title: '%'
	}
}