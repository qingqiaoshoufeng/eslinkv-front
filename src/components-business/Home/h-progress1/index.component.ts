export const customConfig = [
	{
		prop: 'title',
		label: '标题',
		type: 'func-input',
	},
	{
		prop: 'unit',
		label: '单位',
		type: 'func-input',
	}
]

export const value = {
    layout: {
        size: {
            width: 208,
            height: 60
        },
        position: {
            value: 'relative'
        }
    },
    api: {
        data: JSON.stringify({
            value: 2345,
            percent: 88
        })
    },
    config: {
        title: '标题',
        unit: '单',
    }
}

