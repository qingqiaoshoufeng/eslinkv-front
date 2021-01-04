import {getInput, getBooleanInput, getInputNumber} from '../../../../lib'

export const configSource = {
	config: {
		fields: {
			color1: getInput('color1', '条形图颜色1'),
			color2: getInput('color2', '条形图颜色2'),
			desc1: getInput('desc1', '条形图名称1'),
			desc2: getInput('desc2', '条形图名称2'),
			title: getInput('title', '条形图单位'),
			showBackground: getBooleanInput('showBackground', '柱状图柱的背景'),
			showLegend: getBooleanInput('showLegend', '显示图例'),
			barBorderRadius: getInputNumber('barBorderRadius', '柱的圆角'),
		},
	},
};

export const config = {
	animation: true,
	config: {
		color1: true,
		color2: true,
		desc1: true,
		desc2: true,
		title: true,
		showBackground: true,
		showLegend: true,
		barBorderRadius: true,
	}
};
export const value = {
	layout: {
		size: {
			width: 480,
			height: 226
		},
		position: {
			value: 'relative'
		}
	},
	api: {
		data: JSON.stringify({
			legend1: '', // 没有则取config中的数据
			legend2: '',
			data: [
				{yValue1: 120, yValue2: 120, xValue: '5月'},
				{yValue1: 200, yValue2: 200, xValue: '6月'},
				{yValue1: 150, yValue2: 150, xValue: '7月'},
				{yValue1: 80, yValue2: 80, xValue: '8月'},
				{yValue1: 70, yValue2: 70, xValue: '9月'},
				{yValue1: 110, yValue2: 110, xValue: '10月'},
				{yValue1: 130, yValue2: 130, xValue: '11月'},
			]
		}),
	},
	config: {
		color1: '#2C99FF',
		color2: '#01FDD2',
		desc1: '工商户',
		desc2: '居民户',
		title: '台',
		showLegend: true,
		showBackground: true,
		barBorderRadius: 4
	}
};
