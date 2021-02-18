import {getInput} from '../../../../lib'

const configSource = {
    config: {
        fields: {
            title: getInput('title', '描述'),
            color: getInput('color', '颜色'),
        }
    }
}
const config = {
    animation: true,
    config: {
        color: true,
        title: true,
    },
}
const value = {
    layout: {
        size: {
            width: 275,
            height: 120
        },
        position: {
            value: 'relative'
        }
    },
    api: {
        data: JSON.stringify({
            value: [
                {title: '设计量：', value: 34452},
                {title: '领用量：', value: 23445},
                {title: '核销量：', value: 13345}
            ]
        })
    },
    config: {
        color: JSON.stringify(['rgba(0, 62, 144, 0.8)', 'rgba(0, 145, 210, 0.8)', 'rgba(0, 233, 194, 0.8)']),
        title: '钢管（米）',
    },
}

export {config, value}
