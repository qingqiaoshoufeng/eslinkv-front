export const customConfig = [
	{
		prop: 'title',
		label: '文字',
		type: 'func-input'
	}
]

export const value = {
    layout: {
        size: {
            width: 480,
            height: 220
        },
        position: {
            value: 'relative'
        }
    },
    api: {
        data: JSON.stringify({
            value: [['2015', 250], ['2016', 350], ['2017', 150], ['2018', 280], ['2019', 250], ['2020', 250]]
        })
    },
    config: {
        title: '数量'
    }
}
