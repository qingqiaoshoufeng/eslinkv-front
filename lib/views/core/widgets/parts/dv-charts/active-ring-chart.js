import copy from 'fast-copy'
import styleParser from '../lib/style-parser'
import widgetMixin from '../lib/widget-mixin'
import {
	getColors,
	getInputNumber,
	getNumberWithUnit,
	getCanvasGraphStyle,
	getAnimationCurve,
	getBooleanInput
} from '../lib/config-tools'

// 组件参数配置
const localConfigSource = Object.freeze({
	config: {
		option: {
			fields: {
				radius: getNumberWithUnit('环半径', 'radius', 'radiusUnit', ['无', '%', 'px'], {placeholder: '大小'}),
				activeRadius: getNumberWithUnit('动态半径', 'activeRadius', 'activeRadiusUnit', ['无', '%', 'px'], {placeholder: '大小'}),
				lineWidth: getInputNumber('lineWidth', '环宽度'),
				color: getColors('color', '配色'),
				activeTimeGap: getInputNumber('activeTimeGap', '切换间隔', {placeholder: 'ms'}),
				digitalFlopToFixed: getInputNumber('digitalFlopToFixed', '翻牌器小数位数', {min: 0, max: 4}),
				animationCurve: getAnimationCurve('animationCurve', '动效曲线'),
				animationFrame: getInputNumber('animationFrame', '动画帧数', {min: 0, max: 120}),
				showOriginValue: getBooleanInput('showOriginValue', '显示原值')
			},
			digitalFlopStyle: {
				groupLabel: '数字翻牌器样式',
				groupType: 'Collapse',
				fields: {
					...getCanvasGraphStyle()
				}
			}
		}
	}
})

const localConfigValue = Object.freeze({
	config: {
		option: {
			radius: 70,
			radiusUnit: '%',
			activeRadius: 75,
			activeRadiusUnit: '%',
			lineWidth: 10,
			color: ['#37a2da', '#32c5e9', '#67e0e3', '#9fe6b8', '#ffdb5c', '#ff9f7f', '#fb7293'],
			activeTimeGap: 3000,
			digitalFlopToFixed: 2,
			animationCurve: 'easeOutCubic',
			animationFrame: 50,
			showOriginValue: false,
			digitalFlopStyle: {
				fill: '#3de7c9',
				fontSize: 25
			}
		}
	},
	api: {
		data: JSON.stringify([
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
			}
		], null, 2)
	}
})

// 用于筛选预置配置项
const configParseMap = {
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
		option: {
			radius: true,
			radiusUnit: true,
			activeRadius: true,
			activeRadiusUnit: true,
			lineWidth: true,
			color: true,
			activeTimeGap: true,
			digitalFlopToFixed: true,
			animationCurve: true,
			animationFrame: true,
			showOriginValue: true,
			digitalFlopStyle: true
		}
	},
	api: true,
	animation: true
}
import Vue from 'vue'
import {activeRingChart} from '@jiaminghi/data-view'

Vue.use(activeRingChart)
export default {
	name: 'widget-active-ring-chart',
	label: '动态环图',
	mixins: [widgetMixin],
	render: function (createElement) {
		const {layout, config} = this.config
		if (!layout || !config) return null
		return createElement(
			'dv-active-ring-chart',
			{
				style: styleParser(layout, this.time),
				'class': ['widget-part', {ready: this.ready}, 'widget-active-ring-chart', config.className],
				props: {
					config: this.mergedConfig
				},
				ref: 'widget'
			}
		)
	},
	methods: {
		init() {
			const widget = this.$refs.widget
			clearTimeout(widget.animationHandler)
			const canvas = widget.$refs['active-ring-chart'].children[0]
			canvas && canvas.remove()
			widget.init()
		}
	},
	computed: {
		mergedConfig() {
			if (!this.config.config.option) return {
				data: []
			}
			const option = {...this.config.config.option}
			option.radius += option.radiusUnit
			option.activeRadius += option.activeRadiusUnit
			delete option.radiusUnit
			delete option.activeRadiusUnit
			if (this.data !== null) {
				option.data = copy(this.data)
			}
			if (!option.data) option.data = []
			return option
		}
	},
	created() {
		this.configSource = this.parseConfigSource(configParseMap, localConfigSource)
		this.configValue = this.parseConfigValue(configParseMap, localConfigValue)
	}
}
