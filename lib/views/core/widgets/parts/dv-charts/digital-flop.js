import styleParser from '../lib/style-parser'
import widgetMixin from '../lib/widget-mixin'
import {getInput, getInputNumber} from '../lib/config-tools'

// 组件参数配置
const localConfigSource = Object.freeze({
	config: {
		option: {
			fields: {
				toFixed: getInputNumber('toFixed', '小数位数', {min: 0, max: 4}),
				content: getInput('content', '展示格式', {placeholder: '{nt}个'})
			}
		}
	}
})

const localConfigValue = Object.freeze({
	config: {
		option: {
			toFixed: 2,
			content: '{nt}个'
		}
	},
	api: {
		data: '[0]'
	}
})

// 用于筛选预置配置项
const configParseMap = {
	layout: {
		size: {
			// ! 筛选分组的元素
			'$width.height.unit': true
		},
		position: true,
		background: true,
		border: true,
		shadow: true,
		zIndex: true,
		custom: true,
		opacity: true
	},
	config: {
		option: {
			toFixed: true,
			content: true,
			style: true
		}
	},
	api: true,
	animation: true
}

import Vue from 'vue'
import {digitalFlop} from '@jiaminghi/data-view'

Vue.use(digitalFlop)
export default {
	name: 'widget-digital-flop',
	label: '数字翻牌器',
	mixins: [widgetMixin],
	render: function (createElement) {
		const {layout, config} = this.config
		if (!layout || !config) return null
		return createElement(
			'dv-digital-flop',
			{
				style: styleParser(layout, this.time),
				'class': ['widget-part', {ready: this.ready}, 'widget-digital-flop', config.className],
				props: {
					config: this.mergedConfig
				},
				ref: 'widget'
			}
		)
	},
	computed: {
		mergedConfig() {
			const option = {...this.config.config.option}
			if (this.data !== null) {
				option.number = this.data
			}
			return option
		}
	},
	methods: {
		init() {
			this.$refs.widget.init()
		}
	},
	created() {
		this.configValue = this.parseConfigValue(configParseMap, localConfigValue)
	},
	mounted() {
		setTimeout(() => {
			this.data = [500]
		}, 500)
	}
}
