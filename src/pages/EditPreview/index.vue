<template lang="pug">
	.preview-container
		.preview-wrapper.pos-f.fn-flex(ref="kanboardWrapper" :class="{ active: ready, 'fit-mode': fitScreen }")
			d-view(ref="previewContainer" :style="`transform: scale(${scaleRatio}); overflow: hidden;`")
			.action-bar.pos-f.fn-flex
				.action.fit-screen.pointer(v-if="actualScaleRatio < 1" @click="fitScreen = !fitScreen") {{ fitScreen ?'原始大小' : '适应窗口' }}
				.action.close.pointer(@click="handleClose") 关闭
</template>
<script lang="ts">
	import { dView } from 'eslinkv-npm'
	import { Vue, Component, Watch } from 'vue-property-decorator'

	@Component({
		components: {
			dView
		}
	})
	export default class preview extends Vue {
		ready = false
		fitScreen = false
		querying = false
		kanboardSize = {
			width: 1920,
			height: 1080
		}

		screenSize = {
			width: 1920,
			height: 1080
		}

		actualScaleRatio = 1

		handleClose () {
			document.exitFullscreen()
			this.$router.go(-1)
		}

		updateKanboardSize () {
			const { width, height } = this.$refs.previewContainer.$el.getBoundingClientRect()
			this.kanboardSize.width = width
			this.kanboardSize.height = height
			const { clientWidth, clientHeight } = document.body
			this.screenSize.width = clientWidth
			this.screenSize.height = clientHeight
			this.actualScaleRatio = Math.min(clientWidth / width, clientHeight / height)
		}

		@Watch('fitScreen')
		onFitScreenChange (value) {
			const wrapper = this.$refs.kanboardWrapper
			if (value) {
				const scrollOffsetX = this.kanboardSize.width - this.screenSize.width
				const scrollOffsetY = this.kanboardSize.height - this.screenSize.height
				wrapper.scrollTo({ top: scrollOffsetY / 2, left: scrollOffsetX / 2 })
			} else {
				wrapper.scrollTo({ top: 0, left: 0 })
			}
		}

		get scaleRatio () {
			if (!this.fitScreen) return 1
			const ratio = this.actualScaleRatio
			return ratio < 1 ? ratio : 1
		}

		mounted () {
			setTimeout(() => {
				this.updateKanboardSize() // 有全屏动作，动作完成前尺寸获取不准确，延时获取
			}, 1000)
		}
	}
</script>
<style lang="scss" scoped>
	.preview-container {
		height: 100%;
	}

	.preview-wrapper {
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: 99999;
		overflow: hidden;
		background: #0f3b69;

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
				flex-grow: 0;
				flex-shrink: 0;
				margin: auto;
				outline: rgba(255, 255, 255, 0.2) 1px dotted;
			}
		}

		&.fit-mode {
			align-items: center;
			justify-content: center;
			overflow: hidden;
		}
	}

	.action-bar {
		right: 15px;
		bottom: 15px;
		z-index: 100000;

		.action {
			padding: 10px 18px;
			color: white;
			background-color: rgba(0, 0, 0, 0.4);
			border: 1px solid currentColor;
			opacity: 0.5;

			&:hover {
				opacity: 0.8;
			}

			&:not(:first-child) {
				margin-left: 10px;
			}
		}
	}
</style>
