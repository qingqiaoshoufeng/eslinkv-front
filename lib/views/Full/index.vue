<template>
	<div ref="kanboardWrapper" :class="{ active: ready, 'fit-mode': fitScreen }" class="preview-wrapper">
		<d-view @mounted="updateKanboardSize" ref="previewContainer"
						:style="`transform: scale(${scaleRatio},${scale}) translate3d(0, 0, 0); overflow: hidden;`"/>
		<d-footer :show="false"/>
	</div>
</template>

<script>
	import dView from '../../components/d-view/index.vue'
	import dFooter from '../../components/d-footer'

	export default {
		name: 'Full',
		components: {
			dView, dFooter
		},
		provide() {
			return {kanboard: this}
		},
		data() {
			return {
				ready: false,
				fitScreen: true,
				screenSize: {
					width: 1920,
					height: 1080
				},
				scale: 1,
				actualScaleRatio: 1
			}
		},
		methods: {
			updateKanboardSize(val) {
				const arr = val.split(';')
				const w = arr[0].replace(/width:(.*)px/, '$1')
				const h = arr[1].replace(/height:(.*)px/, '$1')
				const {clientWidth, clientHeight} = document.body
				this.screenSize.width = clientWidth
				this.screenSize.height = clientHeight
				this.actualScaleRatio = Math.min(clientWidth / w, clientHeight / h)
			},
		},
		computed: {
			scaleRatio() {
				if (!this.fitScreen) return 1
				const ratio = this.actualScaleRatio
				return ratio < 1 ? ratio : 1
			}
		},
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
			}
		}

		&.fit-mode {
			justify-content: center;
			align-items: center;
			overflow: hidden;
		}
	}
</style>
