export default {
	data() {
		return {
			widgetSources: {},
			panelPositionX: null,
			panelPositionY: null,
			startPanelDrag: false,
			fixPanelPosition: false,
			mouseCurrentX: null,
			mouseCurrentY: null,
			panelResizing: false,
			configPanelValueUpdateTimer: null,
			configPanelValueFreshing: false
		}
	},
	methods: {
		updateConfigPanelValue(id, oldId) {
			this.configPanelValueFreshing = true
			const update = () => {
				const configPanel = this.$refs.configPanel
				if (oldId) {
					configPanel && configPanel.reset()
					this.$nextTick(() => {
						this.currentWidgetValue = this.widgetAdded[id].config
						this.configPanelValueFreshing = false
					})
				} else {
					this.currentWidgetValue = this.widgetAdded[id].config
					this.configPanelValueFreshing = false
				}
				this.configPanelValueUpdateTimer = null
			}
			if (this.fixPanelPosition) {
				update()
				return
			}
			this.configPanelValueUpdateTimer && clearTimeout(this.configPanelValueUpdateTimer)
			this.configPanelValueUpdateTimer = setTimeout(update, 380)
		}
	},
	computed: {
		widgetSource() {
			return this.widgetSources[this.currentWidgetType]
		},
		currentPartEle() {
			const id = this.activatedWidgetId
			if (!id) return null
			return document.getElementsByClassName(`widget-${id}`)[0].getBoundingClientRect()
		},
		currentWidgetEle() {
			const id = this.activatedWidgetId
			if (!id) return null
			return this.$refs[`widget_${id}`][0].$el
		}
	}
}
