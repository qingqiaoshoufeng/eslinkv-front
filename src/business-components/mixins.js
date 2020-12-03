import {styleParser, widgetMixin} from '../../lib'
import {store} from '../openApi';
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
			inPreview: store.scene.status === 'inPreview',
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
		updateComponentFormOutSide({data, url, path, method, params}) {
			if (params)
				this.config.api.params = JSON.stringify(params)
			if (data)
				this.config.api.data = JSON.stringify(data)
			if (url)
				this.config.api.url = url
			if (path)
				this.config.api.path = path
			if (method)
				this.config.api.method = method
		},
		/**
		 * @description 组件间联动后的 ajax 数据重新请求
		 */
		updateAjax(data) {
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
			this.config.api.params = JSON.stringify(params)
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
