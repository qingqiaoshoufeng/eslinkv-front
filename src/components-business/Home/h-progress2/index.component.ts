import {getInput} from '../../../../lib'

const configSource = {
    config: {
        fields: {
            title: getInput('title', '标题'),
            suffix: getInput('suffix', '后缀'),
        }
    }
}
const config = {
    animation: true,
    config: {
        title: true,
        suffix: true,
    }
}
const value = {
    layout: {
        size: {
            width: 480,
            height: 60
        },
        position: {
            value: 'relative'
        }
    },
    api: {
        data: JSON.stringify({
            value: 10,
            max: 100
        })
    },
    config: {
        title: '标题',
        suffix: '%',
    }
}

export {config, configSource, value}