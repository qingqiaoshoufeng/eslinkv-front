<template>
	<div class="layout-wrapper">
		<div class="main-container">
			<core ref="kanboardEditor" :class="{ screenshot: screenshotCreating }"
				  @kanboard-edited="kanboardEdited = true"/>
			<load-mask :show="screenshotCreating || querying">{{ querying ? '请求模板数据…' : '正在生成快照…' }}</load-mask>
		</div>
		<d-footer>
			<span slot="left" class="d-footer-title">{{ templateName }}</span>
			<div slot="right">
				<Button type="default" @click="exit">返回</Button>
				<Button type="default" @click="clickPre">预览</Button>
				<Button type="primary" @click="editTemplate" :loading="loading">保存</Button>
			</div>
		</d-footer>
		<transition name="preview-fade">
			<div v-if="previewOpen" class="preview-wrapper">
				<router-view
					@close="
            previewOpen = false
            $router.back()
          "
				></router-view>
			</div>
		</transition>
	</div>
</template>

<script>
	import core from '../core/index'
	import screenshot from '../mixins/screenshot'
	import loadMask from '../../components/load-mask'
	import * as widgetBindManager from '../mixins/widget-bind-manage'
	import dFooter from '../../components/d-footer'

	export default {
		mixins: [screenshot],
		provide() {
			return {...widgetBindManager, kanboard: this}
		},
		components: {
			core,
			loadMask,
			'd-footer': dFooter
		},
		props: {
			templateId: {
				type: [String, Number],
				default: undefined,
				required: true
			},
			data: {
				type: String,
				default: null
			}
		},
		data() {
			return {
				kanboardEdited: false,
				loading: false,
				querying: true,
				createTime: null,
				templateType: null,
				templateName: '',
				previewOpen: false
			}
		},
		methods: {
			submitTemplate(data) {
				data.createTime = this.createTime
				// 数据类型：0:看板, 1:小工具模板, 2:参考线模板
				data.type = this.templateType || 1
				this.$api.editBoard({
					...data,
					id: this.templateId
				}).then((res) => {
					if (res.responseCode == 100000) {
						this.kanboardEdited = false
						this.$Message.success('修改成功')
						this.loading = false
						this.exit()
					}
				}).catch(() => {
					this.loading = false;
				})
			},
			// 修改看板
			editTemplate() {
				const data = this.$refs.kanboardEditor.prepareKanboardData()
				this.$Modal.confirm({
					title: '快照',
					content: '是否更新看板快照？',
					onOk: async () => {
						const templateType = this.templateType - 0
						if (templateType !== 2) {
							const snapshot = await this.capture({selector: '#kanban', type: templateType}).catch(e => {
								console.warn('快照创建失败', e)
							})
							if (snapshot) data.snapshot = snapshot
						} else {
							this.$refs.kanboardEditor.setContentPosition()
							const snapshot = await this.capture({
								selector: '#kanban',
								type: templateType,
								returnSource: true
							}).catch(e => {
								console.warn('快照创建失败', e)
							})
							if (snapshot) {
								const guidesWrapper = this.$refs.kanboardEditor.$el.querySelector('.guides-wrapper')
								guidesWrapper.style.backgroundImage = `url(${snapshot})`
								guidesWrapper.style.backgroundPosition = `center`
								guidesWrapper.style.backgroundRepeat = `no-repeat`
								const guidesSnapshot = await this.capture({
									selector: '.guides-wrapper',
									type: templateType
								})
								guidesWrapper.style.backgroundImage = null
								if (guidesSnapshot) data.snapshot = guidesSnapshot
							}
						}
						data.type = templateType
						this.submitTemplate(data)
					},
					onCancel: () => {
						this.submitTemplate(data)
					},
					okText: '更新',
					cancelText: '跳过'
				});
			},
			queryTemplate() {
				this.querying = true
				const dataBoardId = this.templateId
				this.$api.getKanboardConfig({dataBoardId}).then(res => {
					if (res.responseCode == 100000) {
						const {attribute, createTime, type, name} = res.result
						this.createTime = createTime
						document.title = `编辑 - ${name} - 模板 - 数据看板`
						this.templateType = type
						const value = JSON.parse(attribute)
						this.$refs.kanboardEditor.refillConfig(value).then(() => {
						})
					}
				}).catch(error => {
					console.info(error)
				}).finally(() => {
					this.querying = false
				})
			},
			isModified() {
				return this.kanboardEdited
			},
			exit() {
				if (this.isModified()) {
					this.$Modal.confirm({
						title: '提示',
						content: '看板已编辑，关闭窗口将丢失未保存的数据，确认关闭吗？',
						onOk: () => {
							this.kanboardEdited = false
							this.$router.back()
						}
					})
					return
				}
				this.$router.back()
			},
			// 预览按钮
			clickPre() {
				this.previewOpen = true
				const data = this.$refs.kanboardEditor.prepareKanboardData().attribute
				this.$router.push({name: 'big-data-template-edit-preview', params: {data}})
			}
		},
		watch: {
			templateId: {
				handler: function (value, oldValue) {
					if (!value || value == oldValue) return
					this.queryTemplate()
				},
				immediate: true
			}
		},
		mounted() {
			document.title = '编辑 - 模板 - 数据看板'
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

	/deep/ {
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

	.screenshot-mask {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background-color: rgba(0, 0, 0, 0.6);
		color: #e2e2e2;
		font-size: 1.5em;
		display: flex;
		flex-direction: column;
		line-height: 3;
		justify-content: center;
		align-items: center;
		z-index: 999999;
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
