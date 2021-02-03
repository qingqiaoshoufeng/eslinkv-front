<template>
	<div ref="rulerWrapper"
		 :style="`position: ${position}`"
		 class="vue-ruler-wrapper"
		 onselectstart="return false;"
		 @dblclick="resetZoomAndMove">
		<ruler
			:locked="lockGuides"
			:show="platform.rulerVisible"
			:xScale="xScale"
			:yScale="yScale"
			:hrWidth="rulerRange * 1.5"
			:vrHeight="rulerRange * 1.5"
			:scrollLeft="hRulerScrollLeft"
			:scrollTop="vRulerScrollTop"
			:contentMove="contentMove"
			:create-h-guide="horizontalDragRuler"
			:create-v-guide="verticalDragRuler"
			:dragTransition="dragTransition"
			:clientX="clientX - leftSpacing"
			:clientY="clientY - topSpacing"
			:zoom="zoom"
		></ruler>
		<guides
			v-show="platform.rulerVisible"
			:vGuideTop="verticalDottedTop"
			:hGuideLeft="horizontalDottedLeft"
			:contentMove="contentMove"
			:contentWidth="contentWidth"
			:contentHeight="contentHeight"
			:guides="lineList"
			:scrollLeft="contentScrollLeft"
			:scrollTop="contentScrollTop"
			:dragTransition="dragTransition"
			:zoom="zoom"
			:locked="lockGuides"
			@guide-drag="handleDragLine"
			@guide-remove="handleGuideRemove"
		></guides>
		<div :class="{ drag: contentMove }"
			 class="vue-ruler-content"
			 @mousedown="handleContentMoveStart($event)"
			 @mousemove.prevent>
			<div ref="content" :style="contentStyle" class="content-body">
				<slot/>
			</div>
		</div>
		<div v-show="platform.rulerVisible" class="zoom-tip">ZOOM: {{ zoom }}</div>
		<div v-show="platform.rulerVisible" :class="{ active: lockGuides }" class="guides-locked">已锁定</div>
		<div v-show="isDrag" class="vue-ruler-content-mask"></div>
	</div>
</template>
<script>
	import ruler from './ruler'
	import guides from './guides'
	import eventHandlers from './event'
	import contentDrag from './content-drag'
	import guideDrag from './guide-drag'
	import zoom from './zoom'
	import platform from '../../../store/platform.store'

	export default {
		name: 'VRuler',
		mixins: [eventHandlers, contentDrag, guideDrag, zoom],
		components: {
			ruler,
			guides
		},
		props: {
			// 规定元素的定位类型
			position: {
				type: String,
				default: 'relative',
				validator: function (val) {
					return ['absolute', 'fixed', 'relative', 'static', 'inherit'].indexOf(val) !== -1
				}
			},
			// 热键开关
			isHotKey: {
				type: Boolean, default: true
			},
			// 刻度修正，根据 contentLayout 参数确定 0 刻度位置
			isScaleRevise: {
				type: Boolean, default: false
			},
			// 预置参考线
			value: {
				type: Array,
				default: () => {
					return [] // { type: 'h', site: 50 }, { type: 'v', site: 180 }
				}
			},
			// 内容部分布局
			contentLayout: {
				type: Object,
				default: () => {
					return {top: 0, left: 0}
				}
			},
			parent: {
				type: Boolean,
				default: false
			},
			stepLength: {
				type: Number,
				default: 50,
				validator: (val) => val % 10 === 0
			},
			rulerRange: {
				type: Number,
				default: 10000
			}
		},
		data() {
			return {
				platform: platform.state,
				size: 18,
				windowWidth: 0, // 窗口宽度
				windowHeight: 0, // 窗口高度
				xScale: [], // 水平刻度
				yScale: [], // 垂直刻度
				topSpacing: 0, // 标尺与窗口上间距
				leftSpacing: 0, //  标尺与窗口左间距
				rulerWidth: 0, // 垂直标尺的宽度
				rulerHeight: 0, // 水平标尺的高度
				keyCode: {
					r: 82
				}, // 快捷键参数
				hrWidth: 0, // 水平标尺宽度
				vrHeight: 0 // 垂直标尺高度
			}
		},
		computed: {
			lineList() {
				let hCount = 0;
				let vCount = 0;
				const {left, top} = this.contentLayout
				return this.platform.guideLines.map((item) => {
					const isH = item.type === 'h'
					const site = item.site
					const value = site - (isH ? top : left)
					return {
						id: `${item.type}_${isH ? hCount++ : vCount++}`,
						type: item.type,
						title: value + 'px',
						site: site,
						value,
						[isH ? 'top' : 'left']: site / (this.stepLength / 50) + this.size
					}
				}).filter(item => item.site > -18)
			}
		},
		methods: {
			handleDragLine({type, id}, e) {
				if (e.which !== 1) return
				this.guideDragStartX = e.clientX
				this.guideDragStartY = e.clientY
				return type === 'h' ? this.dragHorizontalLine(id) : this.dragVerticalLine(id)
			},
			setSpacing() {
				this.topSpacing = Math.ceil(this.$refs.horizontalRuler.getBoundingClientRect().y)
				this.leftSpacing = Math.ceil(this.$refs.verticalRuler.getBoundingClientRect().x)
			},
			resetZoomAndMove() {
				this.resetContentZoom()
				requestAnimationFrame(this.resetContentMove)
			}
		}
	}
</script>

<style lang="scss">
	.vue-ruler {
		&-wrapper {
			width: 100%;
			height: 100%;
			left: 0;
			top: 0;
			z-index: 1;
			overflow: hidden;
			user-select: none;
			background-color: rgba(0, 0, 0, 0.1);
		}

		&-content {
			position: absolute;
			left: 0;
			top: 0;
			z-index: 1;
			width: 100%;
			height: 100%;
			overflow: hidden;

			&.drag {
				cursor: move;
			}

			.content-body {
				position: absolute;
				left: 0;
				top: 0;
				border: 18px transparent solid;
				transition: transform 0.4s;
				overflow: visible;
				background-image: url(../icons/transparent-bg.png);
				background-clip: content-box;
				background-size: 32px;
			}
		}

		&-content-mask {
			position: absolute;
			width: 100%;
			height: 100%;
			background: transparent;
			z-index: 4;
		}
	}

	.guides-locked,
	.zoom-tip {
		position: absolute;
		bottom: 15px;
		left: 33px;
		color: white;
		font-size: 12px;
		background-color: rgba(0, 0, 0, 0.5);
		padding: 4px 8px;
		opacity: 0.5;
		z-index: 10;
		pointer-events: none;
	}

	.guides-locked {
		left: 120px;
		opacity: 0;
		transition: opacity 0.2s;

		&.active {
			opacity: 0.5;
		}
	}
</style>
