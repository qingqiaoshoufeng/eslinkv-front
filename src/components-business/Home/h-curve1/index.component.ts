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
    },
}
const value = {
    layout: {
        size: {
            width: 480,
            height: 220
        },
        position: {
            value: 'relative'
        }
    },
    api: {
        data: JSON.stringify([
            {
                x: 10,
                y: 4000
            },
            {
                x: 11,
                y: 6000
            },
            {
                x: 12,
                y: 5000
            },
            {
                x: '01',
                y: 6000
            },
            {
                x: '02',
                y: 7000
            },
            {
                x: '03',
                y: 6000
            },
            {
                x: '04',
                y: 4000
            }
        ])
    },
    config: {
        title: '用户'
    }
}
export {config, value}
