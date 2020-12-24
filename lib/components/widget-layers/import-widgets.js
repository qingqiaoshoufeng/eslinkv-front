import importWidgets from './import-widgets.vue'

export default {
	components: {
		importWidgets
	},
	data() {
		return {
			showWidgetsImport: false,
			widgetsImporting: false
		}
	},
	methods: {
		handleImportWidgets(widgets) {
			this.widgetsImporting = true
			const widgetsArray = this.sortWidgets(widgets)
			const length = widgetsArray.length
			// 小工具初始化需要时间，此处进行延时逐个回填
			const reDrawWidget = ({id, type, value}) => {
				if (!this.widgetAdded[id]) {
					this.initWidgetConfig(id, type)
					this.updateWidget(value)
				} else {
					this.$Message.warning(`看板中已存在ID为 ${id} 的小工具，已跳过当前导入的小工具。`)
				}
				const currentLength = widgetsArray.length
				if (currentLength) {
					reDrawWidget(widgetsArray.shift())
				} else {
					this.importDone()
				}
			}
			if (length) {
				this.$nextTick(() => {
					reDrawWidget(widgetsArray.shift())
				})
			} else {
				this.importDone()
			}
		},
		importDone() {
			this.widgetsImporting = false
			this.showWidgetsImport = false
			this.$Message.success('小工具导入成功！')
		}
	}
}
