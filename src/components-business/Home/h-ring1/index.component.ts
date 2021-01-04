import {getInput, getSelect} from '../../../../lib'

const configSource = {
    config: {
        fields: {
            background: getSelect('background', '背景图片', ['/static/icons/h-ring1-1.svg', '/static/icons/h-ring1-2.svg', '/static/icons/h-ring1-3.svg']),
            color: getInput('color', '颜色'),
            suffix: getInput('suffix', '后缀'),
        }
    }
}
const config = {
    animation: true,
    config: {
        background: true,
        color: true,
        suffix: true,
    }
}
const value = {
    layout: {
        size: {
            width: 480,
            height: 276
        },
        position: {
            value: 'relative'
        }
    },
    api: {
        data: JSON.stringify(
            [
                {value: 12.5, des: '111', title: '南门站'},
                {value: 12.5, des: '', title: '北门站'},
                {value: 12.5, des: '', title: '下沙门站'},
                {value: 12.5, des: '', title: '江东门站'},
                {value: 12.5, des: '', title: '所前门站'},
                {value: 12.5, des: '', title: '杭州东站'},
                {value: 12.5, des: '', title: '杭州西站'},
            ]
        )
    },
    config: {
        background: '/static/icons/h-ring1-1.svg',
        suffix: '%',
        color: JSON.stringify(['#db4f49', '#367cf6', '#84e4fc', '#f8cd47', '#fceb50', '#ed9144', '#5fcbb9']),
    }
}

export {config, configSource, value}