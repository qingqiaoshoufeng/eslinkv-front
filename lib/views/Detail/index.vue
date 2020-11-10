<template>
	<div ref="kanboardWrapper" :class="{ active: ready, 'fit-mode': fitScreen }" class="preview-wrapper">
		<kanban-preview @mounted="updateKanboardSize" ref="previewContainer"
						:style="`transform: scale(${scaleRatio}); overflow: hidden;`"/>
		<div class="action-bar">
			<div v-if="actualScaleRatio < 1" class="action fit-screen" @click="fitScreen = !fitScreen">
				{{ fitScreen ? '原始大小' : '适应窗口' }}
			</div>
		</div>
	</div>
</template>

<script>
	import kanbanPreview from './preview-base.vue'
	import {mutations} from '../../store'

	export default {
		components: {
			kanbanPreview,
		},
		provide() {
			return {kanboard: this}
		},
		data() {
			return {
				ready: false,
				fitScreen: true,
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
			updateKanboardSize(val) {
				const arr = val.split(';')
				const w = arr[0].replace(/width:(.*)px/, '$1')
				const h = arr[1].replace(/height:(.*)px/, '$1')
				this.kanboardSize.width = w
				this.kanboardSize.height = h
				const {clientWidth, clientHeight} = document.body
				this.screenSize.width = clientWidth
				this.screenSize.height = clientHeight
				this.actualScaleRatio = Math.min(clientWidth / w, clientHeight / h)
			},
			queryKanboard() {
				const {params: {id}} = this.$route
				const dataBoardId = id
				this.$api.board.detail({dataBoardId}).then(res => {
					const value = JSON.parse(res.attribute)
					this.refill(value)
					mutations.initScene(value.scene)
					mutations.listToObj(value)
				})
			},
			refill(value) {
				this.$refs.previewContainer.refillConfig(value).then(() => {
					this.ready = true
				})
			},
		},
		computed: {
			scaleRatio() {
				if (!this.fitScreen) return 1
				const ratio = this.actualScaleRatio
				return ratio < 1 ? ratio : 1
			}
		},
		mounted() {
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
				/*margin: auto;*/
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
