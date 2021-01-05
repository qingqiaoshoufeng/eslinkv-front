import {getInput} from '../../../../lib'

const test = [{"x": "1月", "y1": 10, "y2": 23}, {"x": "2月", "y1": 18, "y2": 60}, {
	"x": "3月",
	"y1": 5,
	"y2": 20
}, {"x": "4月", "y1": 23, "y2": 36}, {"x": "5月", "y1": 14, "y2": 23}, {"x": "6月", "y1": 40, "y2": 58}, {
	"x": "7月",
	"y1": 58,
	"y2": 44
}, {"x": "8月", "y1": 50, "y2": 76}, {"x": "9月", "y1": 45, "y2": 68}, {"x": "10月", "y1": 56, "y2": 76}, {
	"x": "11月",
	"y1": 53,
	"y2": 73
}, {"x": "12月", "y1": 47, "y2": 68}]
export const config = {
	animation: true,
	config: {
		color1: true,
		color2: true,
		// lineName1: true,
		// lineName2: true,
		unit: true
	},
};
export const value = {
	layout: {
		size: {
			width: 992,
			height: 243
		},
		position: {
			value: 'relative'
		}
	},
	api: {
		data: JSON.stringify(
			{
				data: test,
				lastTime:2020,
				nowTime:2021,
			})
	},
	config: {
		color1: '#2C99FF',
		color2: '#E5615B',
		// lineName1: '今年',
		// lineName2: '去年',
		unit: '单'
	}
}
export const configSource = {
	config: {
		fields: {
			color1: getInput('color1', '折线1颜色'),
			color2: getInput('color2', '折线2颜色'),
			// lineName1: getInput('lineName1', '折线1名称'),
			// lineName2: getInput('lineName2', '折线2名称'),
			unit: getInput('unit', '单位')
		}
	},
}
