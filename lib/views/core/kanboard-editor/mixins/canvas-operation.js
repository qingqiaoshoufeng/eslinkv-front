import styleParser from '../../widgets/style-parser'
import platform from '../../../../store/platform.store'

export default {
	data() {
		return {
			platform: platform.state,
			rulerCanvasUpdateTimer: null
		}
	},
	methods: {
		updateRulerCanvas() {
			if (this.rulerCanvasUpdateTimer) clearTimeout(this.rulerCanvasUpdateTimer)
			this.rulerCanvasUpdateTimer = requestAnimationFrame(() => {
				const {width, height} = this.platform.panelConfig.size
				width && height && this.$refs.rulerCanvas.init()
				this.rulerCanvasUpdateTimer = null
				this.platform.panelConfig.size.preset = `${width}×${height}`
			})
		},
		updateCanvasOffset() {
			if (!this.$el) return
			let left = 0
			let top = 0
			const {width, height} = this.$el.getBoundingClientRect()
			const {width: w, height: h} = this.platform.panelConfig.size
			if (width > w) left = Math.ceil((width - w) / 2)
			if (height > h) top = Math.ceil((height - h) / 2)
			this.setContentPosition(left, top)
		},
		setContentPosition(left = 0, top = 0) {
			const rulerCanvas = this.$refs.rulerCanvas
			rulerCanvas.contentScrollLeft = left - 18
			rulerCanvas.contentScrollTop = top - 18
		},
		confirmKanboardName() {
			if (['big-data-new', 'big-data-template-add'].includes(this.routeName)) {
				setTimeout(() => {
					setTimeout(() => {
						const kanboardNameInput = document.querySelector('#kanboardName')
						kanboardNameInput.focus()
						kanboardNameInput.select()
					}, 300)
				}, 500)
			}
		}
	},
	computed: {
		routeName() {
			return this.$route.name
		},
		isTemplateEditor() {
			if (this.routeName) {
				return this.routeName.indexOf('big-data-template-') === 0
			}
			return false
		},
		canvasStyle() {
			return styleParser(this.platform.panelConfig)
		},
		canvasSize() {
			const {width, height} = this.platform.panelConfig.size
			return {width, height}
		}
	},
	watch: {
		'platform.panelConfig.size.width'() {
			this.updateRulerCanvas()
		},
		'platform.panelConfig.size.height'() {
			this.updateRulerCanvas()
		},
		'platform.panelConfig.size.preset'(value) {
			if (value === undefined) return
			if (value) {
				const [width, height] = value.split('×')
				if (width !== 'null') this.platform.panelConfig.size.width = +width
				if (height !== 'null') this.platform.panelConfig.size.height = +height
			} else {
				this.platform.panelConfig.size.width = 1920
				this.platform.panelConfig.size.height = 1080
			}
		}
	},
	mounted() {
		this.updateCanvasOffset()
		this.platform.panelConfig.info.name = !this.isTemplateEditor ? '看板1' : '模板1'
		setTimeout(() => {
			if (this.widgetsImporting) return
			this.confirmKanboardName()
		})
	}
}
