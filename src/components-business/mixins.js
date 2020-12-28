import {styleParser, widgetMixin} from '../../lib'
import {store} from '../openApi'

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
			if(this.configValue){
				this.configValue.api.bind.refIds.forEach(ref => {
					let dom
					if (this.kanboardEditor.$refs[ref]) {
						dom = this.kanboardEditor.$refs[ref][0].$refs.widgets
					} else if(store.instance.createKanboard?.$refs[ref]){
						dom =store.instance.createKanboard.$refs[ref][0].$refs.widgets
					}
					if(!dom) return
					if (typeof dom.updateComponent === 'function') dom.updateComponent(data)
					dom.updateAjax(data)
				})
			}
		},
		/**
		 * @description 组件间联动后的 ajax 数据重新请求
		 */
		updateAjax(data) {
			if(!this.config){
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
