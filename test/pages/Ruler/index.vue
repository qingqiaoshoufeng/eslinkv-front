<template lang="pug">
	.ruler-wrapper-test.pos-r
		button(@click="translateTestH(9)") 移动
		canvas#ruler-h.pos-a(width="1319" height="18")
</template>
<script lang="ts">
	import {Component, Vue} from 'vue-property-decorator'

	let i = 0
	const bgImg = new Image()
	bgImg.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAASCAMAAAAuTX21AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAlQTFRFMzMzAAAA////BqjYlAAAACNJREFUeNpiYCAdMDKRCka1jGoBA2JZZGshiaCXFpIBQIABAAplBkCmQpujAAAAAElFTkSuQmCC'

	@Component
	export default class DRuler extends Vue {
		loadImg = false
		zoom = 2

		translateTestH(num) {
			const animation = requestAnimationFrame(() => this.translateTestH(num))
			if (i === num) {
				cancelAnimationFrame(animation)
				i = 0
			}
			this.handleTranslateH()
			i++
		}

		handleTranslateH() {
			const rulerH = document.getElementById('ruler-h')
			const context = rulerH.getContext('2d')
			this.clearCanvasH()
			context.translate(1, 0)
			this.init()
		}

		clearCanvasH() {
			const rulerH = document.getElementById('ruler-h')
			const context = rulerH.getContext('2d')
			const t = context.getTransform()
			context.clearRect(-t.e, 0, rulerH.width - t.e, rulerH.height)
		}

		initDraw() {
			const rulerH = document.getElementById('ruler-h')
			const context = rulerH.getContext('2d')
			const t = context.getTransform()
			context.font = '10px sans-serif'
			let x = 0
			while (x < rulerH.width - t.e) {
				context.drawImage(bgImg, x, 0)
				context.fillText(x / this.zoom, x + 2, 10)
				x = x + bgImg.width
			}

			if (t.e > 0) {
				let xe = 0
				while (xe < t.e) {
					xe = xe + bgImg.width
					context.drawImage(bgImg, -xe, 0)
					context.fillText(-xe / this.zoom, -xe + 2, 10)
				}
			}
		}

		init() {
			if (this.loadImg) {
				this.initDraw()
			} else {
				bgImg.onload = () => {
					this.loadImg = true
					this.initDraw()
				}
			}
		}

		mounted() {
			this.init()
		}
	}
</script>
<style lang="scss" scoped>
	.ruler-wrapper-test {
		width: calc(100% - 18px);
		height: 18px;

		canvas {
			width: 100%;
			height: 100%;
			left: 0;
			top: 50px;
		}
	}
</style>
