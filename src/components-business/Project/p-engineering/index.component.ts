import {getInput} from '../../../../lib'

const configSource = {
    config: {
        fields: {
            desc: getInput('desc', '描述'),
        },
    },
}

const config = {
    animation: true,
    config: {
        desc: true,
    },
}
const value = {
    layout: {
        size: {
            width: 340,
            height: 150
        },
        position: {
            value: 'relative'
        }
    },
    api: {
        data: JSON.stringify({
            value: 652,
        }),
    },
    config: {
        desc: '无安全事故（天）',
    },
}

export {config, configSource, value}