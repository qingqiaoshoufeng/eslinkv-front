<template>
	<div class="widget-part" :style="styles">
		hello world111
	</div>
</template>
<script>
	import {
		styleParser,
		widgetMixin,
		getInput,
		getInputNumber,
		getSelect,
		getColors,
		getAnimationCurve,
		getBooleanInput
	} from '../../../../lib'

	// 组件参数配置
	const localConfigSource = Object.freeze({
		config: {
			fields: {
				duration: getInputNumber('duration', '动画时长'),
				easing: getSelect('easing', '动画效果', ['linear', 'ease', 'ease-in', 'ease-out', 'ease-in-out']),
				align: getSelect('align', '对齐方式', ['left', 'right', 'top', 'bottom']),
				show: getBooleanInput('show', '显示文本')
			}
		}
	})

	const localConfigValue = Object.freeze({
		layout: {
			font: {
				color: '#fff',
				size: 12,
				lineHeight: 1.5
			}
		},
		config: {
			duration: 1000,
			easing: 'ease',
			align: 'left',
			show: false
		},
		api: {
			data: 0.75
		}
	})

	// 用于筛选预置配置项
	const configParseMap = Object.freeze({
		widget: true,
		layout: {
			size: {
				'$width.height.unit': true
			},
			font: true,
			position: true,
			border: true,
			padding: true,
			zIndex: true,
			custom: true,
			opacity: true
		},
		config: {
			duration: true,
			easing: true,
			align: true,
			show: true
		},
		api: true,
		animation: true
	})
	export default {
		name: 'test',
		label: '比例条111',
		mixins: [widgetMixin],
		data() {
			return {
				barName: Date.now().toString(36)
			}
		},
		methods: {
			init() {
			}
		},
		computed: {
			styles() {
				const {layout} = this.config
				return styleParser(layout, this.time)
			},
			mergedConfig() {
				if (!this.config.config) return false
				const option = {...this.config.config}
				return option
			}
		},
		mounted() {
			setTimeout(() => {
				this.$forceUpdate()
			}, 700)
		},
		created() {
			this.configSource = this.parseConfigSource(configParseMap, localConfigSource)
			this.configValue = this.parseConfigValue(configParseMap, localConfigValue)
		}
	}
</script>
