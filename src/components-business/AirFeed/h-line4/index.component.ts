import {getInput} from '../../../../lib'

export const config = {
	animation: true,
	config: {
		unit: true
	}
};
export const value = {
	layout: {
		size: {
			width: 608,
			height: 256
		},
		position: {
			value: 'relative'
		}
	},
	api: {
		data: JSON.stringify([
			{
				x: '13:00',
				y: 52
			},
			{
				x: '14:00',
				y: 72
			},
			{
				x: '15:00',
				y: 40
			},
			{
				x: '16:00',
				y: 18
			},
			{
				x: '17:00',
				y: 42
			},
			{
				x: '18:00',
				y: 50
			},
			{
				x: '19:00',
				y: 35
			},
			{
				x: '20:00',
				y: 8,
			}
		])
	},
	config: {
		unit: 'm³'
	}
}
export const configSource = {
	config: {
		fields: {
			unit: getInput('unit', '单位'),
		}
	},
}
