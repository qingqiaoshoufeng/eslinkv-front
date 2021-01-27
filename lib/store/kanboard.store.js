import {store} from './index'
import Vue from 'vue'

const state = {
	data: {},
	widgetAdded: {},
	chooseWidgetConfig: [],
	chooseWidgetId: null,
	panelConfig:{
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
	}
}

const actions = {
	chooseComponent(id) {
		store.kanboard.chooseWidgetId = id
	},
	setChooseWidgetConfig(value) {
		store.kanboard.chooseWidgetConfig = value
	},
	setCurrentCustomConfig(customConfig) {
		store.kanboard.widgetAdded[state.chooseWidgetId].customConfig = customConfig
	},
	setKanboard(value) {
		store.kanboard.widgetAdded = {} // 重置组件信息
		store.kanboard.data = value
	},
	updateApiData(id, data) {
		if (!store.kanboard.widgetAdded[id].config.api) {
			Vue.set(store.kanboard.widgetAdded[id].config, 'api', {})
		}
		Vue.set(store.kanboard.widgetAdded[id].config.api, 'data', JSON.stringify(data))
	},
	updateApiBind(id) {
		if (!store.kanboard.widgetAdded[id].config.api) {
			Vue.set(store.kanboard.widgetAdded[id].config, 'api', {})
		}
		Vue.set(store.kanboard.widgetAdded[id].config.api, 'bind', true)
		Vue.set(store.kanboard.widgetAdded[id].config.api, 'role', ['provider'])
	},
	updateConfig(id, config) {
		Vue.set(store.kanboard.widgetAdded[id], 'config', config)
	},
	setWidgetsAdded(value) {
		store.kanboard.widgetAdded = value
	},
	setWidgetsAddedItem(id, type, config, scene, market = false) {
		Vue.set(store.kanboard.widgetAdded, id, {
			id,
			type,
			config,
			scene,
			market
		})
	}
}

export default {state, actions}
