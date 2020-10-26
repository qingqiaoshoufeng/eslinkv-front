import styleParser from '../lib/style-parser'
import widgetMixin from '../lib/widget-mixin'
import { getSelectWithInput, getBooleanInput } from '../lib/config-tools'
import {format} from 'date-fns'
const formats = [
    {
        label: '年-月-日 时:分:秒',
        value: 'yyyy-MM-dd hh:mm:ss'
    },
    {
        label: '年-月-日',
        value: 'yyyy-MM-dd'
    },
    {
        label: '时:分:秒',
        value: 'hh:mm:ss'
    },
    {
        label: '年-月-日 时:分',
        value: 'yyyy-MM-dd hh:mm'
    },
    {
        label: '月-日 时:分',
        value: 'MM-dd hh:mm'
    }
]

// 组件参数配置
const localConfigSource = Object.freeze({
    config: {
        fields: {
            format: getSelectWithInput('format', '显示格式', formats),
            autoUpdate: getBooleanInput('autoUpdate', '自动刷新')
        }
    }
})

const localConfigValue = Object.freeze({
    layout: {
        font: {
            color: '#3de7c9',
            size: 20,
            lineHeight: 1.5,
            whiteSpace: 'nowrap'
        }
    },
    config: {
        format: 'yyyy-MM-dd hh:mm:ss',
        autoUpdate: true
    }
})

// 用于筛选预置配置项
const configParseMap = {
    layout: {
        size: true,
        font: true,
        position: true,
        background: true,
        border: true,
        padding: true,
        zIndex: true,
        custom: true,
        opacity: true
    },
    config: {
        format: true,
        autoUpdate: true
    },
    animation: true
}

export default {
    name: 'widget-date-time',
    label: '日期时间',
    mixins: [widgetMixin],
    render: function (createElement) {
        const { layout, config } = this.config
        if (!layout || !config) return null
        return createElement(
            'div',
            {
                style: styleParser(layout, this.time),
                'class': ['widget-part', { ready: this.ready }, 'widget-date-time', config.className],
                ref: 'widget'
            },
            this.dateString
        )
    },
    data () {
        return {
            timer: null,
            dateString: ''
        }
    },
    methods: {
        init () {
            this.timer && clearInterval(this.timer)
            this.timer = setInterval(() => {
                this.dateString = format(Date.now(), this.mergedConfig.format)
            }, 100)
        }
    },
    computed: {
        mergedConfig () {
            const option = { ...this.config.config }
            if (!option.format) option.format = '{y}-{m}-{d} {h}:{i}:{s}'
            return option
        }
    },
    watch: {
        'config.config.autoUpdate' (value) {
            if (value) {
                this.init()
            } else {
                this.timer && clearInterval(this.timer)
            }
        }
    },
    created () {
        this.configSource = this.parseConfigSource(configParseMap, localConfigSource)
        this.configValue = this.parseConfigValue(configParseMap, localConfigValue)
    },
    mounted () {
        this.init()
    },
    beforeDestroy () {
        clearInterval(this.timer)
    }
}
