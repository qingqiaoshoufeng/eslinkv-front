export const customConfig = [
	{
		prop: 'icon',
		label: '图片',
		type: 'func-input'
	},
	{
		prop: 'text',
		label: '文字',
		type: 'func-input'
	},
	{
		prop: 'suffix',
		label: '后缀',
		type: 'func-input'
	}
]

export const value = {
    layout: {
        size: {
            width: 145,
            height: 222
        },
        position: {
            value: 'relative'
        }
    },
    api: {
        data: JSON.stringify({
            num: '11.01'
        })
    },
    config: {
        icon: '/static/icons/cylinder.svg',
        text: '2019年销售气量',
        suffix: '亿m³'
    }
}
