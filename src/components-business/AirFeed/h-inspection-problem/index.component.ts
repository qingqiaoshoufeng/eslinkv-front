import {barData, dashLineData} from "./options";

export const config = {animation: true}
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
