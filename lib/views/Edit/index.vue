<template>
	<div class="layout-wrapper">
		<div class="main-container">
			<core v-if="ready" ref="kanboardEditor" :class="{ screenshot: screenshotCreating }"
				  @kanboard-edited="kanboardEdited = true"/>
			<load-mask :show="screenshotCreating || querying">{{ querying ? '请求看板数据…' : '正在生成快照…' }}</load-mask>
			<load-mask :show="saving">正在保存数据…</load-mask>
		</div>
		<d-footer>
			<span slot="left" class="d-footer-title">{{ kanboardName }}</span>
			<div slot="right">
				<Button type="default" @click="exit">返回</Button>
				<Button type="default" @click="preview">预览</Button>
				<Button type="primary" @click="editBoard" :loading="loading">保存</Button>
				<Button type="default" @click="publishBoard" :loading="loading">发布</Button>
				<Button type="default" @click="saveAs" :loading="loading">另存为</Button>
				<Button type="default" @click="exportKanboardData" :loading="loading">导出</Button>
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
	import funcs from '../mixins/funcs'
	import loadMask from '../../components/load-mask'
	import downloadFile from '../../vendor/download-file'
	import * as widgetBindManager from '../mixins/widget-bind-manage'
	import Template from '../core/kanboard-editor/mixins/template'
	import dFooter from '../../components/d-footer'
	import {handleContentMoveEnd} from 'view-design'

	export default {
		mixins: [screenshot, funcs],
		provide() {
			return {...widgetBindManager, kanboard: this,}
		},
		components: {
			Template,
			core,
			loadMask,
			'd-footer': dFooter
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
				loading: false,
				querying: true,
				saving: false,
				createTime: null,
				kanboardName: '',
				previewOpen: false
			};
		},
		methods: {
			submitKanboard(data) {
				this.saving = true
				data.createTime = this.createTime
				// 数据类型：0:看板, 1:小工具模板, 2:参考线模板
				data.type = 0
				this.$api.editBoard({
					...data,
					id: this.kanboardId
				}).then((res) => {
					if (res.responseCode == 100000) {
						this.kanboardEdited = false
						this.$Message.success('修改成功')
						this.loading = false
						this.showAddBoard = false
						this.getKanboardList()
					}
				}).catch(() => {
					this.loading = false;
				}).finally(() => {
					this.saving = false
				})
			},
			// 修改看板
			editBoard() {
				const data = this.$refs.kanboardEditor.prepareKanboardData()
				this.$Modal.confirm({
					title: '快照',
					content: '是否更新看板快照？',
					onOk: async () => {
						const snapshot = await this.capture({selector: '#kanban'}).catch(e => {
							console.warn('快照创建失败', e)
						})
						if (snapshot) data.snapshot = snapshot
						this.submitKanboard(data)
					},
					onCancel: () => {
						this.submitKanboard(data)
					},
					okText: '更新',
					cancelText: '跳过'
				});
			},
			async submitSaveAs(data, createScreenshot) {
				this.saving = true
				if (createScreenshot) {
					const snapshot = await this.capture({selector: '#kanban', type: 1}).catch(e => {
						this.$Message.warning('快照创建失败！')
						console.warn('快照创建失败', e)
					})
					if (snapshot) data.snapshot = snapshot
				}
				const attribute = JSON.parse(data.attribute)
				attribute.kanboard.info.name = data.name
				attribute.kanboard.info.remark = data.remark
				data.attribute = JSON.stringify(attribute)
				this.loading = true
				this.$api.addBoard(data).then(res => {
					if (res.responseCode == 100000) {
						this.$Message.success('另存成功！')
						this.loading = false
					}
				}).catch(() => {
					this.loading = false
				}).finally(() => {
					this.saving = false
				})
			},
			/**
			 * @description 另存为模板
			 *
			 * todo render---> html
			 *
			 */
			saveAs() {
				const data = this.$refs.kanboardEditor.prepareKanboardData()
				let createScreenshot = 1
				this.$Modal.confirm({
					title: '看板另存为',
					render: (h) => {
						return h(
							'div',
							{
								class: 'form-wrapper'
							},
							[
								h(
									'div',
									{
										class: 'form-item'
									},
									[
										h(
											'label',
											{
												class: 'form-label text-right'
											},
											'另存类型'
										),
										h(
											'RadioGroup',
											{
												props: {
													value: 1,
													autofocus: true
												},
												on: {
													input: (val) => {
														data.type = val
													}
												}
											},
											[
												h('Radio', {props: {label: 0}}, [h('span', '新看板')]),
												h('Radio', {props: {label: 1}}, [h('span', '小工具模板')]),
												h('Radio', {props: {label: 2}}, [h('span', '布局模板')])
											]
										)
									]
								),
								h(
									'div',
									{
										class: 'form-item'
									},
									[
										h(
											'label',
											{
												class: 'form-label text-right'
											},
											'另存名称'
										),
										h(
											'Input',
											{
												props: {
													value: data.name
												},
												on: {
													input: (val) => {
														data.name = val
													}
												}
											}
										)
									]
								), h(
								'div',
								{
									class: 'form-item'
								},
								[
									h(
										'label',
										{
											class: 'form-label text-right'
										},
										'创建快照'
									),
									h(
										'RadioGroup',
										{
											props: {
												value: createScreenshot
											},
											on: {
												input: (val) => {
													createScreenshot = val
												}
											}
										},
										[
											h('Radio', {props: {label: 1}}, [h('span', '是')]),
											h('Radio', {props: {label: 0}}, [h('span', '否')])
										]
									)
								]
							),
								h(
									'div',
									{
										class: 'form-item'
									},
									[
										h(
											'label',
											{
												class: 'form-label text-right'
											},
											'备注'
										),
										h(
											'Input',
											{
												props: {
													type: 'textarea',
													rows: 3,
													value: data.remark
												},
												on: {
													input: (val) => {
														data.remark = val
													}
												}
											}
										)
									]
								)
							]
						)
					},
					onOk: () => {
						this.submitSaveAs(data, createScreenshot)
					},
					onCancel: () => {
					},
					okText: '确定',
					cancelText: '取消'
				})
			},
			queryKanboard() {
				this.querying = true
				const dataBoardId = this.kanboardId
				this.$api.getKanboardConfig({dataBoardId}).then(res => {
					if (res.responseCode == 100000) {
						const {attribute, createTime, name} = res.result
						this.kanboardName = name
						document.title = `编辑 - ${name} - 数据看板`
						this.createTime = createTime
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
			/**
			 * @description 导出看板配置、数据到文件
			 *
			 * todo render---> html
			 *
			 */
			exportKanboardData() {
				const data = this.$refs.kanboardEditor.prepareKanboardData()
				let fileName = data.name
				this.$Modal.confirm({
					title: '看板导出',
					render: (h) => {
						return h(
							'div',
							{
								class: 'form-wrapper'
							},
							[
								h(
									'p',
									'导出功能用于看板数据备份、迁移。'
								),
								h(
									'div',
									{
										class: 'form-item'
									},
									[
										h(
											'label',
											{
												class: 'form-label text-right'
											},
											'文件名称'
										),
										h(
											'Input',
											{
												attrs: {
													placeholder: '自定义导出文件名'
												},
												props: {
													value: fileName
												},
												on: {
													input: (val) => {
														fileName = val
													}
												}
											},
											[
												h(
													'span',
													{
														slot: 'append'
													},
													'.json'
												)
											]
										)
									]
								)
							]
						)
					},
					onOk: () => {
						const config = {...data}
						config.data = JSON.parse(config.attribute)
						delete config.attribute
						downloadFile(config, fileName, 'json')
					},
					onCancel: () => {
					},
					okText: '确定',
					cancelText: '取消'
				})
			},
			//
			preview() {
				this.previewOpen = true
				const data = this.$refs.kanboardEditor.prepareKanboardData().attribute
				this.$router.push({name: 'big-data-edit-preview', params: {data}})
			}
		},
		watch: {
			kanboardId: {
				handler: function (value, oldValue) {
					if (!value || value == oldValue) return
					this.ready = false
					setTimeout(() => {
						this.ready = true
					}, 10)
					this.queryKanboard()
				},
				immediate: true
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
			document.title = '编辑 - 数据看板'
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
					overflow: auto;
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

	.form-wrapper {
		padding: 10px;

		.form-item {
			display: flex;
			align-items: center;
			margin-top: 10px;
		}

		.form-label {
			white-space: nowrap;
			padding-right: 1em;
			min-width: 5em;
		}
	}
</style>
