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
            width: 240,
            height: 120
        },
        position: {
            value: 'relative'
        }
    },
    api: {
        data: JSON.stringify({
            value: 24,
        }),
    },
    config: {
        desc: '标题',
    },
}

export {configSource, config, value}