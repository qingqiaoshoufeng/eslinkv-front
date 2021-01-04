import {getInput} from '../../../../lib'

const config = {
    animation: true,
    config: {
        title: true
    },
};
const value = {
    layout: {
        size: {
            width: 300,
            height: 32
        },
        position: {
            value: 'relative'
        }
    },
    api: {
        data: JSON.stringify({})
    },
    config: {
        title: '供气量日趋势'
    }
}
const configSource = {
    config: {
        fields: {
            title: getInput('title', '标题')
        }
    }
}

export {config, configSource, value}
