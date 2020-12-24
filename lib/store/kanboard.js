import { store } from './index'
import Vue from 'vue'

const state = {
    data: {},
    widgetAdded: {}
}

const actions = {
    setKanboard(value) {
        store.kanboard.widgetAdded = {} // 重置组件信息
        store.kanboard.data = value
    },
    setWidgetsAdded(value) {
        store.kanboard.widgetAdded = value
    },
    setWidgetsAddedItem(id, type, config, scene) {
        Vue.set(store.kanboard.widgetAdded, id, {
            id,
            type,
            config, scene
        })
    }
}

export default { state, actions }
