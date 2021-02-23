<template lang="pug">
	.preview-wrapper.pos-f.fn-flex(ref="kanboardWrapper" :class="{ active: ready, 'fit-mode': fitScreen }")
		d-view(ref="previewContainer" :style="`transform: scale(${scaleRatio}); overflow: hidden;`")
		.action-bar.pos-f.fn-flex
			.action.fit-screen.pointer(v-if="actualScaleRatio < 1" @click="fitScreen = !fitScreen") {{ fitScreen ?'原始大小' : '适应窗口' }}
			.action.close.pointer(@click="handleClose") 关闭
</template>
<script>
	import dView from '../../components/d-view/index.vue'

	export default {
		name: 'Preview',
		components: {
			dView
		},
		provide() {
			return {kanboard: this}
		},
		data() {
			return {
				ready: false,
				fitScreen: false,
				querying: false,
				kanboardSize: {
					width: 1920,
					height: 1080
				},
				screenSize: {
					width: 1920,
					height: 1080
				},
				actualScaleRatio: 1
			}
		},
		methods: {
			handleClose() {
				document.exitFullscreen()
				this.$router.go(-1)
			},
			updateKanboardSize() {
				const {width, height} = this.$refs.previewContainer.$el.getBoundingClientRect()
				this.kanboardSize.width = width
				this.kanboardSize.height = height
				const {clientWidth, clientHeight} = document.body
				this.screenSize.width = clientWidth
				this.screenSize.height = clientHeight
				this.actualScaleRatio = Math.min(clientWidth / width, clientHeight / height)
			}
		},
		watch: {
			fitScreen(value) {
				const wrapper = this.$refs.kanboardWrapper
				if (value) {
					const scrollOffsetX = this.kanboardSize.width - this.screenSize.width
					const scrollOffsetY = this.kanboardSize.height - this.screenSize.height
					wrapper.scrollTo({top: scrollOffsetY / 2, left: scrollOffsetX / 2})
				} else {
					wrapper.scrollTo({top: 0, left: 0})
				}
			}
		},
		computed: {
			scaleRatio() {
				if (!this.fitScreen) return 1
				const ratio = this.actualScaleRatio
				return ratio < 1 ? ratio : 1
			}
		},
		mounted() {
			// 有全屏动作，动作完成前尺寸获取不准确，延时获取
			setTimeout(() => {
				this.updateKanboardSize()
			}, 1000)
		}
	}
</script>

<style lang="scss" scoped>
	.preview-wrapper {
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		overflow: hidden;
		background: #0f3b69;
		z-index: 99999;

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
				margin: auto;
			}
		}

		&.fit-mode {
			justify-content: center;
			align-items: center;
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
			border: 1px solid currentColor;
			opacity: 0.5;
			background-color: rgba(0, 0, 0, 0.4);

			&:hover {
				opacity: 0.8;
			}

			&:not(:first-child) {
				margin-left: 10px;
			}
		}
	}
</style>
