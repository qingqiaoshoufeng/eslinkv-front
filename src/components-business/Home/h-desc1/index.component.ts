import {getInput} from '../../../../lib'

const config = {
    animation: true,
    config: {
        unit: true
    },
};
const value = {
    layout: {
        size: {
            width: 180,
            height: 32
        },
        position: {
            value: 'relative'
        }
    },
    api: {
        data: JSON.stringify({
            value: 7632935
        })
    },
    config: {
        unit: 'm³'
    }
}
const configSource = {
    config: {
        fields: {
            unit: getInput('unit', '单位')
        }
    }
}


export {config, value}
