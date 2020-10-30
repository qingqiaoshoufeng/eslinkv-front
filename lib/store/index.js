import Vue from 'vue'
import custom from './custom'
import scene from './scene'

export const store = Vue.observable({
	custom: {
		...custom.state
	},
	scene: {
		...scene.state
	}
})

export const mutations = {
	...custom.actions,
	...scene.actions
}
