<template lang="pug">
	.detail-container
		.preview-wrapper(ref="kanboardWrapper" :class="{ active: ready, 'fit-mode': fitScreen, mobile: isMobile }")
			.mobile-wrap(:style="{height: mobileWrapHeight + 'px'}" v-if="isMobile")
				d-view(@mounted="updateKanboardSize" ref="previewContainer" :style="`transform: scale(${scaleRatio}) translate3d(0, 0, 0); overflow: hidden;`")
			d-view(@mounted="updateKanboardSize" ref="previewContainer" v-else :style="`transform: scale(${scaleRatio}) translate3d(0, 0, 0); overflow: hidden;`")
			d-footer(:show="false")
</template>
<script lang="ts">
	import {Vue, Component} from 'vue-property-decorator'
	import dView from '../../../lib/components/d-view/index.vue'
	import dFooter from '../../../lib/components/d-footer/index.vue'

	@Component({
		components: {
			dView, dFooter
		}
	})
	export default class detail extends Vue {
		isMobile = /android|iphone/i.test(navigator.userAgent)
		ready = false
		fitScreen = true
		mobileWrapHeight = 0
		screenSize = {
			width: 1920,
			height: 1080
		}
		actualScaleRatio = 1

		updateKanboardSize(val) {
			const arr = val.split(';')
			const w = arr[0].replace(/width:(.*)px/, '$1')
			const h = arr[1].replace(/height:(.*)px/, '$1')
			const {clientWidth, clientHeight} = document.body
			this.screenSize.width = clientWidth
			this.screenSize.height = clientHeight
			this.actualScaleRatio = this.isMobile ? clientWidth / w : Math.min(clientWidth / w, clientHeight / h)
			this.mobileWrapHeight = h * this.actualScaleRatio
		}

		get scaleRatio() {
			if (!this.fitScreen) return 1
			const ratio = this.actualScaleRatio
			return ratio < 1 ? ratio : 1
		}
	}
</script>
<style lang="scss">
	.detail-container {
		height: 100%;
	}
	.preview-wrapper {
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		overflow: hidden;
		background: #0f3b69;
		z-index: 99999;
		display: flex;

		&.active {
			overflow: auto;
		}

		&::-webkit-scrollbar {
			width: 0;
			height: 0;
		}

		/deep/ {
			#kanban {
				position: relative;
				outline: rgba(255, 255, 255, 0.2) 1px dotted;
				flex-shrink: 0;
				flex-grow: 0;
			}
		}

		&.fit-mode {
			justify-content: center;
			align-items: center;
			overflow: hidden;
		}

		&.mobile {
			align-items: unset;
			overflow: auto;

			#kanban {
				transform-origin: 0 0;
			}
		}

		.mobile-wrap {
			position: relative;
			overflow: hidden;
		}
	}
</style>
