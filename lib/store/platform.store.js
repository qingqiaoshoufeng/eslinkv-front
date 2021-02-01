import Vue from 'vue'

/**
 * @description 平台信息
 */
const state = new Vue.observable({
	data: {},
	widgetAdded: {},
	chooseWidgetCustomConfig: [],  // 选中项的自定义配置
	chooseWidgetId: null,  // 选中项id
	chooseWidgetState: true, // 是否可编辑
	panelConfig: {  // 看板配置
		id: null,
		info: {
			id: '',
			name: '看板1',
			remark: ''
		},
		size: {
			width: 1920,
			height: 1080,
			unit: 'px',
			preset: '1920×1080',
			isMobileKanboard: false,
			deviceType: 'mobile',
			layoutMode: 'full-size'
		},
		background: {
			url: '',
			size: 'cover',
			position: 'center',
			repeat: 'no-repeat',
			color: ''
		}
	},
	fullscreen: false // 全屏
})

const actions = {
	unChooseWidget() {
		state.chooseWidgetState = true
	},
	chooseWidget(id) {
		state.chooseWidgetId = id
		state.chooseWidgetState = false
	},
	setChooseWidgetCustomConfig(value = []) {
		state.chooseWidgetCustomConfig = value
	},
	setCurrentCustomConfig(customConfig) {
		state.widgetAdded[state.chooseWidgetId].customConfig = customConfig
	},
	initPlatform(value) {
		state.widgetAdded = {} // 重置组件信息
		state.data = value
	},
	updateApiData(id, data) {
		if (!state.widgetAdded[id].config.api) {
			Vue.set(state.widgetAdded[id].config, 'api', {})
		}
		Vue.set(state.widgetAdded[id].config.api, 'data', JSON.stringify(data))
	},
	updateApiBind(id) {
		if (!state.widgetAdded[id].config.api) {
			Vue.set(state.widgetAdded[id].config, 'api', {})
		}
		Vue.set(state.widgetAdded[id].config.api, 'bind', true)
		Vue.set(state.widgetAdded[id].config.api, 'role', ['provider'])
	},
	updateConfig(id, config) {
		Vue.set(state.widgetAdded[id], 'config', config)
	},
	setWidgetsAdded(value) {
		state.widgetAdded = value
	},
	setWidgetsAddedItem(id, type, config, scene, market = false) {
		Vue.set(state.widgetAdded, id, {
			id,
			type,
			config,
			scene,
			market
		})
	}
}

export default {state, actions}
