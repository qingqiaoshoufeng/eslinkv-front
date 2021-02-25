export const customConfig = [
	{
		prop: 'title',
		label: '标题',
		type: 'func-input',
	},
	{
		prop: 'suffix',
		label: '后缀',
		type: 'func-input',
	}
]

export const value = {
    layout: {
        size: {
            width: 480,
            height: 60
        },
        position: {
            value: 'relative'
        }
    },
    api: {
        data: JSON.stringify({
            value: 10,
            max: 100
        })
    },
    config: {
        title: '标题',
        suffix: '%',
    }
}
