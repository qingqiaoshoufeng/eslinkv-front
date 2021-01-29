<template lang="pug">
	.preview-wrapper(ref="kanboardWrapper" :class="{ active: ready, 'fit-mode': fitScreen }")
		kanban-preview(@mounted="updateKanboardSize" ref="previewContainer" :style="`transform: scale(${scaleRatio},${scale}) translate3d(0, 0, 0); overflow: hidden;`")
		Form
			FormItem
				label.style-file-input(for="originFile") 第一次请选择本地文件
				input.fn-hide#originFile(type="file" accept="application/json" @change="handleFile")
</template>

<script>
	import kanbanPreview from './preview-base.vue'
	import {getQueryString, setDefault} from '../../utils'
	import {Input, Modal, Form, FormItem} from 'view-design'
	import platform from '../../store/platform.store'

	export default {
		components: {
			kanbanPreview, Input, Modal, Form, FormItem
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
				scale: 1,
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
			handleFile(e) {
				const file = e.target.files[0]
				const reader = new FileReader()
				reader.onload = (e) => {
					try {
						const result = JSON.parse(e.target.result)
						const {data} = result
						data.widgets.forEach(v => {
							setDefault(v.value)
						})
						platform.actions.initPlatform(data)
						window.GoldChart.mutations.initScene(data.scene)
						window.GoldChart.mutations.listToObj(data)
						this.refill(data)
						localStorage.setItem('dvdp_local', JSON.stringify(data))
					} catch (e) {
						this.$Message.error('配置文件识别失败')
					}
				}
				reader.onerror = () => {
					this.$Message.error('配置文件识别失败')
				}
				reader.readAsText(file)
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
			if (getQueryString('scale'))
				if (!isNaN(getQueryString('scale')))
					this.scale = Number(getQueryString('scale'))
			let data = localStorage.getItem('dvdp_local')
			if (data) {
				data = JSON.parse(data)
				platform.actions.initPlatform(data)
				window.GoldChart.mutations.initScene(data.scene)
				window.GoldChart.mutations.listToObj(data)
				this.refill(data)
			}
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
