<template>
	<div class="layout-wrapper">
		<div class="main-container">
			<transition name="fade">
				<kanboard-template v-if="step === 0" @create-kanboard="createKanboard"/>
			</transition>
			<transition name="fade">
				<core
					v-if="step === 1"
					ref="kanboardEditor"
					:template="templateConfig"
					:class="{ screenshot: screenshotCreating }"
					@querying="(status) => (querying = status)"
					@kanboard-edited="kanboardEdited = true"
				/>
			</transition>
			<transition name="fade">
				<load-mask v-if="screenshotCreating || querying">{{ querying ? '请求模板数据…' : '正在生成快照…' }}</load-mask>
			</transition>
		</div>
		<d-footer>
			<div slot="right">
				<Button type="default" class="return" @click="exit">返回</Button>
				<template v-if="step === 1">
					<Button type="default" @click="changeTemplate">更换模板</Button>
					<Button type="default" @click="preview">预览</Button>
					<Button type="primary" @click="addBoard" :loading="loading">保存</Button>
				</template>
			</div>
		</d-footer>
		<transition name="preview-fade">
			<div v-if="previewOpen" class="preview-wrapper">
				<router-view @close="previewBack"></router-view>
			</div>
		</transition>
	</div>
</template>

<script>
	import kanboardTemplate from '../kanboard-template/index'
	import core from '../core/index'
	import screenshot from '../mixins/screenshot'
	import funcs from '../mixins/funcs'
	import loadMask from '../../components/load-mask/index'
	import dFooter from '../../components/d-footer/index'
	import * as widgetBindManager from '../mixins/widget-bind-manage'

	export default {
		name: 'New',
		mixins: [screenshot, funcs],
		provide() {
			return {...widgetBindManager, kanboard: this, diyComponent: this.diyComponent}
		},
		components: {
			kanboardTemplate,
			core,
			loadMask,
			'd-footer': dFooter
		},
		props: {
			diyStep: {},
			diyComponent: {},
			data: {
				type: String,
				default: null
			}
		},
		data() {
			return {
				loading: false,
				querying: false,
				// 当前所处的步骤 0：选择模板 1：看板设计
				step: 1,
				templateConfig: {},
				previewOpen: false
			}
		},
		methods: {
			previewBack() {
				this.previewOpen = false
				this.$router.back()
			},
			// 新建看板
			saveBoard(data) {
				this.loading = true
				this.$api.addBoard(data).then(res => {
					if (res.responseCode == 100000) {
						this.kanboardEdited = false
						this.$Message.success('保存成功！')
						this.loading = false
						this.$router.back()
					}
				}).catch(() => {
					this.loading = false
				});
			},
			async addBoard() {
				const data = this.$refs.kanboardEditor.prepareKanboardData()
				// 数据类型：0:看板, 1:小工具模板, 2:参考线模板
				data.type = 0
				this.$Modal.confirm({
					title: '快照',
					content: '是否创建看板快照？',
					onOk: async () => {
						const snapshot = await this.capture({selector: '#kanban'}).catch(e => {
							console.warn('快照创建失败', e)
						})
						if (snapshot) data.snapshot = snapshot
						this.saveBoard(data)
					},
					onCancel: () => {
						this.saveBoard(data)
					},
					okText: '创建',
					cancelText: '跳过'
				})
			},
			createKanboard({size, templateId}) {
				this.templateConfig = {size, templateId}
				this.step = 1
			},
			preview() {
				this.previewOpen = true
				const data = this.$refs.kanboardEditor.prepareKanboardData().attribute
				this.$router.push({name: 'big-data-new-preview', params: {data}})
			},
			changeTemplate() {
				if (this.isModified()) {
					this.$Modal.confirm({
						title: '提示',
						content: '看板已编辑，回到上一步将丢失未保存的数据，确认返回吗？',
						onOk: () => {
							this.step = 0
							this.kanboardEdited = false
						}
					});
					return
				}
				this.step = 0
			}
		},
		watch: {
			diyStep(value) {
				this.step = value
			},
			previewOpen(value) {
				if (value) {
					this.$nextTick(() => {
						document.querySelector('.preview-wrapper').requestFullscreen()
					})
				} else {
					document.fullscreenElement && document.exitFullscreen()
				}
			}
		},
		mounted() {
			document.title = '新增 - 数据看板'
			/**
			 * @description 用于外部npm 传入直接一个空白画布
			 */
			if (this.diyStep) {
				this.step = this.diyStep
				if (this.step === 1) {
					this.templateConfig = {
						size: undefined, templateId: undefined
					}
				}
			}

		}
	}
</script>

<style lang="scss" scoped>
	.layout-wrapper {
		width: 100%;
		height: 100%;
		padding: 0 !important;
		display: flex;
		flex-direction: column;
	}

	.main-container {
		width: 100%;
		height: calc(100% - 50px);
		background-color: #ffffff;
	}

	/deep/ {
		.ivu-steps {
			position: absolute;
			top: 8px;
			left: 140px;
			width: calc(100% - 200px);

			.ivu-steps-title {
				line-height: 26px;
			}
		}

		.ivu-modal-body {
			padding: 0 !important;
		}
	}

	.line {
		width: 100%;
		border-bottom: 1px dashed #414141;
		margin: 13px 0;
		opacity: 0.4;
	}

	#kanban:-webkit-full-screen {
		width: 100%;
		height: 100%;
	}

	.doc-link /deep/ i {
		font-size: 1.4em;
	}

	.preview-fade-enter-active,
	.preview-fade-leave-active {
		transition: 0.4s;
	}

	.preview-fade-enter,
	.preview-fade-leave-to {
		opacity: 0;
		transform: scale(0.8);
	}

	.preview-wrapper {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 999;
	}
</style>
<style lang="scss">
	.kanboard-editer-box {
		.left {
			.components {
				.ivu-collapse-header {
					background-color: #fff;
				}

				.ivu-collapse-content {
					background-color: #f8f8f8;
					// max-height: 300px;
					overflow: auto;
					// background-color: #13161a;
				}
			}
		}

		.right {
			.ivu-tabs-tab {
				padding: 6px 10px !important;
			}

			.ivu-collapse {
				border: 0;
				margin-bottom: 16px;
			}

			.ivu-collapse-header {
				display: flex;
				justify-content: space-between;
				align-items: center;

				.ivu-icon {
					margin: 0;
				}
			}

			.ivu-collapse-content {
				background-color: #f8f8f8;
				padding: 0;
			}

			.ivu-form-item-content {
				margin-left: 75px;
			}
		}
	}

	.ivu-modal,
	.ivu-modal .ivu-modal-body {
		max-height: unset !important;
	}
</style>
