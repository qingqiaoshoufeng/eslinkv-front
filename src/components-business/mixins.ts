import {styleParser} from '../../lib'
import scene from '../../lib/store/scene.store'
import apiHandler from '../../lib/views/core/widgets/parts/lib/api-handler/index.js'
import configMerge from '../../lib/views/core/widgets/parts/lib/config-merge'
import globalConfigValue from '../../lib/views/core/widgets/parts/lib/common-config-value'
import platform from '../../lib/store/platform.store'

const mx: any = {
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
			time: Date.now(),
			instance: null,
			animateTimer: null,
			animateActiveIndex: -1,
			output: null,
			inPreview: scene.state.status === 'inPreview',
		}
	},
	beforeDestroy() {
		this.instance = null
		clearInterval(this.animateTimer)
		clearTimeout(this.animateTimer)
		this.animateTimer = null
		this.animateActiveIndex = -1
	},
	methods: {
		/**
		 * @description 组件间联动，被关联组件收动添加 updateComponent 方法
		 */
		emitComponentUpdate(data) {
			if (this.configValue) {
				this.configValue.api.bind.refIds.forEach(ref => {
					let dom
					if (this.kanboardEditor.$refs[ref]) {
						dom = this.kanboardEditor.$refs[ref][0].$refs.widgets
					} else if (window.GoldChart.store.instance.createKanboard?.$refs[ref]) {
						dom = window.GoldChart.store.instance.createKanboard.$refs[ref][0].$refs.widgets
					}
					if (!dom) return
					if (typeof dom.updateComponent === 'function') dom.updateComponent(data)
					dom.updateAjax(data)
				})
			}
		},
		/**
		 * @description 组件间联动后的 ajax 数据重新请求
		 */
		updateAjax(data) {
			if (!this.config) {
				return
			}
			if (!this.config.api) {
				return
			}
			let params = this.config.api.params
			if (params) {
				if (typeof params === 'string') {
					params = {...JSON.parse(params), ...data}
				} else {
					params = {...params, ...data}
				}
			} else {
				params = data
			}
			this.config.api.params = params
		},
		/**
		 * @description
		 *
		 */
		parseConfigValue(localConfigValue = null, customConfig) {
			const mergedValue = localConfigValue ? configMerge(localConfigValue, globalConfigValue()) : globalConfigValue()
			const inputConfig = Object.freeze(this.config || {})
			const res = configMerge(inputConfig, mergedValue)
			// 过滤可用属性
			res.widget.name = res.widget.name || this.$parent.type
			if (customConfig) {
				res.customConfig = customConfig
			}
			if (this.config.widget) {
				platform.actions.updateConfig(this.config.widget.id, res)
			}
			this.$nextTick(() => {
				const payload = {value: {...this.configValue}}
				this.configReady = true
				this.$emit('widget-config-update', payload)
			})
			return res
		}
	},
	computed: {
		styles() {
			const {layout} = this.config
			return styleParser(layout)
		},
		id() {
			const now: number = +new Date()
			if (this.config) {
				if (this.config.widget) {
					return `d-${this.config.widget.id ? this.config.widget.id : ''}${now}`
				}
				return `d-${now}`
			} else {
				return `d-${now}`
			}
		}
	},
	watch: {
		configReady(value) {
			if (value) {
				requestAnimationFrame(() => {
					this.$el.classList.add('widget')
					this.readonly && this.$el.classList.add('readonly')
					this.ready = true
					this.$emit('ready')
				})
			}
		},
		'config.widget.locked'(value) {
			if (this.$el.style) this.$el.style.pointerEvents = value ? 'none' : null
		}
	},
	mounted() {
		this.$nextTick(() => {
			const classList = this.$el.classList
			if (classList) {
				if (!classList.contains('widget')) classList.add('widget')
			}
		})
	}
}

export default mx
