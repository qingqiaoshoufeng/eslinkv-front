import styleParser from '../lib/style-parser'
import widgetMixin from '../lib/widget-mixin'
import {getInput, getSelect, getBackground, getRadio} from '../lib/config-tools'

// 组件参数配置
const localConfigSource = Object.freeze({
	layout: {
		background: {
			fields: {
				url: getBackground('url', '背景图片', {params: {type: 1}, mountToBody: true}),
			}
		}
	},
	config: {
		fields: {
			title: getInput('title', '标题文本', {
				placeholder: '标题文本'
			}),
			vAlign: getRadio('vAlign', '垂直对齐', ['顶部对齐:left', '居中对齐:center', '底部对齐:right']),
			level: getSelect('level', '标题等级', ['一级标体:1', '二级标题:2', '三级标题:3', '四级标题:4', '五级标题:5', '六级标题:6'])
		}
	}
})

const localConfigValue = Object.freeze({
	layout: {
		font: {
			color: '#3de7c9',
			size: 21,
			lineHeight: 3,
			whiteSpace: 'nowrap'
		}
	},
	config: {
		title: '',
		level: '1',
		vAlign: 'center'
	},
	api: {
		data: '标题文本'
	}
})

// 用于筛选预置配置项
const configParseMap = {
	layout: {
		size: {
			'$width.height.unit': true
		},
		font: true,
		position: true,
		background: true,
		border: true,
		padding: true,
		zIndex: true,
		custom: true,
		opacity: true
	},
	config: {
		title: true,
		vAlign: true,
		level: true
	},
	api: true,
	animation: true
}

const align = {
	left: 'flex-start',
	center: 'center',
	right: 'flex-end'
}

export default {
	name: 'widget-level-title',
	label: '标题',
	mixins: [widgetMixin],
	render: function (createElement) {
		const {layout} = this.config
		const {level, title, vAlign} = this.mergedConfig
		const hAlign = layout.font.align
		const flexStyle = ['display: flex']
		flexStyle.push(`justify-content: ${align[hAlign]}`)
		flexStyle.push(`align-items: ${align[vAlign]}`)
		const styles = styleParser(layout, this.time)
		return createElement(
			'h' + level,
			{
				style: `${flexStyle.join(';')};${styles}`,
				'class': ['widget-level-title', 'widget-part'],
				ref: 'widget'
			},
			title
		)
	},
	computed: {
		mergedConfig() {
			if (!this.config.config) return {level: '1'}
			const option = {...this.config.config}
			if (!option.level) option.level = '1'
			if (!option.title) option.title = '标题文本'
			if (this.data) {
				option.title = this.data
				this.config.config.title = this.data
			}
			return option
		}
	},
	watch: {
		'config.config.title'(value) {
			this.data = value
		}
	},
	created() {
		this.configValue = this.parseConfigValue(configParseMap, localConfigValue)
	}
}
