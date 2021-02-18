import {getInput} from '../../../../lib'

const config = {
    animation: true,
    config: {
        title: true
    },
};
const value = {
    layout: {
        size: {
            width: 364,
            height: 120
        },
        position: {
            value: 'relative'
        }
    },
    api: {
        data: JSON.stringify({
            count: 7632935
        })
    },
    config: {
        title: '年度累计供气量(m³)'
    }
}
const configSource = {
    config: {
        fields: {
            title: getInput('title', '标题')
        }
    }
}

export {config, value}
