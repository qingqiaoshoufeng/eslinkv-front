export const customConfig = [
	{
		prop: 'desc',
		label: '描述',
		type: 'func-input'
	}
]

export const value = {
    layout: {
        size: {
            width: 240,
            height: 120
        },
        position: {
            value: 'relative'
        }
    },
    api: {
        data: JSON.stringify({
            value: 24
        })
    },
    config: {
        desc: '标题'
    }
}
