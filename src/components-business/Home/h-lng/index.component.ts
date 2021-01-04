import {getInput} from '../../../../lib'

const config = {
    animation: true,
    config: {
        desc1: true,
        desc2: true
    }
}
const value = {
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
const configSource = {
    config: {
        fields: {
            desc1: getInput('desc1', '描述1'),
            desc2: getInput('desc2', '描述2')
        }
    }
}

export {config, configSource, value}
