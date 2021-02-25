import {barData, dashLineData} from './options'

export const value = {
	api: {
		data: JSON.stringify({
			barData: barData,
			dashLineData: dashLineData
		})
	},
	layout: {
		size: {
			width: 480,
			height: 208
		},
		position: {
			value: 'relative'
		}
	}
}
