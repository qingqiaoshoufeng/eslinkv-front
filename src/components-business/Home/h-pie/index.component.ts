import {getInput} from '../../../../lib'

const configSource = {
    config: {
        fields: {
            unit: getInput('unit', '单位'),
            title1: getInput('title1', '标题1'),
            title2: getInput('title2', '标题2'),
            startAngle: getInput('startAngle', '起始角度'),
        }
    }
}
const config = {
    animation: true,
    config: {
        unit: true,
        title1: true,
        startAngle: true,
        title2: true,
    }
}
const value = {
    layout: {
        size: {
            width: 820,
            height: 420
        },
        position: {
            value: 'relative'
        }
    },
    api: {
        data: JSON.stringify([
            {
                name: '城区1',
                value: 72
            },
            {
                name: '城区2',
                value: 32
            },
            {
                name: '城区3',
                value: 12
            },
        ])
    },
    config: {
        unit: '万m³',
        title1: '区域',
        title2: '销售气量',
        startAngle: 270,
    }
}

export {config, value}
