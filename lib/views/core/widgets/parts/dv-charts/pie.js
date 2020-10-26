import styleParser from '../lib/style-parser'
import widgetMixin from '../lib/widget-mixin'
import objectFormatter from '../lib/object-formatter'
import {
	getInput,
	getSelect,
	getBooleanInput,
	getColor,
	getColors,
	getInputNumber,
	getAnimationCurve,
	getFontWeight,
	getFontFamilyList
} from '../lib/config-tools'

// 组件参数配置
const localConfigSource = Object.freeze({
	config: {
		groupLabel: '组件配置',
		groupType: 'Tabs',
		fields: {
			colors: getColors('colors', '图表颜色')
		},
		title: {
			groupLabel: '标题配置',
			groupType: 'Collapse',
			groupActive: true,
			fields: {
				show: getBooleanInput('show', '显示标题'),
				text: getInput('text', '图表标题'),
				offset: getInput('offset', '位置偏移'),
				rLevel: getInputNumber('rLevel', '渲染级别'),
				animationCurve: getAnimationCurve('animationCurve', '缓动曲线'),
				animationFrame: getInputNumber('animationFrame', '缓动效果帧数')
			},
			style: {
				groupLabel: '样式配置',
				groupType: 'Collapse',
				fields: {
					fill: getColor('fill', '文字颜色'),
					fontSize: getInputNumber('fontSize', '字体大小'),
					fontWeight: getFontWeight('fontWeight', '字体粗细'),
					textAlign: getSelect('textAlign', '水平对齐', ['auto', 'left', 'right', 'center']),
					textBaseline: getSelect('textBaseline', '垂直对齐', ['auto', 'top', 'bottom', 'middle'])
				}
			}
		},
		legend: {
			groupLabel: '图例配置',
			groupType: 'Collapse',
			fields: {
				show: getBooleanInput('show', '显示图例'),
				orient: getSelect('orient', '图例方向', ['horizontal', 'vertical']),
				'left.right.top.bottom': [
					getInput('left', '图例边距', {placeholder: '左'}),
					getInput('right', '图例边距', {placeholder: '右'}),
					getInput('top', '图例边距', {placeholder: '上'}),
					getInput('bottom', '图例边距', {placeholder: '下'})
				],
				itemGap: getInputNumber('itemGap', '标签间距'),
				'iconWidth.iconHeight': [
					getInputNumber('iconWidth', '标签图标', {placeholder: '宽度'}),
					getInputNumber('iconHeight', '标签图标', {placeholder: '高度'})
				],
				selectAble: getBooleanInput('selectAble', '选择功能'),
				colors: getColors('colors', '标签颜色'),
				icon: getSelect('icon', '标签形状', ['rect', 'line']),
				rLevel: getInputNumber('rLevel', '渲染级别'),
				animationCurve: getAnimationCurve('animationCurve', '缓动曲线'),
				animationFrame: getInputNumber('animationFrame', '缓动效果帧数')
			},
			textStyle: {
				groupLabel: '标签文字样式配置',
				groupType: 'Collapse',
				fields: {
					fill: getColor('fill', '文字颜色'),
					fontSize: getInputNumber('fontSize', '字体大小'),
					fontFamily: getFontFamilyList('fontFamily', '字体')
				}
			},
			textUnselectedStyle: {
				groupLabel: '未选择的图例标签文字默认样式',
				groupType: 'Collapse',
				fields: {
					fill: getColor('fill', '文字颜色'),
					fontSize: getInputNumber('fontSize', '字体大小'),
					fontFamily: getFontFamilyList('fontFamily', '字体')
				}
			},
			iconUnselectedStyle: {
				groupLabel: '未选择的图例标签图标默认样式',
				groupType: 'Collapse',
				fields: {
					fill: getColor('fill', '标签颜色')
				}
			}
		},
		seriesConfig: {
			groupLabel: '系列配置',
			groupType: 'Collapse',
			fields: {
				name: getInput('name', '图例标签名'),
				radius: getInput('radius', '半径'),
				center: getInput('center', '中心点'),
				startAngle: getInput('startAngle', '弧度值'),
				roseType: getBooleanInput('roseType', '启用玫瑰图模式'),
				roseSort: getBooleanInput('roseSort', '启用自动排序'),
				roseIncrement: getInput('roseIncrement', '玫瑰半径递增值'),
				percentToFixed: getInputNumber('percentToFixed', '小数精度'),
				rLevel: getInputNumber('rLevel', '渲染级别'),
				animationDelayGap: getAnimationCurve('animationDelayGap', '动画延迟'),
				animationCurve: getAnimationCurve('animationCurve', '缓动曲线'),
				startAnimationCurve: getAnimationCurve('startAnimationCurve', '起始缓动曲线'),
				animationFrame: getInputNumber('animationFrame', '缓动效果帧数')
			},
			insideLabel: {
				groupLabel: '饼状图内部标签配置',
				groupType: 'Collapse',
				fields: {
					show: getBooleanInput('show', '显示内部标签'),
					formatter: getInput('formatter', '标签格试化', {innerType: 'textarea', rows: 2})
				},
				style: {
					groupLabel: '标签样式',
					groupType: 'Collapse',
					fields: {
						fill: getColor('fill', '字体颜色'),
						fontSize: getInputNumber('fontSize', '字体大小'),
						textAlign: getSelect('textAlign', '水平对齐', ['auto', 'left', 'right', 'center']),
						textBaseline: getSelect('textBaseline', '垂直对齐', ['auto', 'top', 'bottom', 'middle'])
					}
				}
			},
			outsideLabel: {
				groupLabel: '饼状图外部标签配置',
				groupType: 'Collapse',
				fields: {
					show: getBooleanInput('show', '显示外部标签'),
					formatter: getInput('formatter', '标签格试化', {innerType: 'textarea', rows: 2}),
					labelLineBendGap: getInput('labelLineBendGap', '标签线弯曲点与饼状图的间距'),
					labelLineEndLength: getInputNumber('labelLineEndLength', '标签线末端长度')
				},
				style: {
					groupLabel: '标签样式',
					groupType: 'Collapse',
					fields: {
						fontSize: getInputNumber('fontSize', '字体大小')
					}
				},
				labelLineStyle: {
					groupLabel: '标签线默认配置',
					groupType: 'Collapse',
					fields: {
						lineWidth: getInputNumber('lineWidth', '线宽')
					}
				}
			},
			pieStyle: {}
		}
	}
})

