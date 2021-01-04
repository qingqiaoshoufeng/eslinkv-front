import {getInput} from '../../../../lib'

const configSource = {
    config: {
        fields: {
            title: getInput('title', '标题'),
        }
    }
}
const config = {
    animation: true,
    config: {
        title: true,
    }
}
const value = {
    api: {
        data: JSON.stringify({
            value: 0
        })
    },
    layout: {
        size: {
            width: 220,
            height: 58
        },
        position: {
            value: 'relative'
        }
    },
    config: {
        title: '标题'
    }
}

export {configSource, config, value}
