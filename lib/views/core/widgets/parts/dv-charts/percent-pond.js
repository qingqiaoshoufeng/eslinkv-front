import styleParser from '../lib/style-parser'
import widgetMixin from '../lib/widget-mixin'
import {getInput, getInputNumber, getColor, getBooleanInput, getColors} from '../lib/config-tools'

// 组件参数配置
const localConfigSource = Object.freeze({
	config: {
		option: {
			fields: {
				colors: getColors('colors', '配色', {number: 2}),
				'borderWidth.borderGap.borderRadius': [
					getInputNumber('borderWidth', '边框', {placeholder: '宽度'}),
					getInputNumber('borderGap', '边框', {placeholder: '间隙'}),
					getInputNumber('borderRadius', '边框', {placeholder: '半径'})
				],
				'lineWidth.lineGap.pieceLength': [
					getInputNumber('lineWidth', '线条', {placeholder: '宽度'}),
					getInputNumber('lineGap', '线条', {placeholder: '间隙'}),
					getInput('pieceLength', '线条', {placeholder: '定制'}),
				],
				textColor: getColor('textColor', '文字颜色'),
				localGradient: getBooleanInput('localGradient', '局部渐变'),
				formatter: getInput('formatter', '信息格试化')
			}
		}
	}
})

const localConfigValue = Object.freeze({
	config: {
		option: {
			colors: ['#3DE7C9', '#00BAFF'],
			borderWidth: 3,
			borderGap: 3,
			borderRadius: 5,
			lineWidth: 5,
			lineGap: 1,
			textColor: '#fff',
			localGradient: false,
			pieceLength: null,
			formatter: '{value}%'
		}
	},
	api: {
		data: JSON.stringify({
			value: 66
		})
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
			colors: true,
			'$borderWidth.borderGap.borderRadius': true,
			'$lineWidth.lineGap.pieceLength': true,
			textColor: true,
			localGradient: true,
			formatter: true
		}
	},
	api: true,
	animation: true
}
import Vue from 'vue'
import {percentPond} from '@jiaminghi/data-view'

Vue.use(percentPond)
export default {
	name: 'widget-percent-pond',
	label: '进度池',
	mixins: [widgetMixin],
	render: function (createElement) {
		const {layout, config} = this.config
		if (!layout || !config) return null
		return createElement(
			'dv-percent-pond',
			{
				style: styleParser(layout, this.time),
				'class': ['widget-part', {ready: this.ready}, 'widget-percent-pond', config.className],
				props: {
					config: this.mergedConfig
				},
				ref: 'widget'
			}
		)
	},
	watch: {
		'config.config.option.lineWidth': {
			handler: function (value) {
				if (value) {
					this.config.config.option.pieceLength = null
				}
			},
			deep: true
		}
	},
	computed: {
		mergedConfig() {
			const option = {...this.config.config.option}
			if (this.data !== null) {
				option.value = this.data.value
			}

			const {borderGap, borderWidth, lineGap, pieceLength} = option
			if (pieceLength) {
				// 定制块间隙
				const fullWidth = this.config.layout.size.width
				const usefulWidth = fullWidth - (borderGap + borderWidth) * 2
				const pieceLen = pieceLength.split(',')

				const lineDash = pieceLen
					.map(l => [usefulWidth * (l - 0), lineGap])
					.reduce((all, current) => [...all, ...current], [])

				option.lineDash = lineDash
			} else {
				option.lineDash = [option.lineWidth, option.lineGap]
			}
			delete option.lineWidth
			delete option.lineGap

			return option
		}
	},
	methods: {
		init() {
			this.$refs.widget && this.$refs.widget.initWH()
		}
	},
	created() {
		this.configValue = this.parseConfigValue(configParseMap, localConfigValue)
	}
}
