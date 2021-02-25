export const customConfig = [
	{
		prop: 'tableHeader',
		label: '表头',
		type: 'func-input',
	}
]

export const value = {
    layout: {
        size: {
            width: 654,
            height: 187
        },
        position: {
            value: 'relative'
        }
    },
    api: {
        data: JSON.stringify([
            {
                startTime: '11/12',
                dangerType: '压力异常',
                deviceType: '调压器',
                rank: '一级',
                status: '未处理',
                handleTime: '--'
            },
            {
                startTime: '11/10',
                dangerType: '压力异常',
                deviceType: '调压器',
                rank: '一级',
                status: '已处理',
                handleTime: '11/10'
            },
            {
                startTime: '11/10',
                dangerType: '压力异常',
                deviceType: '调压器',
                rank: '一级',
                status: '已处理',
                handleTime: '11/10'
            },
            {
                startTime: '11/10',
                dangerType: '压力异常',
                deviceType: '调压器',
                rank: '一级',
                status: '已处理',
                handleTime: '11/10'
            },
            {
                startTime: '11/10',
                dangerType: '压力异常',
                deviceType: '调压器',
                rank: '一级',
                status: '已处理',
                handleTime: '11/10'
            },
            {
                startTime: '11/10',
                dangerType: '压力异常',
                deviceType: '调压器',
                rank: '一级',
                status: '已处理',
                handleTime: '11/10'
            },
            {
                startTime: '11/10',
                dangerType: '压力异常',
                deviceType: '调压器',
                rank: '一级',
                status: '已处理',
                handleTime: '11/10'
            }
        ])
    },
    config: {
        tableHeader: ['发现时间', '隐患类型', '设备类型', '隐患等级', '隐患状态', '处理时间']
    }
}
