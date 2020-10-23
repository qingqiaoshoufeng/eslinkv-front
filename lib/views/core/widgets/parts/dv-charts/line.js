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
	getSlider,
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
		xAxis: {
			groupLabel: 'x坐标轴配置',
			groupType: 'Collapse',
			fields: {
				name: getInput('name', '坐标轴名称'),
				position: getSelect('position', '坐标轴位置', ['bottom', 'top']),
				'nameGap.nameLocation': [
					getInputNumber('nameGap', '名称', {placeholder: '与坐标轴间距'}),
					getSelect('nameLocation', '名称', ['bottom', 'top'], {placeholder: '位置'})
				],
				'min.max': [
					getInput('min', '坐标轴刻度', {placeholder: '最小值'}),
					getInput('max', '坐标轴刻度', {placeholder: '最大值'})
				],
				'interval.minInterval.maxInterval': [
					getInputNumber('interval', '数值间距', {placeholder: '数值间距'}),
					getInputNumber('minInterval', '数值间距', {placeholder: '最小值'}),
					getInputNumber('maxInterval', '数值间距', {placeholder: '最大值'})
				],
				boundaryGap: getBooleanInput('boundaryGap', '边界间隔'),
				splitNumber: getInputNumber('splitNumber', '分割个数'),
				rLevel: getInputNumber('rLevel', '渲染级别'),
				animationCurve: getAnimationCurve('animationCurve', '缓动曲线'),
				animationFrame: getInputNumber('animationFrame', '缓动效果帧数')
			},
			nameTextStyle: {
				groupLabel: '名称样式配置',
				groupType: 'Collapse',
				fields: {
					fill: getColor('fill', '文字颜色'),
					fontSize: getInputNumber('fontSize', '字体大小')
				}
			},
			axisLine: {
				groupLabel: '坐标轴线配置',
				groupType: 'Collapse',
				fields: {
					show: getBooleanInput('show', '显示轴线')
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
			axisTick: {
				groupLabel: '坐标轴刻度线配置',
				groupType: 'Collapse',
				fields: {
					show: getBooleanInput('show', '显示刻度')
				},
				style: {
					groupLabel: '刻度样式',
					groupType: 'Collapse',
					fields: {
						stroke: getColor('stroke', '颜色'),
						lineWidth: getInputNumber('lineWidth', '线宽')
					}
				}
			},
			axisLabel: {
				groupLabel: '坐标轴标签配置',
				groupType: 'Collapse',
				fields: {
					show: getBooleanInput('show', '显示标签'),
					formatter: getInput('formatter', '标签格试化', {innerType: 'textarea', rows: 2})
				},
				style: {
					groupLabel: '标签样式',
					groupType: 'Collapse',
					fields: {
						fill: getColor('fill', '文字颜色'),
						fontSize: getInputNumber('fontSize', '字体大小'),
						rotate: getInputNumber('rotate', '旋转角度', {max: 90, min: -90})
					}
				}
			},
			splitLine: {
				groupLabel: '坐标轴分割线配置',
				groupType: 'Collapse',
				fields: {
					show: getBooleanInput('show', '显示分割线')
				},
				style: {
					groupLabel: '分割线样式',
					groupType: 'Collapse',
					fields: {
						stroke: getColor('stroke', '颜色'),
						lineWidth: getInputNumber('lineWidth', '线宽')
					}
				}
			}
		},
		yAxis: {
			groupLabel: 'y坐标轴配置',
			groupType: 'Collapse',
			fields: {
				name: getInput('name', '坐标轴名称'),
				position: getSelect('position', '坐标轴位置', ['left', 'right']),
				'nameGap.nameLocation': [
					getInputNumber('nameGap', '名称', {placeholder: '与坐标轴间距'}),
					getSelect('nameLocation', '名称', ['end', 'center', 'start'], {placeholder: '位置'})
				],
				'min.max': [
					getInput('min', '坐标轴刻度', {placeholder: '最小值'}),
					getInput('max', '坐标轴刻度', {placeholder: '最大值'})
				],
				'interval.minInterval.maxInterval': [
					getInputNumber('interval', '数值间距', {placeholder: '数值间距'}),
					getInputNumber('minInterval', '数值间距', {placeholder: '最小值'}),
					getInputNumber('maxInterval', '数值间距', {placeholder: '最大值'})
				],
				boundaryGap: getBooleanInput('boundaryGap', '边界间隔'),
				splitNumber: getInputNumber('splitNumber', '分割个数'),
				rLevel: getInputNumber('rLevel', '渲染级别'),
				animationCurve: getAnimationCurve('animationCurve', '缓动曲线'),
				animationFrame: getInputNumber('animationFrame', '缓动效果帧数')
			},
			nameTextStyle: {
				groupLabel: '名称样式配置',
				groupType: 'Collapse',
				fields: {
					fill: getColor('fill', '文字颜色'),
					fontSize: getInputNumber('fontSize', '字体大小')
				}
			},
			axisLine: {
				groupLabel: '坐标轴线配置',
				groupType: 'Collapse',
				fields: {
					show: getBooleanInput('show', '显示轴线')
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
			axisTick: {
				groupLabel: '坐标轴刻度线配置',
				groupType: 'Collapse',
				fields: {
					show: getBooleanInput('show', '显示刻度')
				},
				style: {
					groupLabel: '刻度样式',
					groupType: 'Collapse',
					fields: {
						stroke: getColor('stroke', '颜色'),
						lineWidth: getInputNumber('lineWidth', '线宽')
					}
				}
			},
			axisLabel: {
				groupLabel: '坐标轴标签配置',
				groupType: 'Collapse',
				fields: {
					show: getBooleanInput('show', '显示标签'),
					formatter: getInput('formatter', '标签格试化', {innerType: 'textarea', rows: 2})
				},
				style: {
					groupLabel: '刻度样式',
					groupType: 'Collapse',
					fields: {
						fill: getColor('fill', '文字颜色'),
						fontSize: getInputNumber('fontSize', '字体大小'),
						rotate: getInputNumber('rotate', '旋转角度', {max: 90, min: -90})
					}
				}
			},
			splitLine: {
				groupLabel: '坐标轴分割线配置',
				groupType: 'Collapse',
				fields: {
					show: getBooleanInput('show', '显示分割线')
				},
				style: {
					groupLabel: '分割线样式',
					groupType: 'Collapse',
					fields: {
						stroke: getColor('stroke', '颜色'),
						lineWidth: getInputNumber('lineWidth', '线宽')
					}
				}
			}
		},
		grid: {
			groupLabel: '直角坐标系内绘图网格配置',
			groupType: 'Collapse',
			fields: {
				'left.top.right.bottom': [
					getInput('left', '边距', {placeholder: '左'}),
					getInput('top', '边距', {placeholder: '上'}),
					getInput('right', '边距', {placeholder: '右'}),
					getInput('bottom', '边距', {placeholder: '下'})
				],
				rLevel: getInputNumber('rLevel', '渲染级别'),
				animationCurve: getAnimationCurve('animationCurve', '缓动曲线'),
				animationFrame: getInputNumber('animationFrame', '缓动效果帧数')
			},
			style: {
				groupLabel: '样式配置',
				groupType: 'Collapse',
				fields: {
					fill: getColor('fill', '颜色')
				}
			}
		},
		seriesConfig: {
			groupLabel: '系列配置',
			groupType: 'Collapse',
			fields: {
				show: getBooleanInput('show', '显示折线'),
				name: getInput('name', '图例标签'),
				stack: getInput('stack', '数据堆叠'),
				smooth: getBooleanInput('smooth', '光滑折线'),
				'xAxisIndex.yAxisIndex': [
					getSelect('xAxisIndex', '坐标系索引', [0, 1], {placeholder: 'x坐标系'}),
					getSelect('yAxisIndex', '坐标系索引', [0, 1], {placeholder: 'y坐标系'})
				],
				rLevel: getInputNumber('rLevel', '渲染级别'),
				animationCurve: getAnimationCurve('animationCurve', '缓动曲线'),
				animationFrame: getInputNumber('animationFrame', '缓动效果帧数')
			},
			lineStyle: {
				groupLabel: '折线样式',
				groupType: 'Collapse',
				fields: {
					stroke: getColor('stroke', '颜色'),
					lineWidth: getInputNumber('lineWidth', '线宽')
				}
			},
			linePoint: {
				groupLabel: '折线点配置',
				groupType: 'Collapse',
				fields: {
					show: getBooleanInput('show', '显示折线点'),
					radius: getInputNumber('radius', '半径')
				},
				style: {
					groupLabel: '折线点样式',
					groupType: 'Collapse',
					fields: {
						fill: getColor('fill', '填充颜色'),
						stroke: getColor('stroke', '线颜色'),
						lineWidth: getInputNumber('lineWidth', '线宽')
					}
				}
			},
			lineArea: {
				groupLabel: '折线区域配置',
				groupType: 'Collapse',
				fields: {
					show: getBooleanInput('show', '显示折线区域'),
					gradient: getColors('gradient', '渐变色')
				},
				style: {
					groupLabel: '折线点样式',
					groupType: 'Collapse',
					fields: {
						opacity: getSlider('opacity', '透明度', 0, 1, {step: 0.01})
					}
				}
			},
			label: {
				groupLabel: '折线标签配置',
				groupType: 'Collapse',
				fields: {
					show: getBooleanInput('show', '显示折线标签'),
					position: getSelect('position', '标签位置', ['top', 'center', 'bottom']),
					offset: getInput('offset', '位置偏移'),
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
			text: '折线图',
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
			show: true,
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
				fill: '#000',
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
		grid: {
			left: '10%',
			top: '15%',
			right: '10%',
			bottom: '20%',
			style: {
				fill: 'rgba(255, 255, 255, 0)'
			},
			rLevel: -30,
			animationCurve: 'easeOutCubic',
			animationFrame: 50
		},
		xAxis: {
			name: '',
			position: 'bottom',
			nameGap: 15,
			nameLocation: 'end',
			nameTextStyle: {
				fill: '#fff',
				fontSize: 10
			},
			min: null,
			max: null,
			interval: null,
			minInterval: null,
			maxInterval: null,
			boundaryGap: true,
			splitNumber: 5,
			axisLine: {
				show: true,
				style: {
					stroke: '#fff',
					lineWidth: 1
				}
			},
			axisTick: {
				show: true,
				style: {
					stroke: '#fff',
					lineWidth: 1
				}
			},
			axisLabel: {
				show: true,
				formatter: null,
				style: {
					fill: '#fff',
					fontSize: 10,
					rotate: 0
				}
			},
			splitLine: {
				show: false,
				style: {
					stroke: '#d4d4d4',
					lineWidth: 1
				}
			},
			rLevel: -20,
			animationCurve: 'easeOutCubic',
			animationFrame: 50
		},
		yAxis: {
			name: '',
			position: 'left',
			nameGap: 15,
			nameLocation: 'end',
			nameTextStyle: {
				fill: '#fff',
				fontSize: 10
			},
			min: null,
			max: null,
			interval: null,
			minInterval: null,
			maxInterval: null,
			boundaryGap: true,
			splitNumber: 5,
			axisLine: {
				show: true,
				style: {
					stroke: '#fff',
					lineWidth: 1
				}
			},
			axisTick: {
				show: true,
				style: {
					stroke: '#fff',
					lineWidth: 1
				}
			},
			axisLabel: {
				show: true,
				formatter: '',
				style: {
					fill: '#fff',
					fontSize: 10,
					rotate: 0
				}
			},
			splitLine: {
				show: true,
				style: {
					stroke: '#d4d4d4',
					lineWidth: 1
				}
			},
			rLevel: -20,
			animationCurve: 'easeOutCubic',
			animationFrame: 50
		},
		seriesConfig: {
			show: true,
			name: '',
			stack: '',
			smooth: false,
			xAxisIndex: 0,
			yAxisIndex: 0,
			lineStyle: {
				stroke: 'rgb(55, 62, 218)',
				lineWidth: 1
			},
			linePoint: {
				show: true,
				radius: 2,
				style: {
					fill: '#fff',
					stroke: 'rgb(55, 62, 218)',
					lineWidth: 1
				}
			},
			lineArea: {
				show: false,
				gradient: [],
				style: {
					opacity: 0.5
				}
			},
			label: {
				show: false,
				position: 'top',
				offset: '0, -10',
				formatter: '',
				style: {
					fontSize: 10
				}
			},
			rLevel: 10,
			animationCurve: 'easeOutCubic',
			animationFrame: 50
		}
	},
	api: {
		data: JSON.stringify({
			legend: {
				data: ['邮件营销', '联盟广告']
			},
			xAxis: {
				data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
			},
			yAxis: {
				data: 'value'
			},
			series: [
				{
					name: '邮件营销',
					data: [1200, 2230, 1900, 2100, 3500, 4200, 3985]
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
		grid: true,
		xAxis: true,
		yAxis: true,
		seriesConfig: true
	},
	api: true,
	animation: true
})
import Vue from 'vue'
import {charts} from '@jiaminghi/data-view'

Vue.use(charts)
export default {
	name: 'widget-line-dvcharts',
	label: '折线图-DataV',
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

			const {title, legend, xAxis, yAxis, grid, seriesConfig, colors} = objectFormatter(config)
			// 图表配置参数
			let option = {
				title,
				legend,
				grid,
				series: [],
				xAxis: null,
				yAxis: null
			}
			// 图例颜色合并
			const legendColors = option.legend.colors ? option.legend.colors.concat(colors) : [...colors]

			if (data !== null) {
				const {xAxis: xAxisData, yAxis: yAxisData, series: seriesData} = data

				// xAxis
				if (Array.isArray(xAxisData)) {
					xAxisData.forEach(item => {
						let mergeConfig = {
							data: item.data,
							...xAxis
						}
						option.xAxis.push(mergeConfig)
					})
				} else {
					option.xAxis = {...xAxis, data: xAxisData.data}
				}

				// yAxis
				if (Array.isArray(yAxisData)) {
					yAxisData.forEach(item => {
						let mergeConfig = {
							data: item.data,
							...yAxis
						}
						option.yAxis.push(mergeConfig)
					})
				} else {
					option.yAxis = {...yAxis, data: yAxisData.data}
				}

				// series 和 legend
				if (seriesData.length) {
					const legendData = []
					seriesData.forEach((item, index) => {
						let mergeConfig = {
							type: 'line',
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
