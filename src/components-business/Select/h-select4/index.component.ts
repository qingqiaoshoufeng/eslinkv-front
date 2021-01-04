import format from "date-fns/format";

export const config = {animation: true}

export const value = {
	api: {
		data: {
			selectType: '日',
			selectValue: format(new Date(), 'yyyy.MM.dd'),
		},
		bind: {
			enable: true,
			role: ['provider']
		}
	},
	layout: {
		size: {
			width: 180,
			height: 32
		},
		position: {
			value: 'relative'
		}
	}
}
