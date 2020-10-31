import {store} from './index'

/**
 * @description 场景
 */
const state = {
	index: 0,
}

const actions = {
	setSceneIndex(value) {
		store.scene.index = value
	},
}

export default {state, actions}
