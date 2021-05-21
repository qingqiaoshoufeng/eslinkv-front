const { platform, scene } = eslinkV.$store
import { getQueryString } from '../../utils/index'

export default {
	data() {
		return {
			platform: platform.state,
			scene: scene.state,
		}
	},
	methods: {
		refillConfig(res) {
			this.loading = true
			const marketComponents: { type: string; version: string }[] = []
			const obj = {}
			const p = []
			res.screenConfig.widgets.forEach(item => {
				obj[item.id] = {
					id: item.id,
					market: item.market,
					scene: item.scene,
					type: item.type,
					config: item.value,
				}
				if (item.market) {
					marketComponents.push({
						type: item.type,
						version: item.value.widget.componentVersion,
					})
				}
			})
			marketComponents.forEach(item => {
				if (this.scene.widgetLoaded[`${item.type}${item.version}`])
					return
				this.scene.widgetLoaded[`${item.type}${item.version}`] = true
				p.push(
					new Promise((resolve, reject) => {
						this.$api.marketComponent
							.use({
								componentEnTitle: item.type,
								componentVersion: item.version,
							})
							.then(res => {
								const script = document.createElement('script')
								script.onload = () => {
									resolve(1)
								}
								script.onerror = () => {
									reject(1)
								}
								script.src = res.componentJsUrl
								document.head.appendChild(script)
							})
					}),
				)
			})
			Promise.all(p)
				.then(() => {
					this.loading = false
					platform.actions.setWidgetsAdded(obj)
					if (res.scene) {
						scene.actions.initScene(res.screenConfig)
					}
				})
				.catch(e => {
					console.log(e)
					this.loading = false
					this.$Message.error('组件初始化加载失败')
				})
		},
		jianrong(res) {
			if (res.screenConfig.panelConfig) {
				this.platform.backgroundImage =
					res.screenConfig.panelConfig.background.url
				this.platform.backgroundColor =
					res.screenConfig.panelConfig.background.color
				this.platform.width = res.screenConfig.panelConfig.size.width
				this.platform.height = res.screenConfig.panelConfig.size.height
				this.platform.isMobile = !!res.screenConfig.panelConfig.size
					.isMobile
				this.platform.layoutMode =
					res.screenConfig.panelConfig.size.layoutMode
				this.platform.mainScene = res.screenConfig.panelConfig.mainScene
			} else {
				this.platform.backgroundImage = res.screenConfig.backgroundImage
				this.platform.backgroundColor = res.screenConfig.backgroundColor
				this.platform.width = res.screenConfig.width
				this.platform.height = res.screenConfig.height
				this.platform.isMobile = !!res.screenConfig.isMobile
				this.platform.layoutMode = res.screenConfig.layoutMode
				this.platform.mainScene = res.screenConfig.mainScene
			}
		},
	},
	mounted() {
		const templateId = this.$route.query.templateId
		const id = this.$route.params.id || templateId
		const file = this.$route.params.file
		if (id) {
			this.$api.screen.detail({ screenId: id }).then(res => {
				this.screenType = res.screenType
				this.platform.screenAvatar = res.screenAvatar
				this.platform.screenName = res.screenName
				this.platform.screenVersion = res.screenVersion
				this.jianrong(res)
				this.refillConfig(res)
			})
		}
		if (file) {
			this.$api.screen.detailFile(decodeURIComponent(file)).then(res => {
				this.jianrong(res)
				this.refillConfig(res)
			})
		}
		/**
		 * @description 默认场景
		 */
		if (getQueryString('scene')) {
			scene.actions.setSceneIndex(getQueryString('scene'))
		}
	},
}
