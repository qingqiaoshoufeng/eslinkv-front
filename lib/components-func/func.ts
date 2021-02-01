import {Input, InputNumber, Select, Option, Switch, ColorPicker, Collapse, Panel, Button } from 'view-design'
import {Component, Vue, Prop} from 'vue-property-decorator'
import platform from '../store/platform.store'

const editor = require('vue2-ace-editor')

@Component({
	components: {
		'i-input': Input,
		'i-inputNumber': InputNumber,
		'i-select': Select,
		'i-option': Option,
		'i-switch': Switch,
		'i-colorPicker': ColorPicker,
		'i-collapse': Collapse,
		'i-panel': Panel,
		'i-button': Button,
		editor
	},
})
export default class Func extends Vue {
	platform = platform.state
	@Prop() config

	get item() {
		if (this.platform.widgetAdded[this.platform.chooseWidgetId]) {
			return this.platform.widgetAdded[this.platform.chooseWidgetId]
		} else {
			return null
		}
	}

	get obj() {
		let res = this.item
		const props = this.config.prop.split('.')
		props.length = props.length - 1
		props.forEach(v => {
			res = res[v]
		})
		return res
	}

	get inputKey() {
		const props = this.config.prop.split('.')
		return props.reverse()[0]
	}

	editorInit() {
		require('brace/ext/language_tools')
		require('brace/mode/html')
		require('brace/mode/javascript')
		require('brace/mode/less')
		require('brace/mode/json')
		require('brace/theme/chrome')
		require('brace/snippets/javascript')
	}

	getCode(key) {
		return this.item[key]
	}

	setCode(val, key) {
		this.item[key] = val
	}

	getJson(key) {
		if (typeof this.item[key] === 'object') {
			return JSON.stringify(this.item[key], null, '\t')
		} else {
			if (this.item[key]) {
				return JSON.stringify(JSON.parse(this.item[key]), null, '\t')
			}
			return ''
		}
	}

	setJson(val, key) {
		if (val)
			this.item[key] = JSON.stringify(JSON.parse(val))
		this.item[key] = ''
	}
}
