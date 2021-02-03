<template>
	<div ref="kanboardWrapper"
		 :class="{ active: ready, 'fit-mode': fitScreen, mobile: isMobile }"
		 class="preview-wrapper"
	>
		<div :style="{height: mobileWrapHeight + 'px'}" class="mobile-wrap" v-if="isMobile">
			<kanban-preview @mounted="updateKanboardSize"
							ref="previewContainer"
							:style="`transform: scale(${scaleRatio}) translate3d(0, 0, 0); overflow: hidden;`"
			/>
		</div>
		<kanban-preview @mounted="updateKanboardSize"
						ref="previewContainer"
						v-else
						:style="`transform: scale(${scaleRatio}) translate3d(0, 0, 0); overflow: hidden;`"
		/>
	</div>
</template>

<script>
	import kanbanPreview from '../preview-base.vue'
	import {getQueryString} from '../../utils'
	import platform from '../../store/platform.store'
	import scene from '../../store/scene.store'

	export default {
		components: {
			kanbanPreview,
		},
		provide() {
			return {kanboard: this}
		},
		data() {
			return {
				isMobile: /android|iphone/i.test(navigator.userAgent),
				ready: false,
				fitScreen: true,
				mobileWrapHeight: 0,
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
				this.actualScaleRatio = this.isMobile ? clientWidth / w : Math.min(clientWidth / w, clientHeight / h)
				this.mobileWrapHeight = h * this.actualScaleRatio
			},
			queryKanboard() {
				const {params: {id}} = this.$route
				if (id) {
					this.$api.board.detail({dataBoardId:id}).then(res => {
						const value = JSON.parse(res.attribute)
						platform.actions.initPlatform(value)
						this.refill(value)
						scene.actions.initScene(value)
					})
					if (getQueryString('scene')) {
						window.GoldChart.mutations.setSceneIndex(getQueryString('scene'))
					}
				}
			},
			refill(value) {
				this.$refs.previewContainer.refillConfig().then(() => {
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
