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
		setMousePosition(e) {
			if (this.isWidgetDragging || this.isWidgetResizing) {
				e.stopPropagation()
				return
			}
			const {clientX, clientY, offsetX, offsetY} = e
			if (this.startPanelDrag) {
				this.panelPositionX += clientX - this.currentMouseX
				this.panelPositionY += clientY - this.currentMouseY
			}
			this.setPanelResize({clientX, clientY})
			this.currentMouseX = clientX
			this.currentMouseY = clientY
		},
		setMouseUp(e) {
			this.startPanelDrag = false
			this.stopUpdateMousePosition(e)
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
		document.addEventListener('mouseup', this.setMouseUp)
		document.addEventListener('fullscreenchange', this.handleFullscreenChange)
	},
	beforeDestroy() {
		document.removeEventListener('mouseup', this.setMouseUp)
		document.removeEventListener('fullscreenchange', this.handleFullscreenChange)
	}
}
