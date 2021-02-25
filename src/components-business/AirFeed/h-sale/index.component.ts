import {test} from './options'

export const value = {
	layout: {
		size: {
			width: 992,
			height: 795
		},
		position: {
			value: 'relative'
		}
	},
	api: {
		data: JSON.stringify({
			lngPrice: 298,
			station: [
				{
					name: '东部站',
					percent: 24,
					value: '324,324',
					chart: test
				},
				{
					name: '西部站',
					percent: 66,
					value: '324,324',
					chart: test
				},
				{
					name: '门下站',
					percent: 11,
					value: '324,324',
					chart: test
				},
				{
					name: '西林站',
					percent: 5,
					value: '324,324',
					chart: test
				},
				{
					name: '望元站',
					percent: 52,
					value: '324,324',
					chart: test
				},
				{
					name: '西部站',
					percent: 66,
					value: '324,324',
					chart: test
				},
				{
					name: '门下站',
					percent: 11,
					value: '324,324',
					chart: test
				},
				{
					name: '西林站',
					percent: 5,
					value: '324,324',
					chart: test
				},
				{
					name: '望元站',
					percent: 52,
					value: '324,324',
					chart: test
				}
			]
		})
	}
}
