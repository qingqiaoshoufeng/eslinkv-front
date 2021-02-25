export const customConfig = [
	{
		prop: 'desc',
		label: '标题',
		type: 'func-input',
	},
	{
		prop: 'icon',
		label: 'icon',
		type: 'func-input',
	}
]

export const value = {
    layout: {
        size: {
            width: 150,
            height: 70
        },
        position: {
            value: 'relative'
        }
    },
    api: {
        data: JSON.stringify({
            value: {
                context: 24,
            },
        }),
    },
    config: {
        icon: '/static/images/project/tip-qizhong.svg',
        desc: '标题',
    },
}
