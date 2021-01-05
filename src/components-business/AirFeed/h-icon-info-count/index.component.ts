import {getInput, getSelect} from '../../../../lib'

export const config = {
    animation: true,
    config: {
        text: true,
        icon: true,
    },
};
export const configSource = {
    config: {
        fields: {
            text: getInput('text', '描述'),
            icon: getSelect('icon', 'icon', [
                '/static/icons/h-call-count-statistics-1.svg',
            ]),
        },
    },
};
export const value = {
    api: {
        data: JSON.stringify({
            icon: '/static/icons/phone-border.svg',
            minutes: 680230,
        }),
    },
    config: {
        icon: '/static/icons/phone-border.svg',
        text: '累计通话时长:',
    },
    layout: {
        size: {
            width: 480,
            height: 48
        },
        position: {
            value: 'relative'
        }
    }
};