const localConfigValue = Object.freeze({
	widget: {},
	layout: {
		size: {
			width: 400,
			height: 300
		}
	},
	config: {
		colors: ['#37a2da', '#32c5e9', '#67e0e3', '#9fe6b8', '#ffdb5c', '#ff9f7f', '#fb7293'],
		title: {
			show: true,
			text: '饼图',
			offset: '0, -20',
			style: {
				fill: '#fff',
				fontSize: 12,
				fontWeight: 'bold',
				textAlign: 'center',
				textBaseline: 'bottom'
			},
			rLevel: 20,
			animationCurve: 'easeOutCubic',
			animationFrame: 50
		},
		legend: {
			show: false,
			orient: 'horizontal',
			left: 'auto',
			right: 'auto',
			top: 'auto',
			bottom: 'auto',
			itemGap: 10,
			iconWidth: 25,
			iconHeight: 10,
			selectAble: true,
			colors: [],
			icon: 'rect',
			textStyle: {
				fill: '#fff',
				fontSize: 13,
				fontFamily: 'Arial'
			},
			textUnselectedStyle: {
				fill: '#fff',
				fontSize: 13,
				fontFamily: 'Arial'
			},
			iconUnselectedStyle: {
				fill: '#999'
			},
			rLevel: 20,
			animationCurve: 'easeOutCubic',
			animationFrame: 50
		},
		seriesConfig: {
			name: '',
			radius: '60%',
			center: '50%,50%',
			startAngle: -Math.PI / 2,
			roseType: false,
			roseSort: false,
			roseIncrement: 'auto',
			percentToFixed: 0,
			rLevel: 10,
			animationDelayGap: 60,
			animationCurve: 'easeOutCubic',
			startAnimationCurve: 'easeOutCubic',
			animationFrame: 50,
			insideLabel: {
				show: false,
				formatter: '{percent}%',
				style: {
					fill: '#fff',
					fontSize: 10,
					textAlign: 'center',
					textBaseline: 'middle'
				}
			},
			outsideLabel: {
				show: true,
				formatter: '{name}',
				labelLineBendGap: '20%',
				labelLineEndLength: 50,
				style: {
					fontSize: 11
				},
				labelLineStyle: {
					lineWidth: 1
				}
			}
		}
	},
	api: {
		data: JSON.stringify({
			series: [
				{
					data: [
						{name: '可口可乐', value: 93},
						{name: '百事可乐', value: 32},
						{name: '哇哈哈', value: 65},
						{name: '康师傅', value: 44},
						{name: '统一', value: 52}
					]
				}
			]
		}, null, 2)
	}
})


// 用于筛选预置配置项
const configParseMap ={
	layout: true,
	config: {
		colors: true,
		title: true,
		legend: true,
		seriesConfig: true
	},
	api: true,
	animation: true
}
import Vue from 'vue'
import {charts} from '@jiaminghi/data-view'

Vue.use(charts)
export default {
	name: 'widget-pie-dvcharts',
	label: '饼图-DataV',
	mixins: [widgetMixin],
	data() {
		return {
			dataUpdateTimer: null
		}
	},
	render: function (createElement) {
		const {layout} = this.config
		const option = this.mergedConfig
		return createElement(
			'dv-charts',
			{
				style: styleParser(layout, this.time),
				'class': ['widget-part', {ready: this.ready}, 'widget-charts'],
				props: {
					option
				},
				ref: 'widget'
			}
		)
	},
	computed: {
		mergedConfig() {
			const {config} = this.config
			const option = this.getResultOption(config, this.data)
			return option
		}
	},
	methods: {
		getResultOption(config, data) {
			if (!config || Object.keys(config).length < 2) return

			const {title, legend, seriesConfig, colors} = objectFormatter(config)
			// 图表配置参数
			let option = {
				color: colors,
				title,
				legend,
				series: []
			}

			// 图例颜色合并
			const legendColors = option.legend.colors ? option.legend.colors.concat(colors) : [...colors]

			if (data !== null) {
				const {series: seriesData} = data

				// series 和 legend
				if (seriesData.length) {
					const legendData = []
					seriesData.forEach((item, index) => {
						let mergeConfig = {
							type: 'pie',
							...seriesConfig,
							...item
						}
						option.series.push(mergeConfig)

						if (item.name) {
							legendData.push({
								name: item.name,
								color: legendColors[index],
								icon: option.legend.icon
							})
						}
					})
					option.legend.data = legendData
				}
			}

			return option
		},
		init() {
			this.$refs.widget && this.$refs.widget.initWH()
		}
	},
	created() {
		this.configSource = this.parseConfigSource(configParseMap, localConfigSource)
		this.configValue = this.parseConfigValue(configParseMap, localConfigValue)
	},
	beforeDestroy() {
		this.dataUpdateTimer && clearTimeout(this.dataUpdateTimer)
	}
}
