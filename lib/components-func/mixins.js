import {Input, InputNumber, Select, Option, Switch, ColorPicker, Collapse, Panel} from 'view-design'
import platform from '../store/platform.store'

export default {
	props: ['config'],
	data() {
		return {
			store: window.GoldChart.store,
			platform: platform.state
		}
	},

	components: {
		'i-input': Input,
		'i-inputNumber': InputNumber,
		'i-select': Select,
		'i-option': Option,
		'i-switch': Switch,
		'i-colorPicker': ColorPicker,
		'i-collapse': Collapse,
		'i-panel': Panel
	},
	computed: {
		item() {
			if (platform.state.widgetAdded[this.platform.chooseWidgetId]) {
				return platform.state.widgetAdded[this.platform.chooseWidgetId]
			} else {
				return {}
			}
		},
		obj() {
			let res = this.item
			const props = this.config.prop.split('.')
			props.length = props.length - 1
			props.forEach(v => {
				res = res[v]
			})
			return res
		},
		inputKey() {
			const props = this.config.prop.split('.')
			return props.reverse()[0]
		},
		objPanel() {
			let res = this.platform.panelConfig
			const props = this.config.prop.split('.')
			props.length = props.length - 1
			props.forEach(v => {
				res = res[v]
			})
			return res
		},
		inputKeyPanel() {
			const props = this.config.prop.split('.')
			return props.reverse()[0]
		}
	},
}
