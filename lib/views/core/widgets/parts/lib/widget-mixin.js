import {sourceParser, valueParser} from './config-parser'
import apiHandler from './api-handler/index.js'
import configMerge from './config-merge'
import globalConfigSource from './common-config-source'
import globalConfigValue from './common-config-value'
import sourceToLayout from './source-to-layout'

const mixins = {
    mixins: [apiHandler],
    inject: ['kanboardEditor'],
    props: {
        config: {
            type: Object,
            default: null
        },
        readonly: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            configSource: null,
            configValue: null,
            ready: false,
            data: null,
            configReady: false,
            reRenderTimer: null,
            // initConfigTimer: null,
            stopRenderOnSetPosition: false,
            time: Date.now()
        }
    },
    methods: {
        /**
         * @description
         *
         * 默认配置
         *
         * 组件信息 开
         * 组件配置 关
         * 数据源 开
         * 入场动画 关
         * 样式 开
         */
        parseConfigSource(configParseMap = {}, localConfigSource = null) {
            const _configParseMap = {
                widget: true,
                config: false,
                api: true,
                animation: false,
                layout: true, ...configParseMap
            }
            if (this.readonly) return null
            const mergedSource = localConfigSource ? configMerge(localConfigSource, globalConfigSource) : globalConfigSource
            return sourceParser(mergedSource, _configParseMap)
        },
        parseConfigValue(configParseMap = {}, localConfigValue = null) {
            const _configParseMap = {
                widget: true,
                config: false,
                api: true,
                animation: false,
                layout: true, ...configParseMap
            }
            const mergedValue = localConfigValue ? configMerge(localConfigValue, globalConfigValue()) : globalConfigValue()
            const inputConfig = Object.freeze(this.config || {})
            const mergeInputValue = configMerge(inputConfig, mergedValue)
            const res = valueParser(mergeInputValue, _configParseMap)
            res.widget.name = res.widget.name || this.$parent.type
            if (this.config.widget) {
                window.GoldChart.mutations.updateConfig(this.config.widget.id, res)
            }
            return res
        },
        updateConfig() {
            const payload = this.readonly
                ? {value: {...this.configValue}}
                : {source: sourceToLayout({...this.configSource}), value: {...this.configValue}}
            this.configReady = true
            this.$emit('widget-config-update', payload)
        },
        reRenderWidget() {
            if (this.stopRenderOnSetPosition) return
            if (this.reRenderTimer) clearTimeout(this.reRenderTimer)
            this.reRenderTimer = setTimeout(this.init, 50)
        },
        animationEnd() {
            this.reRenderWidget()
        },
        toggleRender({type}) {
            if (type === 'mousedown') this.stopRenderOnSetPosition = true
            if (type === 'mouseup') this.stopRenderOnSetPosition = false
        },
        init() {
        }
    },
    watch: {
        configReady(value) {
            if (value) {
                this.$nextTick(() => {
                    this.reRenderWidget()
                    requestAnimationFrame(() => {
                        this.$el.classList.add('widget')
                        this.readonly && this.$el.classList.add('readonly')
                        this.ready = true
                        this.$emit('ready')
                    })
                })
            }
        },
        configSource(value) {
            !this.readonly && value && this.updateConfig()
        },
        configValue(value) {
            value && this.updateConfig()
        },
        'config.widget.locked'(value) {
            if (this.$el.style) this.$el.style.pointerEvents = value ? 'none' : null
        },
        'config.layout.size': {
            handler: function (value, oldValue) {
                if (!this.configReady) return
                value && this.reRenderWidget()
            },
            deep: true
        },
        'config.config.option': {
            handler: function (value, oldValue) {
                if (!this.configReady) return
                value && this.reRenderWidget()
            },
            deep: true
        },
        'config.widget.componentVersion': {
            handler: function (value, oldValue) {
				if (!this.configReady) return
				if (!/\d+\.\d+\.\d+/.test(value)) return
				this.$sysApi.bussiness.detailMarket({componentEnTitle: this.config.widget.name, componentVersion: value}).then(res => {
					let script = document.createElement('script')
					script.onload = () => {
						Vue.component(`market-${res.componentEnTitle}-${value}`, window.GoldChart.components[`${res.componentEnTitle}-${value}`].component)
						this.ready = true
					}
					script.src = res.componentJsUrl
					document.head.appendChild(script)
				})
                this.componentVersion = value
				window.GoldChart.store.kanboard.widgetAdded[this.config.widget.id].componentVersion = value
            }
        }
    },
    mounted() {
        // this.$el.addEventListener('webkitTransitionEnd', this.animationEnd)
        // this.$el.addEventListener('animationend', this.animationEnd)
        this.$el.addEventListener('mousedown', this.toggleRender)
        this.$el.addEventListener('mouseup', this.toggleRender)
        this.$nextTick(() => {
            const classList = this.$el.classList
            if (classList) {
                if (!classList.contains('widget')) classList.add('widget')
            }
        })
    },
    beforeDestroy() {
        this.$el.removeEventListener('webkitTransitionEnd', this.animationEnd)
        // this.$el.removeEventListener('animationend', this.animationEnd)
        this.$el.removeEventListener('mousedown', this.toggleRender)
        this.$el.removeEventListener('mouseup', this.toggleRender)
    }
}

export default mixins
