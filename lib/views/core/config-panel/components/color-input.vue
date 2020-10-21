<script>
	import '@simonwep/pickr/dist/themes/monolith.min.css'
	import Pickr from '@simonwep/pickr'

	export default {
		name: 'color-input',
		props: {
			value: {
				type: String,
				default: ''
			},
			placeholder: {
				type: String,
				default: '选取颜色'
			}
		},
		data() {
			return {
				innerValue: '',
				pickerInstance: null
			}
		},
		render(h) {
			const color = this.innerValue
			return h(
				'div',
				{
					'class': ['color-input', {unset: !color}],
					style: `color: ${color}`,
					attrs: {
						title: this.placeholder
					},
					on: {
						click: e => {
							e.preventDefault()
							this.createColorPicker()
						}
					}
				}
			)
		},
		methods: {
			setColor(color) {
				if (!color) {
					this.innerValue = ''
					return null
				}
				return this.innerValue = color.toHEXA().toString(0)
			},
			createColorPicker() {
				if (!this.pickerInstance) {
					const button = document.createElement('button')
					this.$el.appendChild(button)
					this.pickerInstance = new Pickr({
						el: button,
						default: this.innerValue,
						defaultRepresentation: this.colorType,
						container: 'body',
						theme: 'monolith',
						appClass: 'color-input-pop',
						components: {
							preview: true,
							opacity: true,
							hue: true,
							interaction: {
								hex: true,
								rgba: true,
								hsva: false,
								input: true,
								clear: true,
								save: true
							}
						},
						i18n: {
							'ui:dialog': '颜色选择器',
							'btn:toggle': '切换颜色选择器',
							'btn:swatch': '调色板',
							'btn:last-color': '使用上个颜色',
							'btn:save': '确定',
							'btn:cancel': '取消',
							'btn:clear': '清除'
						}
					}).on('init', picker => {
						picker.show()
					}).on('save', color => {
						this.setColor(color)
						this.pickerInstance.hide()
					}).on('change', color => {
						button.style.color = this.setColor(color)
					})
				}
			}
		},
		computed: {
			colorType() {
				if (!this.value) return 'HEXA'
				const color = this.value.toLowerCase()
				if (color.indexOf('#') === 0) return 'HEXA'
				if (color.indexOf('rgba') === 0) return 'RGBA'
				if (color.indexOf('rgb') === 0) return 'RGB'
				return 'HEXA'
			}
		},
		watch: {
			innerValue: {
				handler: function (value) {
					if (value === this.value) return
					this.$emit('input', value)
				}
			},
			value: {
				handler: function (value) {
					if (value === this.innerValue) return
					this.innerValue = value
				},
				immediate: true
			}
		},
		beforeDestroy() {
			this.pickerInstance && this.pickerInstance.destroyAndRemove()
		}
	}
</script>

<style lang="scss" scoped>
	.color-input {
		position: relative;
		color: initial;
		width: 24px;
		height: 24px;
		box-sizing: border-box;
		outline: none;
		border: none;
		padding: 0;
		overflow: hidden;
		display: flex;
		justify-content: center;
		align-items: center;
		background-image: url('data:image/svg+xml;utf8, <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2 2"><path fill="white" d="M1,0H2V1H1V0ZM0,1H1V2H0V1Z"/><path fill="gray" d="M0,0H1V1H0V0ZM1,1H2V2H1V1Z"/></svg>');
		background-size: 0.5em;
		background-blend-mode: unset;
		border: 2px solid rgb(220, 222, 226);

		&.unset {
			background: none;
			outline: 1px solid #e6e6e6;
			outline-offset: -1px;

			&:before {
				content: '×';
				font-family: monospace;
			}

			&:after {
				background-color: transparent;
			}
		}

		&:after {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			content: '';
			background-color: currentColor;
			pointer-events: none;
		}

		&:focus,
		&:focus-within {
			outline: 3px solid #57a3f345;
		}

		/deep/ {
			.pickr {
				position: absolute;
				top: 0;
				left: 0;
				opacity: 0 !important;
			}
		}
	}
</style>

<style lang="scss">
	.color-input-pop {
		width: 270px !important;
		height: 270px !important;

		.pcr-selection .pcr-color-palette {
			height: 164px !important;
		}
	}

	.pcr-app .pcr-interaction input {
		letter-spacing: 0 !important;
		padding: 0.2em 0.5em 0.45em;
	}
</style>
