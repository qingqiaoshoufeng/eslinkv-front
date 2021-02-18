import {getInput} from '../../../../lib'

const configSource = {
    config: {
        fields: {
            title: getInput('title', '标题'),
            unit: getInput('unit', '单位'),
        }
    }
}
const config = {
    animation: true,
    config: {
        title: true,
        unit: true,
    }
}
const value = {
    layout: {
        size: {
            width: 208,
            height: 60
        },
        position: {
            value: 'relative'
        }
    },
    api: {
        data: JSON.stringify({
            value: 2345,
            percent: 88
        })
    },
    config: {
        title: '标题',
        unit: '单',
    }
}

export {config, value}

