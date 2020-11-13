<script>
	import fSelect from './select'
	import colorsPicker from './colors-picker'
	import ratioInput from './ratio'
	import colorInput from './color-input'
	import backgroundPicker from './background-picker'
	import uploadFile from './upload-file'
	import isJsonEqual from '../is-json-equal'
	import arrayGroup from './mixin/array-group'
	import button from './mixin/button'
	import colorPicker from './mixin/color-picker'
	import input from './mixin/input'
	import inputNumber from './mixin/input-number'
	import fieldControls from './mixin/field-controls'
	import sourceToLayout from '../../widgets/parts/lib/source-to-layout'
	import iconSelect from './icon-select.vue'
	import dragDropPond from './drag-drop-pond'
	import eChartsFunctionEdit from './echarts-function-edit'
	import {Icon, Checkbox, RadioGroup, Radio, CheckboxGroup, Slider, DatePicker} from 'view-design'
	import generateResultSet from '../../widgets/parts/lib/generate-result-set'

	export default {
		name: 'fields',
		mixins: [arrayGroup, button, colorPicker, input, inputNumber, fieldControls],
		components: {
			Checkbox, RadioGroup, Radio, Icon, CheckboxGroup, Slider, DatePicker,
			fSelect,
			colorsPicker,
			backgroundPicker,
			uploadFile,
			ratioInput,
			colorInput,
			iconSelect,
			dragDropPond,
			eChartsFunctionEdit
		},
		props: {
			fields: {
				type: Array,
				default: []
			},
			value: {
				type: Object,
				default: {}
			},
			hideItemsMoreThan: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				ready: false,
				innerValue: {},
				defaultValueMark: {},
				dynamicOptions: {},
				configPanelActiveStatus: {},
				isItemsHide: false
			}
		},
		methods: {
			// icon: 支持 iviewui 内置全部图标
			createLabel(h, label, icon) {
				return h(
					'label',
					{
						class: 'field-label'
					},
					!icon ? label : [
						h(
							'Icon',
							{
								style: 'margin-right: .4em;',
								props: {
									type: icon
								}
							}
						),
						label
					]
				)
			},
			createOptions(h, {type, list}) {
				return list.map(({value, label, icon}) => {
					const isOption = type === 'Option'
					let props
					let children
					if (isOption) {
						props = {value, key: label}
						children = label
					} else {
						props = {label: value, key: label}
						children = [h(
							'span',
							label
						)]
						icon && children.unshift(h(
							'Icon',
							{
								props: {
									type: icon
								}
							}
						))
					}
					return h(
						type,
						{props},
						children
					)
				})
			},
			// 创建 iView 表单元素
			createFieldElement(h, field) {
				const valueSet = this.innerValue
				const {type, field: fieldName, innerType, title, placeholder, options, defaultValue, ...otherProps} = field
				// 字段关联控制
				const {
					setValue: controlValue,
					clear: controlClear,
					reset: controlReset
				} = this.controls
				if (controlReset[fieldName]) valueSet[fieldName] = defaultValue === 0 ? defaultValue : defaultValue || null
				if (controlValue[fieldName]) valueSet[fieldName] = controlValue[fieldName]
				if (controlClear[fieldName]) valueSet[fieldName] = ''

				this.setDefaultValueMark(defaultValue, fieldName)

				field.title = title || placeholder

				const value = valueSet[fieldName]
				const props = {
					value,
					...otherProps
				}

				const handleValueInput = value => {
					if (valueSet[fieldName] === undefined) {
						this.$set(valueSet, fieldName, value)
					} else {
						valueSet[fieldName] = value
					}
				}

				innerType && (props.type = innerType)
				switch (type) {
					case 'Input':
						return this.createInput(h, field, valueSet)
					case 'InputNumber':
						return this.createInputNumber(h, field, valueSet)
					case 'Select':
						return h(
							'f-select',
							{
								domProps: {
									value
								},
								props: {
									value,
									field: fieldName,
									options,
									...otherProps,
									title,
									form: valueSet
								},
								on: {
									'input': handleValueInput
								}
							}
						)
					case 'ColorPicker':
						return this.createColorPicker(h, field, valueSet)
					case 'Button':
						return this.createButton(h, field)
					case 'ArrayGroup':
						if (!valueSet[fieldName]) this.$set(this.innerValue, fieldName, [])
						return this.createArrayGroup(h, field, this.innerValue)
					case 'DatePicker':
						return h(
							'DatePicker',
							{
								props: {
									transfer: true,
									...props
								},
								class: 'field-input',
								on: {
									'input': handleValueInput,
									'mousemove': e => e.stopPropagation()
								}
							}
						)
					case 'iconSelect':
						return h(
							'icon-select',
							{
								props: {
									value,
									field: fieldName,
									options
								},
								on: {
									'input': handleValueInput
								}
							}
						)
					case 'dragDropPond':
						return h(
							'drag-drop-pond',
							{
								attrs: {
									title
								},
								props: {
									value,
									...otherProps
								},
								on: {
									'input': handleValueInput
								}
							}
						)
					case 'eChartsFunctionEdit':
						return h(
							'eCharts-function-edit',
							{
								props: {
									value,
									field: fieldName,
									label: field.label,
									tips: field.tips,
									enable: valueSet[fieldName + 'Enable'] || false,
									options
								},
								on: {
									'input': handleValueInput
								}
							}
						)
					default:
						let children = ''
						options && (children = this.createOptions(h, options))
						return h(
							type,
							{
								props,
								class: 'field-input',
								on: {
									'input': handleValueInput,
									'mousemove': e => e.stopPropagation()
								}
							},
							children
						)
				}
			},
			createFieldItem(h, field, isGroup, itemHide) {
				const label = isGroup ? field.placeholder : field.label || ''
				const type = field.type

				// 字段关联控制
				const {
					remove: controlRemove,
					hide: controlHide,
					disable: controlDisable
				} = this.controls
				if (controlRemove[field.field]) return null

				return h(
					'div',
					{
						class: [
							"field-item",
							{
								'color-picker-item': type === 'ColorPicker',
								'button-item': type === 'Button',
								'array-group-item': type === 'ArrayGroup',
								'boolean-input-item': type === 'Checkbox',
								'background-picker-item': type === 'backgroundPicker',
								'hidden': controlHide[field.field],
								'disabled': controlDisable[field.field]
							}
						],
						style: {
							display: itemHide ? 'none' : ''
						}
					},
					type !== 'plainText' ? [
						type !== 'ArrayGroup' && this.createLabel(h, label),
						this.createFieldElement(h, field)
					] : [
						label && this.createLabel(h, label),
						h(
							'div',
							{
								'class': 'plain-text',
								domProps: {
									innerHTML: field.text.replace(/\n/g, '<br>')
								},
								on: {
									mousedown: e => {
										e.stopPropagation()
									},
									mousemove: e => {
										e.stopPropagation()
									}
								}
							}
						)
					]
				)
			},
			getGroupClassName(fields) {
				return [
					...new Set(fields.map(({type = ''}) => {
						return type.replace(/[A-Z]/g, (match, index) => (index ? '-' : '') + match.toLowerCase())
					}))
				]
			},
			isConfigPanel(source) {
				return source.groupType === 'Tabs' || source.groupType === 'Collapse'
			},
			setDefaultValueMark(defaultValue, field) {
				const defaultValueMark = this.defaultValueMark
				if (defaultValue && !defaultValueMark[field]) {
					defaultValueMark[field] = defaultValue
				}
			},
			process(value) {
				const defaultValueMark = this.defaultValueMark
				const fields = Object.keys(defaultValueMark)
				fields.forEach(field => {
					const defaultValue = defaultValueMark[field]
					const isValueNotSet = value[field] == undefined
					if (isValueNotSet && defaultValue !== undefined) value[field] = defaultValue
				})
				return value
			}
		},
		render: function (h) {
			const fields = this.fields
			const hideItemsMoreThan = this.hideItemsMoreThan
			return h(
				'div',
				{
					'class': 'fields-wrapper'
				},
				fields.map((field, index) => {
					const isItemsHide = this.isItemsHide && hideItemsMoreThan && index + 1 > hideItemsMoreThan
					if (!this.isConfigPanel(field)) {
						if (!Array.isArray(field)) {
							return this.createFieldItem(h, field, false, isItemsHide)
						} else {
							const {
								remove: controlRemove,
								hide: controlHide
							} = this.controls
							const allDisappearing = field.filter(item => !controlRemove[item.field] && !controlHide[item.field]).length === 0
							if (allDisappearing) return null
							return h(
								'div',
								{
									class: 'field-item',
									style: {
										display: isItemsHide ? 'none' : ''
									}
								},
								[
									this.createLabel(h, field[0].label),
									h(
										'div',
										{
											class: ['field-item-group', this.getGroupClassName(field)]
										},
										field.map(item => {
											return this.createFieldItem(h, item, true)
										})
									)
								]
							)
						}
					} else {
						// 配置组嵌套 config-panel
						const group = field.group

						// 字段关联控制
						const {
							remove: controlRemove,
							hide: controlHide,
							disable: controlDisable
						} = this.controls
						if (controlRemove[group]) return null

						const source = sourceToLayout({
							[group]: field
						})
						if (!this.innerValue[group]) this.$set(this.innerValue, group, generateResultSet(source)[group])
						const value = {[group]: this.innerValue[group]}
						return h(
							'config-panel',
							{
								class: [
									'nested tabs-nested nested-config-panel fields-nested',
									{
										'hidden': controlHide[group],
										'disabled': controlDisable[group]
									}
								],
								style: {
									display: isItemsHide ? 'none' : ''
								},
								props: {
									source,
									value,
									actives: this.configPanelActiveStatus[group]
								},
								on: {
									input: data => {
										// console.info('nested config panel data got:', data)
										this.innerValue[group] = data[group]
									},
									'active-change': data => this.configPanelActiveStatus[group] = data
								}
							}
						)
					}
				}).concat([hideItemsMoreThan ? h(
					'div',
					{
						class: [
							'toggle-items-visible',
							{shown: this.isItemsHide}
						],
						on: {
							click: () => {
								this.isItemsHide = !this.isItemsHide
							}
						}
					},
					[
						h(
							'span',
							{
								class: 'arrow-icon'
							},
							`${this.isItemsHide ? '\u02C7' : '\u02C6'}`
						),
						h(
							'span',
							`${this.isItemsHide ? '展开' : '收起'} 更多配置项`
						)
					]
				) : null])
			)
		},
		watch: {
			innerValue: {
				handler: function (value) {
					if (!this.ready) return
					if (isJsonEqual(value, this.value)) return
					this.$emit('input', this.process(value))
				},
				deep: true
			},
			value: {
				handler: function (value) {
					if (!value || isJsonEqual(value, this.innerValue)) return
					this.innerValue = value
				},
				immediate: true,
				deep: true
			},
			hideItemsMoreThan: {
				handler: function (value) {
					this.isItemsHide = !!value
				},
				immediate: true
			}
		},
		mounted() {
			this.$nextTick(() => {
				this.process(this.innerValue)
				this.ready = true
			})
		}
	}
