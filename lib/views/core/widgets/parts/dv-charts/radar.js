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
		radar: {
			groupLabel: '雷达图坐标系配置',
			groupType: 'Collapse',
			fields: {
				show: getBooleanInput('show', '显示坐标系'),
				center: getInput('center', '中心点'),
				radius: getInput('radius', '半径'),
				startAngle: getInput('startAngle', '弧度值'),
				splitNum: getInputNumber('splitNum', '分割数目'),
				polygon: getBooleanInput('show', '启用多边形坐标系'),
				rLevel: getInputNumber('rLevel', '渲染级别'),
				animationCurve: getAnimationCurve('animationCurve', '缓动曲线'),
				animationFrame: getInputNumber('animationFrame', '缓动效果帧数')
			},
			axisLabel: {
				groupLabel: '坐标系标签配置',
				groupType: 'Collapse',
				fields: {
					show: getBooleanInput('show', '显示标签'),
					labelGap: getInputNumber('labelGap', '与坐标系间距'),
					color: getColors('color', '标签颜色', {placeholder: '将覆盖style.fill'})
				},
				style: {
					groupLabel: '标签样式',
					groupType: 'Collapse',
					fields: {
						fill: getColor('fill', '标签颜色')
					}
				}
			},
			axisLine: {
				groupLabel: '坐标轴线配置',
				groupType: 'Collapse',
				fields: {
					show: getBooleanInput('show', '显示轴线'),
					color: getColors('color', '轴线颜色', {placeholder: '将覆盖style.fill'})
				},
				style: {
					groupLabel: '轴线样式',
					groupType: 'Collapse',
					fields: {
						stroke: getColor('stroke', '颜色'),
						lineWidth: getInputNumber('lineWidth', '线宽')
					}
				}
			},
			splitLine: {
				groupLabel: '坐标系分隔线配置',
				groupType: 'Collapse',
				fields: {
					show: getBooleanInput('show', '显示分割线'),
					color: getColors('color', '分割线颜色', {placeholder: '将覆盖style.stroke'})
				},
				style: {
					groupLabel: '分割线样式',
					groupType: 'Collapse',
					fields: {
						stroke: getColor('stroke', '颜色'),
						lineWidth: getInputNumber('lineWidth', '线宽')
					}
				}
			},
			splitArea: {
				groupLabel: '坐标系分隔区配置',
				groupType: 'Collapse',
				fields: {
					show: getBooleanInput('show', '显示分割区'),
					color: getColors('color', '分割线颜色', {placeholder: '将覆盖style.stroke'})
				},
				style: {
					groupLabel: '分割线样式',
					groupType: 'Collapse',
					fields: {
						stroke: getColor('stroke', '颜色')
					}
				}
			}
		},
		seriesConfig: {
			groupLabel: '系列配置',
			groupType: 'Collapse',
			fields: {
				show: getBooleanInput('show', '显示雷达图'),
				name: getInput('name', '图例标签名'),
				rLevel: getInputNumber('rLevel', '渲染级别'),
				animationCurve: getAnimationCurve('animationCurve', '缓动曲线'),
				animationFrame: getInputNumber('animationFrame', '缓动效果帧数')
			},
			radarStyle: {
				groupLabel: '样式配置',
				groupType: 'Collapse',
				fields: {
					lineWidth: getInputNumber('lineWidth', '线宽')
				}
			},
			point: {
				groupLabel: '雷达图球点配置',
				groupType: 'Collapse',
				fields: {
					show: getBooleanInput('show', '显示球点'),
					radius: getInputNumber('radius', '球点半径')
				},
				style: {
					groupLabel: '雷达图球点样式',
					groupType: 'Collapse',
					fields: {
						fill: getColor('fill', '颜色')
					}
				}
			},
			label: {
				groupLabel: '雷达图标签配置',
				groupType: 'Collapse',
				fields: {
					show: getBooleanInput('show', '显示标签'),
					offset: getInput('offset', '位置偏移'),
					labelGap: getInputNumber('labelGap', '与雷达图间隔'),
					formatter: getInput('formatter', '标签格试化', {innerType: 'textarea', rows: 2})
				},
				style: {
					groupLabel: '标签样式',
					groupType: 'Collapse',
					fields: {
						fontSize: getInputNumber('fontSize', '字体大小')
					}
				}
			}
		}
	}
})

const localConfigValue = Object.freeze({
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
			text: '雷达图',
			offset: '0, -40',
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
		radar: {
			show: true,
			center: '50%,50%',
			radius: '65%',
			startAngle: -Math.PI / 2,
			splitNum: 5,
			polygon: false,
			rLevel: -10,
			animationCurve: 'easeOutCubic',
			animationFrame: 50,
			axisLabel: {
				show: true,
				labelGap: 15,
				color: [],
				style: {
					fill: '#fff'
				}
			},
			axisLine: {
				show: true,
				color: [],
				style: {
					stroke: '#999',
					lineWidth: 1
				}
			},
			splitLine: {
				show: true,
				color: [],
				style: {
					stroke: '#d4d4d4',
					lineWidth: 1
				}
			},
			splitArea: {
				show: false,
				color: [],
				style: {
					stroke: '#fff'
				}
			}
		},
		seriesConfig: {
			show: true,
			name: '',
			rLevel: 10,
			animationCurve: 'easeOutCubic',
			animationFrame: 50,
			radarStyle: {
				lineWidth: 1
			},
			point: {
				show: true,
				radius: 2,
				style: {
					fill: '#fff'
				}
			},
			label: {
				show: true,
				offset: '0,0',
				labelGap: 5,
				formatter: '',
				style: {
					fontSize: 10
				}
			}
		}
	},
	api: {
		data: JSON.stringify({
			indicator: [
				{name: '西峡', max: 300},
				{name: '周口', max: 300},
				{name: '南阳', max: 300},
				{name: '驻马店', max: 300},
				{name: '郑州', max: 300},
				{name: '洛阳', max: 300}
			],
			series: [
				{
					data: [111, 256, 178, 152, 266, 132]
				}
			]
		}, null, 2)
	}
})

// 用于筛选预置配置项
const configParseMap = Object.freeze({
	widget: true,
	layout: true,
	config: {
		colors: true,
		title: true,
		legend: true,
		radar: true,
		seriesConfig: true
	},
	api: true,
	animation: true
})
import Vue from 'vue'
import {charts} from '@jiaminghi/data-view'

Vue.use(charts)
export default {
	name: 'widget-radar-dvcharts',
	label: '雷达图-DataV',
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

			const {title, legend, radar, seriesConfig, colors} = objectFormatter(config)
			// 图表配置参数
			let option = {
				color: colors,
				title,
				legend,
				radar,
				series: []
			}

			// 图例颜色合并
			const legendColors = option.legend.colors ? option.legend.colors.concat(colors) : [...colors]

			if (data !== null && seriesConfig) {
				const {indicator, series: seriesData} = data

				// 坐标系指示符
				option.radar.indicator = indicator

				// series 和 legend
				if (seriesData.length) {
					const legendData = []
					seriesData.forEach((item, index) => {
						let mergeConfig = {
							type: 'radar',
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
