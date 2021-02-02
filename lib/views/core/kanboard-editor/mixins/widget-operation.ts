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
		if (this.refilling || this.widgetsImporting) {
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
		this.zIndexMap[id] = value.layout.zIndex
		if (!this.sizeMap[id]) {
			let size
			/**
			 * @description 开发阶段 异常情况会出现，宽高未配置的情况，会给定一个默认的宽高
			 */
			if (!value.layout.size) {
				size = {
					height: 100,
					range: {
						maxHeight: 0,
						maxWidth: 0,
						minHeight: 0,
						minWidth: 0,
						rangeUnit: "%"
					},
					unit: "px",
					width: 100
				}
			}
			const {width = 100, height = 100} = value.layout.size ? value.layout.size : size
			this.$set(this.sizeMap, id, {w: width, h: height})
		}
		if (!this.positionMap[id]) {
			const {left, top} = value.layout.position
			this.$set(this.positionMap, id, {x: left, y: top})
		}
		this.$set(currentWidget, 'config', value)
		if (this.refilling) return
		this.$emit('kanboard-edited')
	}

	showProcessing(top, left, width, height, widget) {
		if (this.refilling || this.widgetsImporting) return
		if (widget && widget.combinationTo) {
			const widgetElement = this.$refs[widget.combinationTo][0].$el
			const {offsetLeft, offsetTop} = widgetElement.parentElement
			const {offsetTop: bodyTop} = widgetElement.querySelector('.combination-body')
			left += offsetLeft
			top += offsetTop + bodyTop
		}
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
		this.$set(this.zIndexMap, id, layout.zIndex)
		this.sizeMap[id] = {w: width, h: height}
		this.positionMap[id] = {x: left, y: top}
		const value = {layout, widget, config, api}
		this.initWidgetConfig(id, type, this.scene.index, market)
		this.updateWidget(value)
		this.currentWidgetType = type
		return id
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
		const {width, height} = layout.size
		const {left, top} = layout.position
		this.$set(this.sizeMap, id, {w: width, h: height})
		this.$set(this.positionMap, id, {x: left, y: top})
	}

	/**
	 * @description 复制组件
	 */
	copyTargetWidget() {
		const copyId = this.rightMenuBindWidgetId
		const widget = this.widgetAdded[copyId]
		if (!widget) return
		const copiedWidget = copy(widget)
		const id = uuid()
		copiedWidget.id = id
		// 如果属于某组合小工具，则副本挂入该组合小工具
		const combinationToTargetId = copiedWidget.config.widget.combinationTo
		combinationToTargetId && this.insertChild(combinationToTargetId, id)
		// 如果是组合小工具，则复制子小工具
		const combinationChildren = copiedWidget.config.config.children
		if (combinationChildren && combinationChildren.list) {
			const children = combinationChildren.list.split(',')
			combinationChildren.list = ''
			this.copyCombinationChildren(copiedWidget, children)
			return
		}
		this.initNewWidget(id, copiedWidget)
	}

	/**
	 * @description 调整图层 z-index
	 */
	updateWidgetZIndex(type) {
		const id = this.rightMenuBindWidgetId
		const widget = this.widgetAdded[id]
		if (!widget) return
		const zIndexes = this.zIndexMap
		const layout = widget.config.layout
		if (typeof type === 'number') {
			if (layout.zIndex === 0 && type < 0) {
				zIndexes[id] = layout.zIndex = this.getMinZIndex()
				return
			}
			layout.zIndex += type
			zIndexes[id] += type
		} else {
			zIndexes[id] = layout.zIndex = type === 'top' ? this.getMaxZIndex() : this.getMinZIndex()
		}
	}

	/**
	 * @description 获取当前图层 最大 z-index + 1
	 */
	getMaxZIndex() {
		return Math.max(...Object.values(this.zIndexMap)) + 1
	}

	/**
	 * @description 获取当前图层 最小 设为0 ，其他如有0 依次+1
	 */
	getMinZIndex() {
		const zIndexes = this.zIndexMap
		const currentMin = Math.min(...Object.values(zIndexes))
		if (currentMin > 0) return 0
		const widgets = this.widgetAdded
		Object.keys(zIndexes).forEach(key => {
			zIndexes[key]++
			widgets[key].config.layout.zIndex++
		})
		return 0
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
		if (!id || this.refilling || this.widgetsImporting) return

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
