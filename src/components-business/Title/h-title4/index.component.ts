import {getInput} from '../../../../lib'

const config = {
    animation: true,
    config: {
        title: true
    }
}

const configSource = {
    config: {
        fields: {
            title: getInput('title', '标题'),
        }
    },
}

const value = {
    layout: {
        size: {
            width: 154,
            height: 76
        },
        position: {
            value: 'relative'
        }
    },
    api: {
        data: JSON.stringify({
            value: 99999
        })
    },
    config: {
        title: '标题'
    }
}

export {config, configSource, value}