import {Input} from 'view-design'

export default {
	props: ['config'],
	data() {
		return {
			store: window.GoldChart.store
		}
	},

	components: {Input},
	computed: {
		item() {
			if (this.store.kanboard.widgetAdded[this.store.kanboard.chooseId]) {
				return this.store.kanboard.widgetAdded[this.store.kanboard.chooseId]
			} else {
				return {}
			}
		},
	},
}
