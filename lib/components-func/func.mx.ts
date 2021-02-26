import {
	Input,
	InputNumber,
	Select,
	Option,
	Switch,
	ColorPicker,
	Collapse,
	Panel,
	Button,
	CheckboxGroup,
	Checkbox,
	Icon
} from 'view-design'
import {Component, Vue, Prop} from 'vue-property-decorator'
import platform from '../store/platform.store'
import scene from '../store/scene.store'

const editor = require('vue2-ace-editor')

@Component({
	components: {
		'i-input': Input,
		'i-icon': Icon,
		'i-input-number': InputNumber,
		'i-select': Select,
		'i-option': Option,
		'i-switch': Switch,
		'i-colorPicker': ColorPicker,
		'i-collapse': Collapse,
		'i-panel': Panel,
		'i-button': Button,
		CheckboxGroup,
		Checkbox,
		editor
	},
})
export default class Func extends Vue {
	platform = platform.state
	scene = scene.state
	@Prop() config
	@Prop() parent // group时会有

	get item() {
		if (this.parent) {
			return this.parent
		} else if (this.platform.widgetAdded[this.platform.chooseWidgetId]) {
			return this.platform.widgetAdded[this.platform.chooseWidgetId]
		} else {
			return null
		}
	}

	get obj() {
		return this.item.config.config
	}

	get inputKey() {
		return this.config.prop
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

	getJson(key) {
		const req = this.getItemValue(key)
		if (typeof req === 'object') {
			return JSON.stringify(req, null, '\t')
		} else {
			if (req) {
				return JSON.stringify(JSON.parse(req), null, '\t')
			}
			return ''
		}
	}

	setJson(val, key) {
		let data = this.getItemObj(key)
		const prop = key.split('.').reverse()[0]
		if (val) {
			data[prop] = JSON.stringify(JSON.parse(val))
		} else {
			data[prop] = ''
		}
	}

	getItemValue(keyString) {
		let res = this.item
		const props = keyString.split('.')
		props.forEach(v => {
			res = res[v]
		})
		return res
	}

	getItemObj(keyString) {
		let res = this.item
		const props = keyString.split('.')
		props.length = props.length - 1
		props.forEach(v => {
			res = res[v]
		})
		return res
	}
}