</script>

<style lang="scss" scoped>
	.fields-wrapper {
		.field-item {
			display: flex;
			align-items: center;
			font-size: 14px;
			margin-bottom: 5px;
			min-height: 30px;

			.field-label {
				width: 4em;
				flex-grow: 0;
				flex-shrink: 0;
				margin-right: 7px;
				letter-spacing: 0;
				line-height: 1;
				text-align: right;
			}

			.field-input:not(.color-input),
			.field-item-group {
				width: 100%;

				.field-item {
					margin-right: 5px;
					flex-grow: 1;

					&:last-child {
						margin-right: 0;
					}

					&.color-picker-item {
						flex-grow: 0;

						.color-input {
							width: 100%;
							height: 30px;
							border: none;
						}
					}
				}

				.ivu-checkbox-wrapper {
					line-height: 30px;
				}
			}

			.field-input-number,
			.field-input-text,
			.field-input-textarea,
			.field-select,
			.field-ratio-input {
				width: 100%;
				min-width: 48px;
				height: 30px;
				border: 1px solid #e2e2e2;
				font-size: 12px;
				color: #414141;
				padding: 0 5px;
				outline: none;
				outline-offset: 0;
				transition: border-color 0.2s linear;

				&:hover {
					border-color: #57a3f3;
				}

				&:focus-within,
				&:focus {
					border-color: #57a3f3;
					outline: 2px solid #57a3f345;
				}
			}

			.field-input-number {
				min-width: 36px;

				&::-webkit-inner-spin-button,
				&::-webkit-outer-spin-button {
					-webkit-appearance: none;
					margin: 0;
				}
			}

			.field-select {
				padding: 0 2px;

				&.multiple {
					height: auto;
					min-height: 30px;
					padding: 5px;
				}
				/deep/ .selected {
					background: #2d8cf0;
					color: #fff;
				}
			}

			.field-input-textarea {
				height: auto;
				line-height: 1.5;
				padding: 0;
			}

			.field-input-text,
			.field-input-textarea {
				.action-button {
					position: absolute;
					right: 5px;
					top: 0;
					width: 20px;
					height: 28px;
					margin: 0;
					padding: 0;
					opacity: 0;
					transition: 0.2s;
					font-size: 15px;
					border-radius: 0;
					outline: none !important;
					box-shadow: none !important;
					background-color: white;
				}

				&:hover {
					.action-button {
						opacity: 1;
					}
				}

				input[disabled] {
					background-color: #f5f5f5;
				}
			}

			.field-item-group {
				display: flex;
				height: 47px;

				.field-item {
					margin-bottom: 0;
					flex-direction: column;
					align-items: flex-start;

					.field-label {
						width: 100%;
						padding: 3px 4px 2px;
						margin-right: 0;
						font-size: 12px;
						line-height: 1;
						text-align: left;
						color: #6f6f6f;
						background-color: #dcdee2;
						white-space: nowrap;
						text-shadow: rgba(255, 255, 255, 0.76) 0 1px 0;
						transition: all 0.2s linear;
					}

					&:hover {
						.field-select {
							border-color: #57a3f3;
						}

						.field-label {
							background-color: #57a3f3;
							color: #f2f2f2;
							text-shadow: rgba(255, 255, 255, 0) 0 1px 0;
						}
					}
				}

				&.button,
				&.checkbox {
					height: auto;
					min-height: 30px;

					.field-item {
						.field-label {
							display: none;
						}
					}
				}
			}

			&.boolean-input-item {
				width: 30px;
				flex-grow: 0 !important;
			}

			.array-group-wrapper {
				width: 100%;
				padding: 5px 0;

				&.hide {
					display: none;
				}

				.array-group-title {
					display: flex;
					height: 30px;
					align-items: center;
					margin-bottom: 3px;

					.field-label {
						width: auto;
						padding-top: 2px;

						.ivu-icon {
							font-size: 1.1em;
							vertical-align: top;
							opacity: 0.8;
						}
					}
				}

				.array-group-action {
					flex-grow: 1;
					text-align: right;
				}

				.action-button {
					padding: 0;
					font-size: 15px;
					margin-left: 5px;
				}

				.group-action {
					display: flex;
					flex-direction: column;
					width: auto;

					.action-button {
						flex-grow: 1;

						&:not(:first-child) {
							margin-top: 5px;
						}
					}
				}

				.fields-item {
					background-color: rgba(0, 0, 0, 0.03);
					display: flex;
					padding: 5px;

					&:focus-within,
					&:hover {
						outline: #58beef 1px dashed;
					}

					&:not(:first-child) {
						margin-top: 5px;
					}

					.fields-wrapper {
						flex-grow: 1;

						.field-item:last-child {
							margin-bottom: 0;
						}
					}
				}

				.array-group-body {
					&.collapsed {
						position: relative;
						height: 60px;
						overflow: hidden;

						&:after {
							position: absolute;
							content: '';
							width: 100%;
							height: 60%;
							left: 0;
							bottom: 0;
							background: linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1));
						}
					}

					& > .add-group {
						width: 100%;
						margin: 5px 0 0 0;
					}
				}
			}

			.plain-text {
				font-size: 1em;
				opacity: 0.8;
				line-height: 1.5;
			}

			&.hidden {
				display: none;
			}

			&.disabled {
				opacity: 0.75;
				pointer-events: none !important;
			}
		}

		.toggle-items-visible {
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 2px 0;
			color: rgba(0, 0, 0, 0.3);
			cursor: pointer;

			span {
				padding: 0 15px 0 5px;
				font-size: 12px;
			}

			.arrow-icon {
				font-size: 2em;
				height: 0.5em;
				line-height: 1.1em;
				padding: 0 0 0 15px;
			}

			&:hover {
				color: rgba(0, 0, 0, 0.6);
			}

			&:before,
			&:after {
				content: '';
				width: 15%;
				height: 1px;
				background-color: currentColor;
				opacity: 0.3;
			}
		}

		/deep/ {
			.ivu-input:not(textarea),
			.ivu-select-single .ivu-select-selection {
				height: 30px;
				min-height: 30px;
				max-height: 30px;
			}

			.ivu-color-picker-input {
				padding: 3px 6px;
			}

			.ivu-color-picker .ivu-icon-ios-arrow-down {
				display: none;
			}

			.ivu-color-picker .ivu-select-dropdown {
				left: 28px !important;
			}

			.ivu-color-picker-picker {
				.ivu-input {
					height: 24px;
					min-height: 24px;
					max-height: 24px;
				}
			}

			.ivu-color-picker-color {
				cursor: pointer;
			}

			.ivu-input-number-handler-wrap {
				width: 15px;

				.ivu-input-number-handler-down-inner,
				.ivu-input-number-handler-up-inner {
					right: 2px;
				}
			}

			.ivu-select-selected-value {
				padding-right: 15px;
				padding-left: 4px;
			}

			.ivu-select-arrow {
				right: 1px;
			}

			.ivu-input-number {
				min-height: 30px;

				.ivu-input-number-input {
					padding: 0 5px;
					color: #414141;
				}
			}

			.ivu-slider {
				padding: 0 8px;
				background-color: #f9f9f9;

				.ivu-slider-wrap {
					margin: 13px 0;
					background-color: #d1d4d6;
				}
			}

			.background-picker {
				height: 124px;

				.background-list {
					height: 240px;
				}
			}
		}
	}

	/deep/ .fields-wrapper + .ivu-collapse {
		margin-top: 5px;
	}
</style>
