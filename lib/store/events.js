import {store} from './index'

/**
 * @description 事件
 */
const state = {
	list: {},
}

const actions = {
	setEvent(value) {
		store.events.list = {...store.events.list, ...value}
	},
}

export default {state, actions}
