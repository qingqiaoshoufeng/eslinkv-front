import {getInput} from '../../../../lib'

const config = {
    animation: true,
    config: {
        suffix: true,
        title: true
    }
}

const configSource = {
    config: {
        fields: {
            title: getInput('title', '标题'),
            suffix: getInput('suffix', '后缀'),
        }
    },
}

const value = {
    layout: {
        size: {
            width: 300,
            height: 40
        },
        position: {
            value: 'relative'
        }
    },
    config: {
        title: '昨日用气量：',
        suffix: 'm³',
    },
    api: {
        data: JSON.stringify({
            value: 3320
        })
    }
}

export {configSource, config, value}
