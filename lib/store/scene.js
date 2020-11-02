import {store} from './index'
import {uuid} from '../utils'

/**
 * @description 场景
 */
const state = {
	index: 0,
	list: []
}

const actions = {
	initScene(list) {
		store.scene.list = list
	},
	setSceneIndex(index) {
		if (index !== store.scene.index) {
			window.widgetUnactived()
			store.scene.index = index
		}
	},
	createScene() {
		store.scene.list.push(uuid())
	},
	destroyScene(index) {
		store.scene.list.splice(index, 1)
	}
}

window.initScene = actions.initScene
window.setSceneIndex = actions.setSceneIndex
window.createScene = actions.createScene
window.destroyScene = actions.destroyScene
export default {state, actions}
