export const value = {
    layout: {
        size: {
            width: 400,
            height: 67
        },
        position: {
            value: 'relative'
        }
    },
    api: {
        data: JSON.stringify({
            num: 2354
        })
    },
    config: {
        desc: '线路累积接待人数',
        unit: '人'
    }
}

export const customConfig = [
	{
		prop: 'desc',
		label: '描述',
		type: 'func-input'
	},
	{
		prop: 'unit',
		label: '单位',
		type: 'func-input'
	}
]
