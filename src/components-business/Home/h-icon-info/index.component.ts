import {getInput, getSelect} from '../../../../lib'

const configSource = {
    config: {
        fields: {
            icon: getSelect('icon', '图片', ['/static/icons/cylinder.svg']),
            text: getInput('text', '文字'),
            suffix: getInput('suffix', '后缀'),
        }
    }
}
const config = {
    animation: true,
    config: {
        icon: true,
        text: true,
        suffix: true,
    }
}
const value = {
    layout: {
        size: {
            width: 145,
            height: 222
        },
        position: {
            value: 'relative'
        }
    },
    api: {
        data: JSON.stringify({
            num: '11.01',
        })
    },
    config: {
        icon: '/static/icons/cylinder.svg',
        text: '2019年销售气量',
        suffix: '亿m³'
    }
}

export {configSource, config, value}
