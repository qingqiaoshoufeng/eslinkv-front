import styleParser from '../lib/style-parser'
import widgetMixin from '../lib/widget-mixin'
import {getInput, getColors} from '../lib/config-tools'

// 组件参数配置
const localConfigSource = Object.freeze({
	config: {
		fields: {
			unit: getInput('unit', '单位描述'),
			colors: getColors('colors', '配色')
		}
	}
})

const localConfigValue = Object.freeze({
	config: {
		unit: '单位',
		colors: ['#37a2da', '#32c5e9', '#67e0e3', '#9fe6b8', '#ffdb5c', '#ff9f7f', '#fb7293']
	},
	api: {
		data: JSON.stringify([
			{
				name: '南阳',
				value: 167
			},
			{
				name: '周口',
				value: 67
			},
			{
				name: '漯河',
				value: 123
			},
			{
				name: '郑州',
				value: 55
			},
			{
				name: '西峡',
				value: 98
			},
		], null, 2)
	}
})

// 用于筛选预置配置项
const configParseMap = Object.freeze({
	widget: true,
	layout: {
		size: {
			'$width.height.unit': true
		},
		position: true,
		background: true,
		border: true,
		zIndex: true,
		custom: true,
		opacity: true
	},
	config: {
		unit: true,
		colors: true
	},
	api: true,
	animation: true
})

import Vue from 'vue'
import {capsuleChart} from '@jiaminghi/data-view'

Vue.use(capsuleChart)
export default {
	name: 'widget-capsule-chart',
	label: '胶囊柱图',
	mixins: [widgetMixin],
	render: function (createElement) {
		const {layout, config} = this.config
		if (!layout || !config) return null
		return createElement(
			'dv-capsule-chart',
			{
				style: styleParser(layout, this.time),
				'class': ['widget-part', {ready: this.ready}, 'widget-capsule-chart', config.className],
				props: {
					config: this.mergedConfig
				},
				ref: 'widget'
			}
		)
	},
	methods: {
		init() {
		}
	},
	computed: {
		mergedConfig() {
			const option = {...this.config.config}
			if (this.data !== null) {
				option.data = this.data
			}
			return option
		}
	},
	created() {
		this.configSource = this.parseConfigSource(configParseMap, localConfigSource)
		this.configValue = this.parseConfigValue(configParseMap, localConfigValue)
	}
}
