import {store} from './index'
import Vue from 'vue'

const state = {
	data: {},
	widgetAdded: {},
	chooseId: null
}

const actions = {
	chooseComponent(id){
		store.kanboard.chooseId = id
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
