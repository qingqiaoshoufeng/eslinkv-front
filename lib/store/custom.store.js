import Vue from 'vue'

/**
 * @description 挂载业务组件
 */
const state = Vue.observable({
	widgets: [],
	components: {}
})

const actions = {
	setCustomComponents(value) {
		state.components = {...state.components, ...value}
	},
	setCustomWidgets(value) {
		state.widgets.push({...value, name: `custom${state.widgets.length}`})
	}
}

export default {state, actions}
