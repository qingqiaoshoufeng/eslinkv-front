<template>
	<div>
		<Modal
			title="数据加工函数配置"
			v-model="showModal"
			:height="height"
			:isDirectCloseModal="false"
			@on-cancel="exit"
			@on-visible-change="setVisibility"
			@keyup.native.46.stop
		>
			<div class="modal-body">
				<div class="collect-template">
					<i class="far fa-star" @click="collectHandle"></i>
					<i class="far fa-file-alt" @click="getTemplate"></i>
				</div>
				<js-editor ref="editor" v-if="isVisible" v-model="source"/>
			</div>
			<div slot="footer" class="footer">
				<Button type="default" @click.native="exit">取消</Button>
				<Button type="primary" @click.native="ok">确定</Button>
			</div>
		</Modal>
		<Modal title="模板收藏" v-model="showCollectModal" height="80%" width="400" :isDirectCloseModal="false"
			   @on-cancel="closeHandle">
			<div>
				<div class="form-wrapper">
					<div class="form-item">
						<label class="form-label text-right">模板名称</label>
						<Input type="text" v-model="templateName"/>
					</div>
					<div class="form-item">
						<label class="form-label text-right">备注</label>
						<Input type="textarea" v-model="templateRemark" :rows="3"/>
					</div>
				</div>
			</div>
			<div slot="footer" class="footer">
				<Button type="default" @click="closeHandle">取消</Button>
				<Button type="primary" @click="collectSave">确定</Button>
			</div>
		</Modal>
		<Modal title="模板列表" v-model="showTemplateModal" height="80%" width="560" :isDirectCloseModal="false"
			   @on-cancel="showTemplateModal = false">
			<div class="template-body">
				<Tabs active-key="key1" size="small" @on-click="tabChange">
					<Tab-pane label="收藏模板" key="key1">
						<Table stripe :columns="columns" :data="collectTemplate" :show-header="false"></Table>
					</Tab-pane>
					<Tab-pane label="内置模板" key="key2">
						<Table stripe :columns="columns" :data="builtInTemplate" :show-header="false"></Table>
					</Tab-pane>
				</Tabs>
			</div>
			<div slot="footer" class="footer">
				<Button type="default" @click="showTemplateModal = false">取消</Button>
				<Button type="primary" @click="showTemplateModal = false">确定</Button>
			</div>
		</Modal>
	</div>
</template>
<script>
	import builtInFuncTemplate from './function/index'
	import jsEditor from '../../../components/js-editor.vue'
	import {Modal, Button, Tabs, TabPane, Table, Input} from 'view-design'

	export default {
		name: 'js-editor-modal',
		components: {
			jsEditor, Modal, Button, Tabs, TabPane, Table, Input
		},
		props: {
			// 弹窗状态
			showModal: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				height: '100%',
				headComment: '// 接口返回的数据用 data 表示，例：\n// console.info(data);\n// for (item in data) {\n//   console.info(item)\n// }\n\n// 注意：加工语句必须返回计算结果，否则小工具将不会接收到任何数据。\n\n',
				source: '',
				isVisible: false,
				showTemplateModal: false,
				showCollectModal: false,
				activeKey: 0,
				templateName: '',
				templateRemark: '',
				collectTemplate: [],
				builtInTemplate: builtInFuncTemplate,
				self: this,
				columns: [
					{
						title: '名称',
						key: 'name',
						width: 150
					},
					{
						title: '备注',
						key: 'remark'
					},
					{
						title: '操作',
						key: 'action',
						align: 'right',
						width: 110,
						render: (h, params) => {
							return [
								h('i-button', {
									attrs: {
										size: 'small'
									},
									on: {
										click: () => {
											this.useTemplate(params.row)
										}
									}
								}, '使用'),
								this.activeKey === 0 ? h('i-button', {
									attrs: {
										size: 'small',
										type: 'error'
									},
									style: {
										marginLeft: '10px'
									},
									on: {
										click: () => {
											this.deleteTemplate(params.row.id)
										}
									}
								}, '删除') : ''
							]
						}
					}
				]
			}
		},
		methods: {
			setQueryCond(source) {
				this.source = this.headComment + source
			},
			exit() {
				this.$emit('close');
			},
			ok() {
				const source = this.source.replace(this.headComment, '')
				this.$emit('update', source)
			},
			setVisibility(status) {
				status ? requestAnimationFrame(() => {
					this.isVisible = true
					setTimeout(() => {
						// console.info(this.$refs)
						this.$refs.editor.$forceUpdate()
					})
				}) : setTimeout(() => {
					this.isVisible = false
				}, 400)
			},
			closeHandle() {
				this.showCollectModal = false
				this.templateName = ''
				this.templateRemark = ''
			},
			collectHandle() {
				this.showCollectModal = true
			},
			collectSave() {
				const collectFuncTemplateStr = localStorage.getItem('collectFuncTemplate')
				let collectFuncTemplate = collectFuncTemplateStr ? JSON.parse(collectFuncTemplateStr) : []
				collectFuncTemplate.unshift({
					id: new Date().getTime(),
					name: this.templateName,
					remark: this.templateRemark,
					source: this.source
				})
				localStorage.setItem('collectFuncTemplate', JSON.stringify(collectFuncTemplate))
				this.$Message.success('收藏成功!')
				this.closeHandle()
			},
			getTemplate() {
				this.showTemplateModal = true
				const collectTemplateStr = localStorage.getItem('collectFuncTemplate')
				this.collectTemplate = collectTemplateStr ? JSON.parse(collectTemplateStr) : []
			},
			tabChange(i) {
				this.activeKey = i
			},
			useTemplate(data) {
				this.source = data.source
				this.showTemplateModal = false
			},
			deleteTemplate(id) {
				if (!id) return
				this.collectTemplate = this.collectTemplate.filter(item => item.id !== id)
				localStorage.setItem('collectFuncTemplate', JSON.stringify(this.collectTemplate))
				this.$Message.success('删除成功!')
			}
		}
	};
</script>
<style lang="scss" scoped>
	/deep/ {
		.ivu-modal-body {
			padding: 0 15px 0 0 !important;

			.CodeMirror-gutter-wrapper {
				left: -30px !important;
			}
		}

		.ivu-tabs-bar {
			margin-bottom: 5px;
		}

		.ivu-table-wrapper {
			border-top: none;
			border-left: none;

			.ivu-table:before {
				height: 0;
			}

			.ivu-table:after {
				width: 0;
			}

			tbody {
				tr:last-of-type {
					td {
						border-bottom: none;
					}
				}
			}
		}
	}

	.collect-template {
		position: absolute;
		font-size: 18px;
		right: 18px;
		z-index: 99;
		margin-top: 5px;

		i:last-of-type {
			margin-left: 8px;
		}

		&:hover {
			cursor: pointer;
		}
	}

	.form-wrapper {
		padding: 10px 0 10px 10px;

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

	.template-body {
		padding: 0 0 30px 10px;
	}
</style>
