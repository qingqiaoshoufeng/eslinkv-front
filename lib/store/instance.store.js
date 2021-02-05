import {store} from './index'

/**
 * @description 实例化对象缓存
 */
const state = {
	kanboard: null,
	createKanboard: null,
	createComp: null,
}

const actions = {
	setInstance(key, value) {
		store.instance[key] = value
	},
}

export default {state, actions}
