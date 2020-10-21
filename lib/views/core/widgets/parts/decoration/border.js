import styleParser from '../lib/style-parser'
import widgetMixin from '../lib/widget-mixin'
import { getInput, getSelect, getInputNumber, getColors } from '../lib/config-tools'

const getTagName = type => {
    if (type !== 'custom') return `dv-border-box-${type}`
    return 'div'
}
// 组件参数配置
const localConfigSource = Object.freeze({
    config: {
        fields: {
            type: getSelect('type', '边框样式', [1, 2, 3, 4, '4-reverse', 5, '5-reverse', 6, 7, 8, 9, 10, 11, 12, 13]),
            color: getColors('color', '配色'),
            title: getInput('title', '边框标题'),
            duration: getInputNumber('duration', '单次动画时长', { placeholder: '秒' })
        }
    }
})

const localConfigValue = Object.freeze({
    layout: {
        size: {
            width: 500,
            height: 300
        },
        zIndex: 1,
        opacity: 1
    },
    config: {
        type: 1,
        color: ['#3DE7C9', '#00BAFF'],
        title: '',
        duration: 4
    },
    api: {
        data: 1
    }
})

// 用于筛选预置配置项
const configParseMap = Object.freeze({
    widget: true,
    layout: {
        size: {
            '$width.height.unit': true
        },
        position: true,
        zIndex: true,
        custom: true,
        opacity: true
    },
    config: {
        type: true,
        color: true,
        title: true,
        duration: true
    },
    animation: true
})

export default {
    name: 'widget-border',
    label: '边框',
    mixins: [widgetMixin],
    render: function (createElement) {
        const { layout } = this.config
        const config = this.mergedConfig
        return createElement(
            getTagName(config.type),
            {
                style: styleParser(layout, this.time),
                'class': ['widget-border', 'widget-part'],
                props: {
                    color: config.color,
                    dur: config.duration,
                    title: config.title,
                    reverse: config.reverse
                },
                ref: 'widget'
            }
        )
    },
    computed: {
        mergedConfig () {
            const option = { ...this.config.config }
            // console.info(JSON.stringify(option))
            const type = option.type
            if (!type) option.type = 1
            if (typeof type === 'string' && type.indexOf('reverse') > -1) {
                const [type, reverse] = option.type.split('-')
                option.type = type
                option.reverse = reverse
            }
            return option
        }
    },
    methods: {
        init () { }
    },
    created () {
        this.configSource = this.parseConfigSource(configParseMap, localConfigSource)
        this.configValue = this.parseConfigValue(configParseMap, localConfigValue)
    }
}
