import Vue from 'vue'
import custom from './custom'
import scene from './scene'
import events from './events'
import instance from './instance'

export const store = Vue.observable({
	custom: {
		...custom.state
	},
	scene: {
		...scene.state
	},
	events: {
		...events.state
	},
	instance: {
		...instance.state
	}
})

export const mutations = {
	...custom.actions,
	...scene.actions,
	...events.actions,
	...instance.actions,
}
