import copy from 'fast-copy'
import {uuid} from '../../../../utils'
import {Vue, Component, Watch} from 'vue-property-decorator'
import platform from '../../../../store/platform.store'
import scene from '../../../../store/scene.store'

@Component
class Mixins extends Vue {
	currentWidgetType = null
	activatedWidgetId = null
	isWidgetDragging = false
	isWidgetResizing = false
	isWidgetProcessing = false
	widgetProcessingStyle = null
	rightMenuBindWidgetId = null
	zIndexMap = {}
	widgetMovingTimer = null
	widgetActivating = false
	widgetMoving = false
	currentWidgetValue = null
	platform = platform.state
	scene = scene.state


	handleWidgetConfig({source, value = {}}, item) {
		const type = item.type
		if (!this.widgetSources[type]) {
			this.$set(this.widgetSources, type, source)
		}
		if (this.widgetsImporting) {
			this.isWidgetProcessing = false
			return
		}
		this.updateWidget(value)
		requestAnimationFrame(() => {
			this.isWidgetProcessing = false
			this.activatedWidgetId = item.id
		})
	}

	updateWidget(value) {
		if (this.widgetMoving || !value || !value.widget) return
		const id = value.widget.id
		console.log(this.widgetAdded)
		const currentWidget = this.widgetAdded[id]
		if (!id || !currentWidget) return
		this.$set(currentWidget, 'config', value)
	}

	showProcessing(top, left, width, height, widget) {
		if (this.widgetsImporting) return
		this.widgetProcessingStyle = `
                transform: translate3d(${left}px, ${top}px, 0);
                width: ${width}px;
                height: ${height}px;
            `
		this.isWidgetProcessing = true
	}

	initWidgetConfig(id, type, scene, market) {
		platform.actions.setWidgetsAddedItem(id, type, null, scene, market)
	}

	// 小工具放置到画布
	handleWidgetDrop(e, data) {
		const {clientX, clientY, offsetX, offsetY} = e
		const {type, config: inputConfig, startX, startY, market = false, componentVersion} = JSON.parse(data)
		const {layout = {}, config = {}, widget = {}, api} = inputConfig || {}
		if (!layout.size) layout.size = {}
		if (!layout.position) layout.position = {}
		const top = offsetY - startY
		const left = offsetX - startX
		layout.position.top = top
		layout.position.left = left
		const {width, height} = layout.size
		// 小工具初始化提示
		this.showProcessing(top, left, width, height, widget)
		const id = uuid()

		if (layout.zIndex) layout.zIndex = 10
		widget.id = id
		widget.componentVersion = componentVersion
		const value = {layout, widget, config, api}
		this.initWidgetConfig(id, type, this.scene.index, market)
		this.updateWidget(value)
		this.currentWidgetType = type
		return id
	}

	activatedFromSidebar (id) {
		this.handleActivated(platform.state.widgetAdded[id])
	}

	handleActivated(obj, activeAllowed: boolean = true) {
		const {config, id, type} = obj
		if (!activeAllowed || config.widget.locked) {
			return this.deactivateWidget(id)
		}

		// todo 选中之后要做什么
		console.group(id)
		console.log(obj)
		console.groupEnd()
		platform.actions.chooseWidget(id)
		platform.actions.setChooseWidgetCustomConfig(config.customConfig)
		if (this.widgetActivating) return
		this.widgetActivating = true
		this.rightMenuGrid = null
		this.currentWidgetType = type
		this.activatedWidgetId = id
		this.widgetActiveTimer = null
		setTimeout(() => {
			this.widgetActivating = false
		}, 300)
	}

	handleDeactivated(item) {
		if (!this.widgetEditable(item)) {
			this.activatedWidgetId = null
			platform.actions.unChooseWidget()
		}
	}

	/**
	 * @description 刷新以取消选定状态
	 */
	deactivateWidget(id) {
		this.$nextTick(() => {
			const widget = this.$refs[`widget_${id}`]
			if (!widget || !widget[0]) return
			widget[0].enabled = false
			this.activatedWidgetId = null
			platform.actions.unChooseWidget()
		})
	}

	initNewWidget(id, widget, makeOffset = true) {
		const config = widget.config
		config.widget.id = id
		const layout = config.layout
		if (makeOffset) {
			layout.position.left += 10
			layout.position.top += 10
		}
		platform.actions.setWidgetsAddedItem(id, widget.type, widget.config, widget.scene)
		this.$set(this.zIndexMap, id, layout.zIndex)
	}

	markWidgetMoving() {
		if (this.widgetMovingTimer) clearTimeout(this.widgetMovingTimer)
		this.widgetMoving = true
		this.widgetMovingTimer = setTimeout(() => {
			this.widgetMoving = false
			this.updateWidget(this.currentWidgetValue)
			this.widgetMovingTimer = null
		}, 50)
	}

	widgetEditable({config}) {
		return !config.widget.locked && !config.widget.hide
	}


	@Watch('activatedWidgetId')
	onActivatedWidgetIdChange(id, oldId) {
		if (!id || this.widgetsImporting) return

		if (this.currentWidgetValue && id === this.currentWidgetValue.widget.id || !id) return
		this.updateConfigPanelValue(id, oldId)
	}

	@Watch('currentWidgetValue.layout', {deep: true})
	onCurrentWidgetValueLayoutChange() {
		this.markWidgetMoving()
	}

	@Watch('currentWidgetValue', {deep: true})
	onCurrentWidgetValueChange(value) {
		value && this.updateWidget(value)
	}

	widgetUnActived() {
		this.activatedWidgetId = null
		platform.actions.unChooseWidget()
	}

	mounted() {
		/**
		 * @description 事件收集
		 */
		window.GoldChart.mutations.setEvent({widgetUnActived: this.widgetUnActived})
	}
}

export default Mixins
