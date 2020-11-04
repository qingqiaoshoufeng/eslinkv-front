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
			if (!window.GoldChart)
				window.GoldChart = {}
			window.GoldChart.widgetUnactived()
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
if (!window.GoldChart)
	window.GoldChart = {}
window.GoldChart.initScene = actions.initScene
window.GoldChart.setSceneIndex = actions.setSceneIndex
window.GoldChart.createScene = actions.createScene
window.GoldChart.destroyScene = actions.destroyScene
export default {state, actions}
