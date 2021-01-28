import sourceToLayout from '../../widgets/parts/lib/source-to-layout'
import {
	getInput, getSelect, getInputNumber, getSelectWithInput,
	getUnit, getBackground, getColor, getBooleanInput, getRadio, getText
} from '../../widgets/parts/lib/config-tools'
import styleParser from '../../widgets/parts/lib/style-parser'

const canvasConfigSource = Object.freeze({
	info: {
		groupLabel: '基本信息',
		groupType: 'Collapse',
		groupActive: true,
		fields: {
			name: getInput('name', '看板名称', {id: 'kanboardName'}),
			id: getInput('id', '看板ID', {disabled: true}),
			remark: getInput('remark', '看板说明', {innerType: 'textarea'})
			// todo 增加看板类型配置：PC看板、超大看板、移动看板、主页看板、页面看板
		}
	},
	size: {
		groupLabel: '尺寸',
		groupType: 'Collapse',
		groupActive: true,
		fields: {
			'isMobileKanboard': getBooleanInput('isMobileKanboard', '移动看板', {
				control: [
					{
						target: 'preset',
						type: 'hide',
						condition: {
							compare: '==',
							value: true
						}
					},
					{
						target: ['deviceType', 'layoutMode', 'notice'],
						type: 'hide',
						condition: {
							compare: '==',
							value: false
						}
					}
				]
			}),
			deviceType: getRadio('deviceType', '设备类型', ['手机:mobile', '平板:pad'], {defaultValue: 'mobile'}),
			layoutMode: getRadio('layoutMode', '布局模式', ['充满页面:full-size', '100%宽度:full-width', '100%高度:full-height'], {defaultValue: '0'}),
			notice: getText('notice', '布局说明', '在移动看板模式下，看板尺寸设置仅作为看板编辑布局参考，实际以设备尺寸情况为准。'),
			'width.height.unit': [
				getInputNumber('width', '看板尺寸', {placeholder: '宽度', min: 100, max: 50000}),
				getInputNumber('height', '看板尺寸', {placeholder: '高度', min: 100, max: 50000}),
				getUnit('unit', '看板尺寸', ['px', '%', 'vw/vh'])
			],
			presetSize: getSelect('preset', '常见尺寸', ['1920×1080', '1600×900', '1366×768', '1080×1920', '2560×1600'], {placeholder: '请选择'})
		}
	},
	background: {
		groupLabel: '背景设置',
		groupType: 'Collapse',
		groupActive: true,
		fields: {
			color: getColor('color', '背景色'),
			url: getBackground('url', '背景图片', {
				params: {type: 0},
				mountToBody: true,
				listClassName: 'canvas-background-select'
			}),
			url2: getInput('url', '自定义背景图片', {placeholder: '输入地址'}),
			size: getSelectWithInput('size', '尺寸', ['cover', 'contain', 'auto']),
			position: getSelectWithInput('position', '位置', ['left', 'top', 'right', 'bottom', 'center']),
			repeat: getSelect('repeat', '重复', ['repeat', 'no-repeat', 'repeat-x', 'repeat-y', 'space', 'round'])
		}
	}
})
import platform from '../../../../store/platform.store'

export default {
	data() {
		return {
			canvasConfigSource,
			isCanvasConfigShow: false,
			platform: platform.state,
			rulerCanvasUpdateTimer: null
		}
	},
	methods: {
		toggleCanvasConfig(e) {
			e && e.preventDefault()
			this.hideSubPanels()
			this.isCanvasConfigShow = !this.isCanvasConfigShow
			this.deactivateWidget(this.activatedWidgetId)
			if (this.isCanvasConfigShow) {
				if (!this.$refs.canvasConfigButton) return
				const {width, left, top} = this.$refs.canvasConfigButton.getBoundingClientRect()
				this.$refs.canvasConfigPanel.style.left = left + width / 2 + 'px'
				this.$refs.canvasConfigPanel.style.top = top - 460 + 'px'
			} else {
				document.querySelector('.canvas-background-select').classList.remove('active')
			}
		},
		updateRulerCanvas() {
			if (this.rulerCanvasUpdateTimer) clearTimeout(this.rulerCanvasUpdateTimer)
			this.rulerCanvasUpdateTimer = requestAnimationFrame(() => {
				const {width, height} = this.platform.panelConfig.size
				width && height && this.$refs.rulerCanvas.init()
				this.rulerCanvasUpdateTimer = null
				this.platform.panelConfig.size.preset = `${width}×${height}`
			})
		},
		updateCanvasOffset() {
			if (!this.$el) return
			let left = 0
			let top = 0
			const {width, height} = this.$el.getBoundingClientRect()
			const {width: w, height: h} = this.platform.panelConfig.size
			if (width > w) left = Math.ceil((width - w) / 2)
			if (height > h) top = Math.ceil((height - h) / 2)
			this.setContentPosition(left, top)
		},
		setContentPosition(left = 0, top = 0) {
			const rulerCanvas = this.$refs.rulerCanvas
			rulerCanvas.disabledTransition = true
			rulerCanvas.contentScrollLeft = left - 18
			rulerCanvas.contentScrollTop = top - 18
			setTimeout(() => {
				rulerCanvas.disabledTransition = false
			})
		},
		confirmKanboardName() {
			if (['big-data-new', 'big-data-template-add'].includes(this.routeName)) {
				setTimeout(() => {
					this.toggleCanvasConfig()
					setTimeout(() => {
						const kanboardNameInput = document.querySelector('#kanboardName')
						kanboardNameInput.focus()
						kanboardNameInput.select()
					}, 300)
				}, 500)
			}
		}
	},
	computed: {
		routeName() {
			return this.$route.name
		},
		isTemplateEditor() {
			if (this.routeName) {
				return this.routeName.indexOf('big-data-template-') === 0
			}
			return false
		},
		layoutSource() {
			this.canvasConfigSource.info.fields.name = getInput('name', !this.isTemplateEditor ? '看板名称' : '模板名称', {id: 'kanboardName'})
			return sourceToLayout(this.canvasConfigSource)
		},
		canvasStyle() {
			return styleParser(this.platform.panelConfig)
		},
		canvasSize() {
			const {width, height} = this.platform.panelConfig.size
			return {width, height}
		}
	},
	watch: {
		isDragIn(value) {
			if (value) this.isCanvasConfigShow = false
		},
		'platform.panelConfig.size.width'() {
			this.updateRulerCanvas()
		},
		'platform.panelConfig.size.height'() {
			this.updateRulerCanvas()
		},
		'platform.panelConfig.size.preset'(value) {
			if (value === undefined) return
			if (value) {
				const [width, height] = value.split('×')
				if (width !== 'null') this.platform.panelConfig.size.width = +width
				if (height !== 'null') this.platform.panelConfig.size.height = +height
			} else {
				this.platform.panelConfig.size.width = 1920
				this.platform.panelConfig.size.height = 1080
			}
		}
	},
	mounted() {
		this.updateCanvasOffset()
		this.platform.panelConfig.info.name = !this.isTemplateEditor ? '看板1' : '模板1'
		setTimeout(() => {
			if (this.refilling || this.widgetsImporting) return
			this.confirmKanboardName()
		})
	}
}
