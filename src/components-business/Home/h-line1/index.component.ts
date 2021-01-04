import {getInput} from '../../../../lib'

const configSource = {
    config: {
        fields: {
            title: getInput('title', '文字'),
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
        data: JSON.stringify({
            value: [['2015', 250], ['2016', 350], ['2017', 150], ['2018', 280], ['2019', 250], ['2020', 250]]
        })
    },
    config: {
        title: '数量'
    }
}

export {config, configSource, value}
