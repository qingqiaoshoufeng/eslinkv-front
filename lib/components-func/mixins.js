import {Input, InputNumber} from 'view-design'

export default {
	props: ['config'],
	data() {
		return {
			store: window.GoldChart.store
		}
	},

	components: {Input, InputNumber},
	computed: {
		item() {
			if (this.store.kanboard.widgetAdded[this.store.kanboard.chooseWidgetId]) {
				return this.store.kanboard.widgetAdded[this.store.kanboard.chooseWidgetId]
			} else {
				return {}
			}
		},
	},
}
