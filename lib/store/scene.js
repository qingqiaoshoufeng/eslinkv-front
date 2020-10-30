import {store} from './index'

const state = {
	index: 0,
}

const actions = {
	setSceneIndex(value) {
		console.log(1)
		store.scene.index = value
	},
}

export default {state, actions}
