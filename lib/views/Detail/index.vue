<template>
	<div ref="kanboardWrapper" :class="{ active: ready, 'fit-mode': fitScreen }" class="preview-wrapper">
		<kanban-preview ref="previewContainer" :style="`transform: scale(${scaleRatio}); overflow: hidden;`"/>
		<div class="action-bar">
			<div v-if="actualScaleRatio < 1" class="action fit-screen" @click="fitScreen = !fitScreen">{{ fitScreen ?
				'原始大小' : '适应窗口' }}
			</div>
		</div>
	</div>
</template>

<script>
	import kanbanPreview from './preview-base.vue'
	import loadMask from '../../components/load-mask'

	export default {
		components: {
			kanbanPreview,
			loadMask
		},
		provide() {
			return {kanboard: this}
		},
		props: {
			kanboardId: {
				type: [String, Number],
				default: undefined
			},
			data: {
				type: String,
				default: null
			}
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
			queryKanboard() {
				this.querying = true
				const {params: {id}} = this.$route
				const dataBoardId = id
				this.$api.board.detail({dataBoardId}).then(res => {
					const value = JSON.parse(res.attribute)
					this.refill(value)
				})
				this.querying = false
			},
			refill(value) {
				this.$refs.previewContainer.refillConfig(value).then(() => {
					this.ready = true
				})
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
			data: {
				handler: function (data) {
					if (!data) return
					this.$nextTick(() => {
						this.refill(JSON.parse(data))
					})
				},
				immediate: true
			},
			fitScreen(value) {
				const wrapper = this.kanboardWrapper || (this.kanboardWrapper = this.$refs.kanboardWrapper)
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
			this.updateKanboardSize()
			this.queryKanboard()
		}
	}
</script>

<style lang="scss" scoped>
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
		position: fixed;
		right: 15px;
		bottom: 15px;
		display: flex;
		z-index: 100000;

		.action {
			padding: 10px 18px;
			color: white;
			border: 1px solid currentColor;
			opacity: 0.5;
			background-color: rgba(0, 0, 0, 0.4);
			cursor: pointer;

			&:hover {
				opacity: 0.8;
			}

			&:not(:first-child) {
				margin-left: 10px;
			}
		}
	}
</style>
