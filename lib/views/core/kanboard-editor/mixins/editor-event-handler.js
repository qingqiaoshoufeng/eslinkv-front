import platform from '../../../../store/platform.store'

export default {
	data() {
		return {
			currentMouseX: null,
			currentMouseY: null,
			isDragIn: false,
			platform: platform.state,
		}
	},
	methods: {
		handleFullscreenChange() {
			this.platform.fullscreen = !this.platform.fullscreen
			this.$emit('fullscreenchange', this.platform.fullscreen)
			setTimeout(this.updateSpacing, 500)
		},
		showRightMenu(e, item) {
			if (!e.isGridWidget) {
				this.rightMenuGrid = null
				this.rightMenuBindWidgetId = item.id
			} else {
				const data = e.data
				this.rightMenuGrid = data
				this.rightMenuBindWidgetId = data.id
				e = e.event
			}
			e.preventDefault()
			const rightMenu = this.$refs.rightMenu.$el
			rightMenu.classList.add('active')
			rightMenu.style.left = e.clientX + 'px'
			rightMenu.style.top = e.clientY + 'px'
		},
		drop(e) {
			this.isDragIn = false
			const widgetConfig = e.dataTransfer.getData('widget-config')
			if (widgetConfig) {
				this.handleWidgetDrop(e, widgetConfig)
				return
			}
			const layoutGrid = e.dataTransfer.getData('layout-grid')
			if (layoutGrid) {
				this.handleLayoutGridDrop(e, layoutGrid)
			}
		}
	},
	watch: {
		isDragIn(value) {
			if (value) this.hideSubPanels()
		}
	},
	mounted() {
		document.addEventListener('fullscreenchange', this.handleFullscreenChange)
	},
	beforeDestroy() {
		document.removeEventListener('fullscreenchange', this.handleFullscreenChange)
	}
}
