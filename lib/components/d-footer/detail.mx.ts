import platform from '../../store/platform.store'
import scene from '../../store/scene.store'

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
			this.querying = false
			platform.actions.initPlatform(value)
			this.refillConfig()
		},
		// todo 是否可以移除 影响渲染时间
		sortWidgets (widgets) {
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
		refillConfig() {
			const {widgets, apis, kanboard} = this.platform.data
			this.platform.panelConfig = kanboard
			this.querying = false
			this.apis = apis
			return new Promise(resolve => {
				this.refilling = true
				const widgetsArray = this.sortWidgets(Object.values(widgets))
				const length = widgetsArray.length
				// 小工具初始化需要时间，此处进行延时逐个回填
				const reDrawWidget = ({id, type, value, scene = 0, market = false}) => {
					this.initWidgetConfig(id, type, value, scene, market)
					const currentLength = widgetsArray.length
					if (currentLength) {
						this.refillPercent = (length - currentLength) / length * 100 | 0
						reDrawWidget(widgetsArray.shift())
					} else {
						this.refillPercent = 100
						this.refilling = false
						resolve()
					}
				}
				if (length) {
					reDrawWidget(widgetsArray.shift())
				} else {
					this.refilling = false
					this.refillPercent = 100
					resolve()
				}
			})
		},
	}
}
