<template lang="pug">
  .detail-container
    .preview-wrapper.fit-mode(ref="kanboardWrapper" :class="{ mobile: isMobile }"
      :style="{backgroundColor:platform.panelConfig.background.color,backgroundRepeat:platform.panelConfig.background.repeat,backgroundSize:platform.panelConfig.background.size,backgroundPosition:platform.panelConfig.background.position,backgroundImage:`url(${platform.panelConfig.background.url})`,}")
      .mobile-wrap(:style="{height: mobileWrapHeight + 'px'}" v-if="isMobile")
        d-view(@mounted="updateKanboardSize" ref="previewContainer" :style="`transform: scale(${actualScaleRatio}) translate3d(0, 0, 0); overflow: hidden;`")
      d-view(@mounted="updateKanboardSize" ref="previewContainer" v-else :style="`transform: scale(${actualScaleRatio}) translate3d(0, 0, 0); overflow: hidden;`")
      d-detail(:show="false")
</template>
<script lang="ts">
	import { Vue, Component } from 'vue-property-decorator'
	import { dView, dDetail, platform } from 'eslinkv-sdk'

	@Component({
		components: {
			dView, dDetail
		}
	})
	export default class detail extends Vue {
    platform=platform.state
		isMobile = /android|iphone/i.test(navigator.userAgent)
		mobileWrapHeight = 0
		screenSize = {
			width: 1920,
			height: 1080
		}

		actualScaleRatio = 1

		updateKanboardSize (val) {
			const arr = val.split(';')
			const w = arr[0].replace(/width:(.*)px/, '$1')
			const h = arr[1].replace(/height:(.*)px/, '$1')
			const { clientWidth, clientHeight } = document.body
			this.screenSize.width = clientWidth
			this.screenSize.height = clientHeight
			this.actualScaleRatio = this.isMobile ? clientWidth / w : Math.min(clientWidth / w, clientHeight / h)
			this.mobileWrapHeight = h * this.actualScaleRatio
		}
	}
</script>
<style lang="scss">
	.detail-container {
		height: 100%;
	}

	.preview-wrapper {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: 99999;
		display: flex;

		&::-webkit-scrollbar {
			width: 0;
			height: 0;
		}

		#kanban {
			position: relative;
			flex-grow: 0;
			flex-shrink: 0;
		}

		&.fit-mode {
			align-items: center;
			justify-content: center;
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
			width: 100%;
			overflow: hidden;
		}
	}
</style>
