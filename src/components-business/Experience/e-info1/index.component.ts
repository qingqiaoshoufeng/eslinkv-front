import {getInput} from '../../../../lib'

const config = {
    animation: true,
    config: {
        desc: true,
        unit: true
    },
};
const value = {
    layout: {
        size: {
            width: 400,
            height: 67
        },
        position: {
            value: 'relative'
        }
    },
    api: {
        data: JSON.stringify({
            num: 2354
        })
    },
    config: {
        desc: '线路累积接待人数',
        unit: '人'
    }
}
const configSource = {
    config: {
        fields: {
            desc: getInput('desc', '描述'),
            unit: getInput('unit', '单位')
        }
    }
}

export {config, value, configSource}