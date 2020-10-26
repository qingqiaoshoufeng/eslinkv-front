<script>
	import styleParser from '../../lib/style-parser'
	import widgetMixin from '../../lib/widget-mixin'
	import {
		getInput,
		getSelect,
		getBooleanInput,
		getInputNumber,
		getNumberWithUnit,
		getColor,
		getBackground
	} from '../../lib/config-tools'
	import isEqualByType from './is-equal-by-type'
	import getValueByType from './get-value-by-type'
	import {Icon} from 'view-design'
	// 组件参数配置
	const localConfigSource = Object.freeze({
		layout: {
			background: {
				fields: {
					url: getBackground('url', '背景图片', {params: {type: 3}, mountToBody: true}),
				}
			}
		},
		config: {
			fields: {
				showLabel: getBooleanInput('showLabel', '显示标签'),
				label: getInput('label', '标签文本', {placeholder: '标签文本'}),
				showPlaceholder: getBooleanInput('showPlaceholder', '显示占位文本'),
				placeholder: getInput('placeholder', '占位文本', {placeholder: '占位文本'}),
				clearable: getBooleanInput('clearable', '可清空'),
				value: getInput('value', '默认值', {placeholder: '默认值'}),
				valueType: getSelect('valueType', '数据类型', ['文本:text', '数值:number', '日期:date', '时间:time']),
				hideIcon: getBooleanInput('hideIcon', '隐藏图标')
			}
		}
	})

	const localConfigValue = Object.freeze({
		layout: {
			font: {
				color: '#a9a9a9',
				size: 14
			},
			background: {
				color: '#414141'
			},
			border: {
				topLeftRadius: 5,
				topRightRadius: 5,
				bottomRightRadius: 5,
				bottomLeftRadius: 5
			}
		},
		config: {
			showLabel: true,
			label: '查询',
			showPlaceholder: true,
			placeholder: '输入关键字',
			clearable: true,
			value: '',
			valueType: 'text',
			hideIcon: false
		},
		api: {
			bind: {
				role: ['provider']
			}
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
			showLabel: true,
			label: true,
			showPlaceholder: true,
			placeholder: true,
			clearable: true,
			value: true,
			valueType: true,
			hideIcon: true
		},
		api: {
			bind: {
				enable: true,
				role: true
			}
		},
		animation: true
	}

	export default {
		name: 'widget-keyword-input',
		label: '关键字查询',
		mixins: [widgetMixin],
		components: {Icon},
		data() {
			return {
				output: null
			}
		},
		render: function (h) {
			const {layout} = this.config
			const {
				showLabel, label, value, valueType,
				placeholder, showPlaceholder, clearable, hideIcon
			} = this.mergedConfig

			const id = 'keyword-input-' + (Math.random() * 1000000 | 0)

			const body = [
				h(
					'input',
					{
						'class': ['keyword-input', `type-${valueType}`],
						style: {
							[!hideIcon && 'padding-right']: '2.5em'
						},
						attrs: {
							type: valueType,
							id,
							[showPlaceholder && 'placeholder']: placeholder
						},
						domProps: {
							value: this.output
						},
						on: {
							input: e => {
								this.output = getValueByType(e.srcElement.value, valueType)
							}
						}
					}
				)
			]

			if (!hideIcon) {
				body.push(h(
					'Icon',
					{
						'class': 'keyword-input-icon',
						props: {
							type: 'ios-search'
						}
					}
				))
			}

			if (clearable) {
				body.push(h(
					'div',
					{
						'class': ['keyword-input-clear', {hide: !this.output}],
						on: {
							click: () => {
								this.output = ''
							}
						}
					},
					'×'
				))
			}

			return h(
				'div',
				{
					style: styleParser(layout, this.time),
					'class': ['widget-keyword-input', 'widget-part'],
					ref: 'widget'
				},
				[
					showLabel && label && h(
						'label',
						{
							'class': 'keyword-input-label',
							attrs: {
								for: id
							}
						},
						label
					),
					h(
						'div',
						{class: 'keyword-input-wrapper'},
						body
					)
				]
			)
		},
		methods: {
			parseOptions(options) {
				return options.split(',').map(item => {
					const [label, value] = item.split(':')
					return {label, value}
				})
			}
		},
		computed: {
			mergedConfig() {
				const {
					showLabel = true,
					label = '查询',
					showPlaceholder = true,
					placeholder = '输入关键字',
					value = 1,
					valueType = 'Number',
					clearable = true,
					hideIcon = false
				} = this.config.config || {}

				return {
					showLabel,
					label,
					showPlaceholder,
					placeholder,
					value,
					valueType,
					clearable,
					hideIcon
				}
			}
		},
		watch: {
			output(value) {
				this.config.config.value = value
			},
			'config.config.value': {
				handler: function (value) {
					if (value === undefined || this.output === value) return
					this.output = value
				},
				immediate: true
			}
		},
		created() {
			this.configSource = this.parseConfigSource(configParseMap, localConfigSource)
			this.configValue = this.parseConfigValue(configParseMap, localConfigValue)
		}
	}
</script>

<style lang="scss" scoped>
	.widget-keyword-input {
		display: flex;
		align-items: center;
		overflow: hidden;

		&:hover,
		&:focus-within {
			.keyword-input-clear {
				opacity: 1;
				pointer-events: auto;
				transition: opacity 0.2s 0.2s;
			}
		}

		&:focus-within {
			box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.3);
		}
	}

	.keyword-input-label {
		position: relative;
		padding: 0 1em;
		white-space: nowrap;

		&:after {
			content: '';
			position: absolute;
			right: 0px;
			top: 0;
			bottom: 0;
			margin: auto 0;
			height: 1em;
			width: 1px;
			background-color: rgba(255, 255, 255, 0.15);
		}
	}

	.keyword-input-wrapper {
		position: relative;
		width: 100%;
		height: 100%;
	}

	.keyword-input-clear {
		position: absolute;
		right: 0.85em;
		top: 0;
		bottom: 0;
		margin: auto 0;
		width: 1.3em;
		height: 1.3em;
		border-radius: 50%;
		background-color: #595959;
		color: #e6e6e6;
		display: flex;
		justify-content: center;
		align-items: center;
		opacity: 0;
		pointer-events: none;
		transition: opacity 0;
		cursor: pointer;

		&.hide {
			display: none;
		}
	}

	.keyword-input-icon {
		position: absolute;
		top: 0;
		right: 0;
		height: 100%;
		display: flex;
		align-items: center;
		padding: 0 1em 0 0;
		font-size: 1em;
		pointer-events: none;
	}

	.keyword-input {
		width: 100%;
		height: 100%;
		border: none;
		background: none;
		outline: none;
		color: inherit;
		padding: 0 0.7em 0 1em;
		text-align: inherit;
		cursor: pointer;

		&.type-number {
			-moz-appearance: textfield;

			&::-webkit-inner-spin-button,
			&::-webkit-outer-spin-button {
				-webkit-appearance: none;
				margin: 0;
			}
		}
	}
</style>
