import {getInput} from '../../../../lib'

const configSource = {
    config: {
        fields: {
            unit: getInput('unit', '单位'),
        }
    }
}
const config = {
    animation: true,
    config: {
        unit: true,
    }
}
const value = {
    layout: {
        size: {
            width: 756,
            height: 56
        },
        position: {
            value: 'relative'
        }
    },
    api: {
        data: JSON.stringify([
            {
                value: 1233556,
                percent: 60,
                name: '居民户',
                icon: '/static/images/home/gas-use1.svg',
            },
            {
                value: 69999,
                percent: 30,
                name: '公建户',
                icon: '/static/images/home/gas-use2.svg',
            },
            {
                value: 45332,
                percent: 20,
                name: '工业户',
                icon: '/static/images/home/gas-use3.svg',
            }
        ])
    },
    config: {
        unit: '万m³',
    }
}

export {config, value}
