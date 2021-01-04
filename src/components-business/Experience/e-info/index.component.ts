import {getInput} from '../../../../lib'

const config = {
    animation: true,
    config: {
        icon: true,
        desc1: true,
        desc2: true
    },
};
const value = {
    layout: {
        size: {
            width: 480,
            height: 85
        },
        position: {
            value: 'relative'
        }
    },
    api: {
        data: JSON.stringify({
            num: 22326,
            changeNum: 12,
            isIncrease: true
        })
    },
    config: {
        icon: '/static/images/experience/info-icon1.svg',
        desc1: '累计粉丝(人)',
        desc2: '今日新增(人)'
    }
}
const configSource = {
    config: {
        fields: {
            icon: getInput('icon', '标题'),
            desc1: getInput('desc1', '描述1'),
            desc2: getInput('desc2', '描述2')
        }
    }
}

export {config, value, configSource}
