import {getInput} from '../../../../lib'

export const configSource = {
	config: {
		fields: {
			color1: getInput('color1', '条形图颜色1'),
			color2: getInput('color2', '条形图颜色2'),
			desc1: getInput('desc1', '条形图名称1'),
			desc2: getInput('desc2', '条形图名称2'),
			unit1: getInput('unit1', '条形图左侧单位'),
			unit2: getInput('unit2', '条形图右侧单位')
		},
	},
}

export const config = {
	animation: true,
	config: {
		color1: true,
		color2: true,
		desc1: true,
		desc2: true,
		unit1: true,
		unit2: true,
	}
}
export const value = {
	layout: {
		size: {
			width: 480,
			height: 214
		},
		position: {
			value: 'relative'
		}
	},
	api: {
		data: JSON.stringify(
			[
				{
					yValue1: 120,
					yValue2: 120,
					xValue: '5月',
				},
				{
					yValue1: 200,
					yValue2: 200,
					xValue: '6月',
				},
				{
					yValue1: 150,
					yValue2: 150,
					xValue: '7月',
				},
				{
					yValue1: 80,
					yValue2: 80,
					xValue: '8月',
				},
				{
					yValue1: 70,
					yValue2: 70,
					xValue: '9月',
				},
				{
					yValue1: 110,
					yValue2: 110,
					xValue: '10月',
				},
				{
					yValue1: 130,
					yValue2: 130,
					xValue: '11月',
				},
			]
		),
	},
	config: {
		color1: '#2C99FF',
		color2: '#01FDD2',
		desc1: '报警次数',
		desc2: '报警表数',
		unit1: '次',
		unit2: '台',
	}
}
