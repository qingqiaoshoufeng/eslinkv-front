import styleParser from '../lib/style-parser'
import widgetMixin from '../lib/widget-mixin'
import {padding, font} from '../lib/common-config-source'
import {getInput, getSelect, getInputNumber, getColors} from '../lib/config-tools'

const getTagName = type => {
	if (type !== 'custom') return `dv-decoration-${type}`
	return 'div'
}

const {color, size, weight, letterSpacing, lineHeight, family} = font.fields

// 组件参数配置
const localConfigSource = Object.freeze({
	config: {
		fields: {
			type: getSelect('type', '装饰样式', [1, 2, '2-reverse', '3', 4, '4-reverse', 5, 6, 7, 8, '8-reverse', 9, 10, 11], {
				control: {
					type: 'remove',
					target: 'text',
					condition: {
						compare: 'exclude',
						value: ['7', '9', '11']
					}
				}
			}),
			color: getColors('color', '配色'),
			duration: getInputNumber('duration', '单次动画时长', {placeholder: '秒'}),
			text: {
				groupLabel: '附加装饰文本',
				groupType: 'Collapse',
				groupActive: false,
				group: 'text',
				fields: {
					text: getInput('text', '附加文本', {placeholder: '仅个别拉花可用'}),
					color,
					size,
					family,
					weight,
					letterSpacing,
					lineHeight
				},
				padding
			}
		}
	}
})

const localConfigValue = Object.freeze({
	layout: {
		size: {
			width: 500,
			height: 200
		},
		zIndex: 1,
		opacity: 1
	},
	config: {
		type: 1,
		color: ['#0de7c2', '#7acaec'],
		duration: 4,
		text: {
			text: '装饰文本',
			color: '#0BDEE4',
			size: '16',
			unit: 'px',
			family: '',
			weight: '',
			letterSpacing: 0,
			lineHeight: 1.5,
			padding: {
				value: 0,
				unit: 'px',
				detail: {
					left: 0,
					right: 0,
					top: 0,
					bottom: 0
				}
			}
		}
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
		zIndex: true,
		custom: true,
		opacity: true
	},
	config: {
		type: true,
		color: true,
		duration: true,
		text: true
	},
	animation: true
})
import Vue from 'vue'
import {
	decoration1,
	decoration2,
	decoration3,
	decoration4,
	decoration5,
	decoration6,
	decoration7,
	decoration8,
	decoration9,
	decoration10,
	decoration11
} from '@jiaminghi/data-view'

Vue.use(decoration1)
Vue.use(decoration2)
Vue.use(decoration3)
Vue.use(decoration4)
Vue.use(decoration5)
Vue.use(decoration6)
Vue.use(decoration7)
Vue.use(decoration8)
Vue.use(decoration9)
Vue.use(decoration10)
Vue.use(decoration11)
export default {
	name: 'widget-decoration',
	label: '装饰',
	mixins: [widgetMixin],
	render: function (h) {
		const {layout} = this.config
		const {type, color, duration, reverse, className, text} = this.mergedConfig
		const getText = () => {
			if (text && text.text) {
				const {text: content, padding, ...font} = text
				return h(
					'div',
					{
						style: styleParser({font, padding}),
					},
					content
				)
			}
			return null
		}
		return h(
			getTagName(type),
			{
				style: styleParser(layout, this.time),
				'class': ['widget-part', {ready: this.ready}, 'widget-decoration', className],
				props: {
					color: color,
					dur: duration,
					reverse: reverse
				},
				ref: 'widget'
			},
			[getText()]
		)
	},
	computed: {
		mergedConfig() {
			const option = {...this.config.config}
			const type = option.type
			if (!type) option.type = 1
			if (typeof type === 'string' && type.indexOf('reverse') > -1) {
				const [type, reverse] = option.type.split('-')
				option.type = type
				option.reverse = reverse
			}
			if (!option.color) option.color = ['#0de7c2', '#7acaec']
			if (!option.duration) option.duration = 4
			return option
		}
	},
	methods: {
		init() {
		}
	},
	created() {
		this.configSource = this.parseConfigSource(configParseMap, localConfigSource)
		this.configValue = this.parseConfigValue(configParseMap, localConfigValue)
	}
}
