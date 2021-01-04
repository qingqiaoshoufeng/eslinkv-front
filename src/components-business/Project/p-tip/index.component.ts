import {getInput, getSelect} from '../../../../lib'

const configSource = {
    config: {
        fields: {
            desc: getInput('desc', '标题'),
            icon: getSelect('icon', 'icon', [
                '/static/images/project/tip-qizhong.svg',
            ]),
        },
    },
};

const config = {
    animation: true,
    config: {
        icon: true,
        desc: true,
    },
};
const value = {
    layout: {
        size: {
            width: 150,
            height: 70
        },
        position: {
            value: 'relative'
        }
    },
    api: {
        data: JSON.stringify({
            value: {
                context: 24,
            },
        }),
    },
    config: {
        icon: '/static/images/project/tip-qizhong.svg',
        desc: '标题',
    },
}

export {configSource, config, value}