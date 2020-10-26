import {store} from './index'

const state = {
	widgets: [],
	components: {}
}

const actions = {
	setCustomComponents(value) {
		store.custom.components = value
	},
	setCustomWidgets(value) {
		store.custom.widgets = value
	}
}

export default {state, actions}
