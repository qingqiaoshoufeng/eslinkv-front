import Vue from 'vue'
import custom from './custom'

export const store = Vue.observable({
	custom: {
		...custom.state
	}
})

export const mutations = {
	...custom.actions
}
