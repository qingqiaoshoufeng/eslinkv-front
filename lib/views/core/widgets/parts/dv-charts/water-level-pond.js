import styleParser from '../lib/style-parser'
import widgetMixin from '../lib/widget-mixin'
import {getInput, getInputNumber, getSelect, getColors, getSlider} from '../lib/config-tools'

// 组件参数配置
const localConfigSource = Object.freeze({
	config: {
		option: {
			fields: {
				shape: getSelect('shape', '形状', ['矩形:rect', '圆角矩形:roundRect', '圆形:round']),
				colors: getColors('colors', '配色', {number: 2}),
				waveNum: getInputNumber('waveNum', '波浪数量'),
				waveHeight: getInputNumber('waveHeight', '波浪高度'),
				waveOpacity: getSlider('waveOpacity', '透明度', 0, 1, {step: 0.01}),
				formatter: getInput('formatter', '信息格试化')
			}
		}
	}
})

const localConfigValue = Object.freeze({
	layout: {
		background: {
			url: ''
		}
	},
	config: {
		option: {
			shape: 'rect',
			colors: ['#00BAFF', '#3DE7C9'],
			waveNum: 3,
			waveHeight: 40,
			waveOpacity: 0.4,
			formatter: '{value}%'
		}
	},
	api: {
		data: JSON.stringify([66, 45])
	}
})

// 用于筛选预置配置项
const configParseMap = {
	layout: {
		size: true,
		position: true,
		background: true,
		border: true,
		padding: true,
		zIndex: true,
		custom: true,
		opacity: true
	},
	config: {
		option: {
			shape: true,
			colors: true,
			waveNum: true,
			waveHeight: true,
			waveOpacity: true,
			formatter: true
		}
	},
	api: true,
	animation: true
}
import Vue from 'vue'
import {waterLevelPond} from '@jiaminghi/data-view'

Vue.use(waterLevelPond)
export default {
	name: 'widget-water-level-pond',
	label: '水位图',
	mixins: [widgetMixin],
	render: function (createElement) {
		const {layout, config} = this.config
		if (!layout || !config) return null
		return createElement(
			'dv-water-level-pond',
			{
				style: styleParser(layout, this.time),
				'class': ['widget-part', {ready: this.ready}, 'widget-water-level-pond', config.className],
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
				option.data = this.data
			}
			return option
		}
	},
	methods: {
		init() {
			const widget = this.$refs.widget
			widget.renderer.delAllGraph()
			widget.waves = []
			requestAnimationFrame(widget.init)
		}
	},
	created() {
		this.configValue = this.parseConfigValue(configParseMap, localConfigValue)
	}
}
