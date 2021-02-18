import styleParser from '../lib/style-parser'
import widgetMixin from '../lib/widget-mixin'
import imgSources from '../lib/conical-img-source'
import {getBooleanInput, getNumberWithUnit, getColor, getSelect, getInput} from '../lib/config-tools'

// 组件参数配置
const localConfigSource = Object.freeze({
	config: {
		option: {
			fields: {
				fontSize: getNumberWithUnit('字号', 'fontSize', 'fontUnit', ['px'], {placeholder: '大小'}),
				textColor: getColor('textColor', '文字颜色'),
				columnColor: getColor('columnColor', '柱颜色'),
				imgIcon: getSelect('imgIcon', '柱顶图片', ['无:0', '交通工具:1']),
				imgIconCustom: getInput('imgIconCustom', '自定义图片', {
					placeholder: '自定义图片路径',
					innerType: 'textarea',
					rows: 3
				}),
				imgSideLength: getNumberWithUnit('图片边长', 'imgSideLength', 'imgLengthUnit', ['px'], {placeholder: '大小'}),
				showValue: getBooleanInput('showValue', '显示数值'),
				formatter: getInput('formatter', '信息格试化')
			}
		}
	}
})

const localConfigValue = Object.freeze({
	config: {
		option: {
			fontSize: 16,
			fontUnit: 'px',
			textColor: '#fff',
			columnColor: 'rgba(0, 194, 255, 0.4)',
			imgIcon: 1,
			imgIconCustom: '',
			imgSideLength: 30,
			imgLengthUnit: 'px',
			showValue: false,
			formatter: '{value}%'
		}
	},
	api: {
		data: JSON.stringify({
			data: [
				{
					name: '周口',
					value: 55
				},
				{
					name: '南阳',
					value: 120
				},
				{
					name: '西峡',
					value: 78
				},
				{
					name: '驻马店',
					value: 66
				},
				{
					name: '新乡',
					value: 80
				},
				{
					name: '信阳',
					value: 35
				},
				{
					name: '漯河',
					value: 15
				}
			]
		}, null, 2)
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
			fontSize: true,
			textColor: true,
			fontUnit: true,
			columnColor: true,
			imgIcon: true,
			imgIconCustom: true,
			imgSideLength: true,
			imgLengthUnit: true,
			showValue: true,
			formatter: true
		}
	},
	api: true,
	animation: true
}

import Vue from 'vue'
import {conicalColumnChart} from '@jiaminghi/data-view'

Vue.use(conicalColumnChart)
export default {
	name: 'widget-conical-column-chart',
	label: '锥形图',
	mixins: [widgetMixin],
	render: function (createElement) {
		const {layout, config} = this.config
		if (!layout || !config) return null
		return createElement(
			'dv-conical-column-chart',
			{
				style: styleParser(layout, this.time),
				'class': ['widget-part', {ready: this.ready}, 'widget-conical-column-chart', config.className],
				props: {
					config: this.mergedConfig
				},
				ref: 'widget'
			}
		)
	},
	watch: {
		'config.config.option.imgIconCustom': {
			handler: function (value) {
				if (value) {
					this.config.config.option.imgIcon = 0
				}
			},
			deep: true
		},
		'config.config.option.imgIcon': {
			handler: function (value) {
				if (value) {
					this.config.config.option.imgIconCustom = ''
				}
			},
			deep: true
		}
	},
	computed: {
		mergedConfig() {
			const option = {...this.config.config.option}
			if (this.data !== null) {
				Object.assign(option, this.data)
			}
			// 自定义顶柱图片
			if (option.imgIconCustom) {
				const imgIconCustom = option.imgIconCustom.split(',')
				Object.assign(option, {img: imgIconCustom})
			} else {
				Object.assign(option, {img: imgSources[option.imgIcon]})
			}
			delete option.fontUnit
			delete option.imgLengthUnit
			delete option.imgIcon

			return option
		}
	},
	created() {
		this.configValue = this.parseConfigValue(configParseMap, localConfigValue)
	}
}
