export const customConfig = [
	{
		prop: 'desc1',
		label: '描述1',
		type: 'func-input'
	},
	{
		prop: 'desc2',
		label: '描述2',
		type: 'func-input'
	}
]

export const value = {
    layout: {
        size: {
            width: 364,
            height: 112
        },
        position: {
            value: 'relative'
        }
    },
    api: {
        data: JSON.stringify({
            value1: 53366,
            value2: 23656
        })
    },
    config: {
        desc1: '今日LNG气化量m³',
        desc2: '今日LNG加气量m³'
    }
}
