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
            width: 300,
            height: 40
        },
        position: {
            value: 'relative'
        }
    },
    config: {
        title: '昨日用气量：',
        suffix: 'm³',
    },
    api: {
        data: JSON.stringify({
            value: 3320
        })
    }
}
