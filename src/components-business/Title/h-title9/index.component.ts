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
            width: 988,
            height: 40
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