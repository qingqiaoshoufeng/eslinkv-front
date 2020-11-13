import {styleParser, widgetMixin} from '../../lib'

import axios from 'axios'
import jsonic from 'jsonic'

const request = axios.create({
	withCredentials: false
})
export default {
	data() {
		return {
			instance: null,
			animateTimer: null,
			animateActiveIndex: -1,
			output: null,
		}
	},
	mixins: [widgetMixin],
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
			this.configValue.api.bind.refIds.forEach(ref => {
				const dom = this.kanboardEditor.$refs[ref][0].$refs.widgets
				if (typeof dom.updateComponent === 'function')
					dom.updateComponent(data)
				dom.updateAjax(data)
			})
		},
		/**
		 * @description 外部更新组件
		 */
		updateComponentFormOutSide(data) {
			this.config.api.data = JSON.stringify(data)
		},
		/**
		 * @description 组件间联动后的 ajax 数据重新请求
		 */
		updateAjax(data) {
			if (!this.config.api) {
				return
			}
			const parseParams = (params = {}) => {
				if (typeof params === 'string') {
					try {
						return jsonic(params.trim())
					} catch (e) {
					}
				}
				return params
			}
			const {url, method, path} = this.config.api

			const config = {
				url,
				method,
				[method.toUpperCase() === 'GET' ? 'params' : 'data']: method.toUpperCase() === 'GET' ? parseParams(data) : data
			}
			const keys = path ? path.split('.') : []
			request(config).then(res => {
				let result = res
				while (keys.length) {
					const key = keys.shift()
					result = result[key]
				}
				console.log(this.config.api.data)
				console.log(JSON.stringify(result))
				this.config.api.data = JSON.stringify(result)
			})
		},
	},
	computed: {
		styles() {
			const {layout} = this.config
			return styleParser(layout)
		},
		mergedConfig() {
			if (!this.config.config) return false
			return {...this.config.config}
		},
		id() {
			if (this.config) {
				if (this.config.widget) {
					return `widget-part-${this.config.widget.id}${new Date * 1}`
				}
				return ''
			} else {
				return ''
			}
		}
	},
}
