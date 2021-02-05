import platform from '../../store/platform.store'
import scene from '../../store/scene.store'
import {getQueryString} from '../../utils'

export default {
	methods: {
		renderByDetail(res) {
			const {attribute, name} = res
			document.title = `编辑 - ${name} - 数据看板`
			let value
			if (typeof attribute === 'string') {
				value = JSON.parse(attribute)
			} else {
				value = attribute
			}
			if (value.scene) {
				scene.actions.initScene(value)
			}
			this.refillConfig(value)
		},
		// todo 是否可以移除 影响渲染时间
		sortWidgets(widgets) {
			const providers = []
			const responders = []
			widgets.forEach(widget => {
				const api = widget.value.api
				const isProvider = api && api.bind && api.bind.enable && api.bind.role.includes('provider')
				if (isProvider) {
					providers.push(widget)
				} else {
					responders.push(widget)
				}
			})
			return [...providers, ...responders]
		},
		refillConfig(res) {
			const {widgets, apis, kanboard} = res
			this.platform.panelConfig = kanboard
			// this.querying = false
			// this.apis = apis
			return new Promise(resolve => {
				// this.refilling = true
				const widgetsArray = this.sortWidgets(Object.values(widgets))
				const length = widgetsArray.length
				// 小工具初始化需要时间，此处进行延时逐个回填
				const reDrawWidget = ({id, type, value, scene = 0, market = false}) => {
					platform.actions.setWidgetsAddedItem(id, type, value, scene, market)
					const currentLength = widgetsArray.length
					if (currentLength) {
						// this.refillPercent = (length - currentLength) / length * 100 | 0
						reDrawWidget(widgetsArray.shift())
					} else {
						// this.refillPercent = 100
						// this.refilling = false
						resolve()
					}
				}
				if (length) {
					reDrawWidget(widgetsArray.shift())
				} else {
					// this.refilling = false
					// this.refillPercent = 100
					resolve()
				}
			})
		}
	},

	mounted() {
		const {params: {id}} = this.$route
		this.$api.board.detail({dataBoardId: id}).then(res => {
			this.renderByDetail(res)
		})
		/**
		 * @description 默认场景
		 */
		if (getQueryString('scene')) {
			scene.actions.setSceneIndex(getQueryString('scene'))
		}
		/**
		 * @description 适配
		 */
		// if (getQueryString('scale'))
		// 	if (!isNaN(getQueryString('scale')))
		// 		this.scale = Number(getQueryString('scale'))
	}
}
