export default {
	data() {
		return {
			widgetSources: {},
			configPanelValueUpdateTimer: null,
		}
	},
	methods: {
		updateConfigPanelValue(id, oldId) {
			const update = () => {
				const configPanel = this.$refs.configPanel
				if (oldId) {
					configPanel && configPanel.reset()
					this.$nextTick(() => {
						this.currentWidgetValue = this.widgetAdded[id].config
					})
				} else {
					this.currentWidgetValue = this.widgetAdded[id].config
				}
				this.configPanelValueUpdateTimer = null
			}
			this.configPanelValueUpdateTimer && clearTimeout(this.configPanelValueUpdateTimer)
			this.configPanelValueUpdateTimer = setTimeout(update, 380)
		}
	},
	computed: {
		widgetSource() {
			return this.widgetSources[this.currentWidgetType]
		}
	}
}
