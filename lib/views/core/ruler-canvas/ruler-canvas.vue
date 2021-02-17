<template>
	<div ref="rulerWrapper"
		 class="vue-ruler-wrapper pos-r"
		 @dblclick="resetZoomAndMove">
		<ruler
			:locked="platform.ruler.lockGuides"
			:show="platform.ruler.rulerVisible"
			:xScale="xScale"
			:yScale="yScale"
			:hrWidth="rulerRange * 1.5"
			:vrHeight="rulerRange * 1.5"
			:scrollLeft="hRulerScrollLeft"
			:scrollTop="vRulerScrollTop"
			:contentMove="contentMove"
			:create-h-guide="horizontalDragRuler"
			:create-v-guide="verticalDragRuler"
			:clientX="clientX - leftSpacing"
			:clientY="clientY - topSpacing"
			:zoom="zoom"
		></ruler>
		<guides
			:vGuideTop="verticalDottedTop"
			:hGuideLeft="horizontalDottedLeft"
			:contentMove="contentMove"
			:contentWidth="contentWidth"
			:contentHeight="contentHeight"
			:zoom="zoom"
		></guides>
		<div :class="{ drag: contentMove }"
			 class="vue-ruler-content"
			 @mousedown="handleContentMoveStart($event)"
			 @mousemove.prevent>
			<div :id="platform.ruler.dragId" ref="content" class="content-body">
				<slot/>
			</div>
		</div>
		<div v-show="platform.ruler.rulerVisible" class="zoom-tip">ZOOM: {{ zoom }}</div>
		<div v-show="platform.ruler.rulerVisible" :class="{ active: platform.ruler.lockGuides }" class="guides-locked">
			已锁定
		</div>
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
			isScaleRevise: {
				type: Boolean, default: false
			},
			parent: {
				type: Boolean,
				default: false
			},
		},
		data() {
			return {
				rulerRange: 10000,
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
		methods: {
			setSpacing() {
				this.topSpacing = Math.ceil(this.$refs.horizontalRuler.getBoundingClientRect().y)
				this.leftSpacing = Math.ceil(this.$refs.verticalRuler.getBoundingClientRect().x)
			},
			resetZoomAndMove() {
				this.resetZoom()
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
				transition: all .3s;
				overflow: visible;
				background-image: url(../../../../src/assets/editor/transparent-bg.png);
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
