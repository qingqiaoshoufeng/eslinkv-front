import {getInput} from '../../../../lib'

export const config = {
	animation: true,
	config: {
		title: true,
		mainColor: true,
		bgColor: true,
		titleColor: true,
		subTitleColor: true,
		pointerColor: true,
	},
};
export const value = {
	layout: {
		size: {
			width: 170,
			height: 90
		},
		position: {
			value: 'relative'
		}
	},
	api: {
		data: JSON.stringify({
			percent: 30
		})
	},
	config: {
		title: '巡检完成率',
		mainColor: '#00DDFF',
		bgColor: 'rgba(0, 87, 169, 0.5)',
		pointerColor: '#00FFCF',
		titleColor: '#fff',
		subTitleColor: '#00DDFF',
	}
}
export const configSource = {
	config: {
		fields: {
			title: getInput('title', '标题'),
			mainColor: getInput('mainColor', '环形主颜色'),
			bgColor: getInput('bgColor', '环形背景色'),
			pointerColor: getInput('pointerColor', '圆点颜色'),
			titleColor: getInput('titleColor', '标题颜色（百分比）'),
			subTitleColor: getInput('subTitleColor', '副标题颜色（文字）'),
		}
	},
}
