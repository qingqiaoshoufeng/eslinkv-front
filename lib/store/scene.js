import {store} from './index'

/**
 * @description 场景
 */
const state = {
	index: 0,
	list: [0, 1]
}

const actions = {
	setSceneIndex(value) {
		window.widgetUnactived()
		store.scene.index = value
	},
}

window.setSceneIndex = actions.setSceneIndex
export default {state, actions}
