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
	getFontFamilyList,
	getSlider
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
			groupActive: false,
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
				show: getBooleanInput('show', '显示仪表盘'),
				name: getInput('name', '图例标签名'),
				center: getInput('center', '中心点'),
				radius: getInput('radius', '半径'),
				'startAngle.endAngle': [
					getInput('startAngle', '弧度值', {placeholder: '起始角度'}),
					getInput('endAngle', '弧度值', {placeholder: '结束角度'})
				],
				'min.max': [
					getInputNumber('min', '仪表盘最值', {placeholder: '最小值'}),
					getInputNumber('max', '仪表盘最值', {placeholder: '最大值'})
				],
				splitNum: getInputNumber('splitNum', '分割数目'),
				arcLineWidth: getInputNumber('arcLineWidth', '线条宽度'),
				rLevel: getInputNumber('rLevel', '渲染级别'),
				animationCurve: getAnimationCurve('animationCurve', '缓动曲线'),
				animationFrame: getInputNumber('animationFrame', '缓动效果帧数')
			},
			axisTick: {
				groupLabel: '坐标刻度配置项',
				groupType: 'Collapse',
				fields: {
					show: getBooleanInput('show', '显示刻度'),
					tickLength: getInputNumber('tickLength', '刻度线长度')
				},
				style: {
					groupLabel: '刻度线样式',
					groupType: 'Collapse',
					fields: {
						stroke: getColor('stroke', '颜色'),
						lineWidth: getInputNumber('lineWidth', '线宽')
					}
				}
			},
			axisLabel: {
				groupLabel: '坐标标签配置项',
				groupType: 'Collapse',
				fields: {
					show: getBooleanInput('show', '显示标签'),
					formatter: getInput('formatter', '标签格试化', {innerType: 'textarea', rows: 2}),
					labelGap: getInputNumber('labelGap', '与刻度线间隔')
				},
				style: {
					groupLabel: '标签样式',
					groupType: 'Collapse',
					fields: {
						fill: getColor('fill', '颜色')
					}
				}
			},
			pointer: {
				groupLabel: '仪表盘指针配置项',
				groupType: 'Collapse',
				fields: {
					show: getBooleanInput('show', '显示指针'),
					valueIndex: getInputNumber('valueIndex', '索引值')
				},
				style: {
					groupLabel: '指针样式',
					groupType: 'Collapse',
					fields: {
						scale: getInput('scale', '缩放'),
						fill: getColor('fill', '颜色')
					}
				}
			},
			details: {
				groupLabel: '圆弧的详情的配置项',
				groupType: 'Collapse',
				fields: {
					show: getBooleanInput('show', '显示详情'),
					formatter: getInput('formatter', '内容格试化', {innerType: 'textarea', rows: 2}),
					offset: getInput('offset', '位置偏移量'),
					valueToFixed: getInputNumber('valueToFixed', '小数精度'),
					position: getSelect('position', '详情位置', ['start', 'center', 'end'])
				},
				style: {
					groupLabel: '详情样式',
					groupType: 'Collapse',
					fields: {
						fontSize: getInputNumber('fontSize', '字体大小'),
						fontWeight: getFontWeight('fontWeight', '字体粗细'),
						textAlign: getSelect('textAlign', '水平对齐', ['auto', 'left', 'right', 'center']),
						textBaseline: getSelect('textBaseline', '垂直对齐', ['auto', 'top', 'bottom', 'middle'])
					}
				}
			},
			backgroundArc: {
				groupLabel: '仪表盘背景圆弧配置',
				groupType: 'Collapse',
				fields: {
					show: getBooleanInput('show', '显示背景环')
				},
				style: {
					groupLabel: '背景环样式',
					groupType: 'Collapse',
					fields: {
						stroke: getColor('stroke', '颜色'),
						opacity: getSlider('opacity', '透明度', 0, 1, {step: 0.01})
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
			text: '仪表盘',
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
			show: true,
			name: '',
			center: '50%,50%',
			radius: '60%',
			startAngle: -(Math.PI / 4) * 5,
			endAngle: Math.PI / 4,
			min: 0,
			max: 100,
			splitNum: 5,
			arcLineWidth: 15,
			rLevel: 10,
			animationCurve: 'easeOutCubic',
			animationFrame: 50,
			axisTick: {
				show: true,
				tickLength: 6,
				style: {
					stroke: '#999',
					lineWidth: 1
				}
			},
			axisLabel: {
				show: true,
				formatter: '{value}',
				labelGap: 5,
				style: {
					fill: '#fff'
				}
			},
			pointer: {
				show: true,
				valueIndex: 0,
				style: {
					scale: '1,1',
					fill: '#fb7293'
				}
			},
			details: {
				show: false,
				formatter: '{value}',
				offset: '0,0',
				valueToFixed: 0,
				position: 'center',
				style: {
					fontSize: 20,
					fontWeight: 'bold',
					textAlign: 'center',
					textBaseline: 'middle'
				}
			},
			backgroundArc: {
				show: true,
				style: {
					stroke: '#999',
					opacity: 0.4
				}
			}
		}
	},
	api: {
		data: JSON.stringify({
			series: [
				{
					data: [
						{
							name: 'itemA',
							value: 55
						}
					]
				}
			]
		}, null, 2)
	}
})

// 用于筛选预置配置项
const configParseMap = {
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
	name: 'widget-gauge-dvcharts',
	label: '仪表盘-DataV',
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

			if (data !== null && seriesConfig) {

				const {series: seriesData} = data

				// series 和 legend
				if (seriesData) {
					const legendData = []
					seriesData.forEach((item, index) => {
						let mergeConfig = {
							type: 'gauge',
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
		this.configValue = this.parseConfigValue(configParseMap, localConfigValue)
	},
	beforeDestroy() {
		this.dataUpdateTimer && clearTimeout(this.dataUpdateTimer)
	}
}
