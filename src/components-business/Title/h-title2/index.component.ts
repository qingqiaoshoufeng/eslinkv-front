export const config = {
    animation: true,
    config: {
        title: true,
    }
}
export const value = {
    api: {
        data: JSON.stringify({
            value: 0
        })
    },
    layout: {
        size: {
            width: 220,
            height: 58
        },
        position: {
            value: 'relative'
        }
    },
    config: {
        title: '标题'
    }
}

export const customConfig = [
	{
		prop: 'config.config.title',
		label: '标题',
		type: 'func-input',
	}
]
