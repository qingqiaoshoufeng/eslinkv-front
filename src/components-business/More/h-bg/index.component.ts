import {getInput} from '../../../../lib'

const configSource = {
    config: {
        fields: {
            sceneId: getInput('sceneId', '场景ID'),
        },
    },
};
const value = {
    layout: {
        size: {
            width: 3500,
            height: 1050
        },
        position: {
            value: 'relative'
        }
    },
    config: {
        sceneId: '',
    },
};
const config = {
    animation: true,
    config: {
        sceneId: true
    }
}

export {config, value}
