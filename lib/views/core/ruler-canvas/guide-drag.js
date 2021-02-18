import platform from '../../../store/platform.store'

export default {
	props: {
		guideStep: {
			type: Number,
			default: 5
		}
	},
	data() {
		return {
			platform: platform.state,
			isMoved: false,
			horizontalDottedLeft: -999, // 水平虚线位置
			verticalDottedTop: -999, // 垂直虚线位置
			guideDragStartX: 0,
			guideDragStartY: 0
		}
	},
	methods: {
		guideStepFence(value) {
			const step = this.guideStep
			const halfStep = step / 2
			const remaining = value % step
			if (remaining === 0) return Math.ceil(value)
			return Math.ceil(remaining < halfStep ? value - remaining : value + step - remaining)
		},
		setGuidePosition(clientX, clientY) {
			switch (this.platform.ruler.dragFlag) {
				case 'x':
					this.verticalDottedTop = this.guideStepFence(clientY - this.topSpacing) - 2
					break
				case 'y':
					this.horizontalDottedLeft = this.guideStepFence(clientX - this.leftSpacing) - 2
					break
				case 'h':
					this.verticalDottedTop = this.guideStepFence(clientY - this.topSpacing)
					break
				case 'v':
					this.horizontalDottedLeft = this.guideStepFence(clientX - this.leftSpacing)
					break
				default:
					break
			}
		},
		dottedLineMove(clientX, clientY) {
			if (!this.platform.ruler.isDrag) return
			this.isMoved = true
			this.setGuidePosition(clientX, clientY)
		},
		clickDraw(clientX, clientY) {
			console.log('clickDraw')
			if (this.verticalDottedTop !== -999 || this.horizontalDottedLeft !== -999) {
				this.verticalDottedTop = this.horizontalDottedLeft = -999
				this.platform.ruler.isDrag = false
				return
			}
			this.setGuidePosition(clientX, clientY)
		},
		dragDrawEnd(clientX, clientY) {
			this.platform.ruler.isDrag = false
			this.isMoved = false
			const cloneList = this.platform.ruler.guideLines
			const stepLength = this.platform.ruler.stepLength
			const {topSpacing, leftSpacing, size} = this
			// switch (this.platform.ruler.dragFlag) {
			// 	case 'x':
			// 		cloneList.push({
			// 			type: 'h',
			// 			site: this.guideStepFence((clientY - topSpacing - size) * (stepLength / 50) - this.platform.ruler.contentScrollTop)
			// 		})
			// 		break
			// 	case 'y':
			// 		cloneList.push({
			// 			type: 'v',
			// 			site: this.guideStepFence((clientX - leftSpacing - size) * (stepLength / 50) - this.platform.ruler.contentScrollLeft)
			// 		})
			// 		break
			// 	case 'h':
			// 		this.dragCalc(cloneList, clientY - this.guideDragStartY)
			// 		break
			// 	case 'v':
			// 		this.dragCalc(cloneList, clientX - this.guideDragStartX)
			// 		break
			// 	default:
			// 		break
			// }
			// this.platform.ruler.guideLines = cloneList
			this.verticalDottedTop = this.horizontalDottedLeft = -999
			this.guideDragStartX = this.guideDragStartY = 0
			if (this.platform.ruler.dragGuideId) {
				platform.actions.changeGuideLine(clientX, clientY)
				this.platform.ruler.dragGuideId = ''
			} else {
				platform.actions.guideAdd(clientX, clientY)
			}
		},
		getSite () {
			
		},
		dragCalc(list, dragDistance) {
			const guideIndex = list.findIndex(guide => guide.id === this.platform.ruler.dragGuideId)
			if (guideIndex === -1) return
			const {site, type} = list[guideIndex]
			const newSite = site + dragDistance
			// 不在画布内则移除该参考线
			if (newSite >= 0 && (type === 'v' && newSite <= this.contentWidth || type === 'h' && newSite <= this.contentHeight)) {
				list[guideIndex].site = this.guideStepFence(newSite)
			} else {
				list.splice(guideIndex, 1)
			}
		},
		// 水平标尺处按下鼠标
		horizontalDragRuler(e) {
			if (e.which !== 1) return
			this.platform.ruler.isDrag = true
			this.platform.ruler.dragFlag = 'x'
		},
		// 垂直标尺处按下鼠标
		verticalDragRuler(e) {
			if (e.which !== 1) return
			this.platform.ruler.isDrag = true
			this.platform.ruler.dragFlag = 'y'
		},
		insertGuide(type) {
			const cloneList = this.platform.ruler.guideLines
			const sites = window.prompt(`请输入${type === 'h' ? '水平' : '垂直'}参考线坐标，插入多个参考线使用半角逗号分隔`, '')
			if (!sites) return
			sites.split(',').forEach(site => {
				cloneList.push({
					type,
					site: Number(site)
				})
			})
			this.platform.ruler.guideLines = cloneList
		},
		clearGuides() {
			if (window.confirm('您确定要清空参考线？')) {
				this.platform.ruler.guideLines = []
			}
		}
	}
}
