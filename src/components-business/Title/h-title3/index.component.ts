import {getInput, getSelect} from '../../../../lib'

const configSource = {
    config: {
        fields: {
            background: getSelect('background', '背景图片',
                ['/static/icons/h-title3-1.svg', '/static/icons/h-title3-2.svg', '/static/icons/h-title3-3.svg', '/static/icons/h-title3-4.svg']),
            color: getInput('color', '颜色'),
            suffix: getInput('suffix', '后缀'),
            subTitle: getInput('subTitle', '副标题'),
        }
    }
}

const customConfig = [
	{
		prop: 'color',
		label: '颜色',
		type: 'func-color',
	},
	{
		prop: 'suffix',
		label: '后缀',
		type: 'func-input',
	},
	{
		prop: 'subTitle',
		label: '副标题',
		type: 'func-input',
	},
	{
		prop: 'background',
		label: '背景图片',
		type: 'func-background',
		options: ['/static/icons/h-title3-1.svg', '/static/icons/h-title3-2.svg', '/static/icons/h-title3-3.svg', '/static/icons/h-title3-4.svg']
	}
]

const value = {
    layout: {
        size: {
            width: 220,
            height: 58
        },
        position: {
            value: 'relative'
        }
    },
    api: {
        data: JSON.stringify({
            title: 1000,
        })
    },
    config: {
        background: '/static/icons/h-title3-1.svg',
        suffix: '台',
        color: 'rgba(0,221,255,1)',
        subTitle: '分户供暖用户',
    }
}

export {configSource, customConfig, value}
