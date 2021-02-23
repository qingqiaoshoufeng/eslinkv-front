import {store} from './index'
import Vue from 'vue'

/**
 * @description 实例化对象缓存
 */
const state = {
	kanboard: null,
	createKanboard: null,
	createComp: null,
}

const actions = new Vue.observable({
	setInstance(key, value) {
		store.instance[key] = value
	},
})

export default {state, actions}
