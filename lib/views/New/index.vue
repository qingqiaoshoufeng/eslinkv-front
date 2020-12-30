<template>
	<div class="layout-wrapper">
		<div class="main-container">
			<core
				ref="kanboardEditor"
				:template="templateConfig"
				:class="{ screenshot: screenshotCreating }"
				@querying="status => (querying = status)"
				@kanboard-edited="kanboardEdited = true"
			/>
			<load-mask :show="screenshotCreating || querying">{{
				querying ? '请求模板数据…' : '正在生成快照…'
			}}</load-mask>
		</div>
		<d-footer>
			<div slot="right">
				<Button type="default" class="return" @click="exit"
					>返回</Button
				>
				<Button type="default" @click="preview">预览</Button>
				<Button type="primary" @click="addBoard" :loading="loading"
					>保存</Button
				>
				<Button
					type="default"
					@click="exportKanboardData"
					:loading="loading"
					>导出</Button
				>
				<Button
					type="default"
					@click="showImportModal"
					:loading="loading"
					>导入</Button
				>
			</div>
		</d-footer>
		<Modal v-model="importModal">
			<Form>
				<FormItem>
					<label for="originFile" class="style-file-input"
						>全覆盖导入</label
					>
					<input
						class="fn-hide"
						id="originFile"
						type="file"
						accept="application/json"
						@change="handleFile"
					/>
				</FormItem>
			</Form>
		</Modal>
		<transition name="preview-fade">
			<div v-if="previewOpen" class="preview-wrapper">
				<router-view @close="previewBack"></router-view>
			</div>
		</transition>
	</div>
</template>

<script>
import core from '../core/index';
import screenshot from '../mixins/screenshot';
import funcs from '../mixins/funcs';
import loadMask from '../../components/load-mask/index';
import dFooter from '../../components/d-footer/index';
import * as widgetBindManager from '../mixins/widget-bind-manage';
import { Button, Input, Modal, Form, FormItem } from 'view-design';
import downloadFile from '../../vendor/download-file';

export default {
	name: 'New',
	mixins: [screenshot, funcs],
	provide() {
		return { ...widgetBindManager, kanboard: this };
	},
	components: {
		core,
		loadMask,
		Modal,
		Button,
		'd-footer': dFooter,
		'i-input': Input,
		Form,
		FormItem,
	},
	props: {
		data: {
			type: String,
			default: null,
		},
	},
	data() {
		return {
			importModal: false,
			loading: false,
			querying: false,
			templateConfig: {},
			previewOpen: false,
		};
	},
	methods: {
		showImportModal() {
			this.importModal = true;
		},
		handleFile(e) {
			const file = e.target.files[0];
			const reader = new FileReader();
			reader.onload = e => {
				try {
					this.loading = true;
					const result = JSON.parse(e.target.result);
					const { data, createTime, name } = result;
					this.renderByDetail({ name, attribute: data, createTime });
					this.importModal = false;
					this.loading = false;
				} catch (e) {
					this.$Message.error('配置文件识别失败');
				}
			};
			reader.onerror = () => {
				this.$Message.error('配置文件识别失败');
			};
			reader.readAsText(file);
		},
		renderByDetail(res) {
			const { attribute, createTime, name } = res;
			this.kanboardName = name;
			document.title = `编辑 - ${name} - 数据看板`;
			this.createTime = createTime;
			let value;
			if (typeof attribute === 'string') {
				value = JSON.parse(attribute);
			} else {
				value = attribute;
			}
			if (value.scene) {
				window.GoldChart.mutations.initScene(value.scene);
			}
			this.querying = false;
			this.$refs.kanboardEditor.refillConfig(value);
		},
		exportKanboardData() {
			const data = this.$refs.kanboardEditor.prepareKanboardData();
			let fileName = `${data.name}-${new Date() * 1}`;
			this.$Modal.confirm({
				title: '看板导出',
				components: {
					'i-input': Input,
				},
				render: h => {
					return h(
						'div',
						{
							class: 'form-wrapper',
						},
						[
							h('p', '导出功能用于看板数据备份、迁移。'),
							h(
								'div',
								{
									class: 'form-item',
								},
								[
									h(
										'label',
										{
											class: 'form-label text-right',
										},
										'文件名称'
									),
									h('span', `${fileName}.json`),
								]
							),
						]
					);
				},
				onOk: () => {
					const config = { ...data };
					config.data = JSON.parse(config.attribute);
					delete config.attribute;
					downloadFile(config, fileName, 'json');
				},
				onCancel: () => {},
				okText: '确定',
				cancelText: '取消',
			});
		},
		previewBack() {
			this.previewOpen = false;
			this.$router.back();
		},
		// 新建看板
		saveBoard(data) {
			this.loading = true;
			this.$api.board
				.add(data)
				.then(res => {
					this.kanboardEdited = false;
					this.$Message.success('保存成功！');
					this.loading = false;
					this.$router.back();
				})
				.catch(() => {
					this.loading = false;
				});
		},
		async addBoard() {
			const data = this.$refs.kanboardEditor.prepareKanboardData();
			// 数据类型：0:看板, 1:小工具模板, 2:参考线模板
			data.type = 0;
			this.$Modal.confirm({
				title: '快照',
				content: '是否创建看板快照？',
				onOk: async () => {
					const snapshot = await this.capture({
						selector: '#kanban',
					}).catch(e => {
						console.warn('快照创建失败', e);
					});
					if (snapshot) data.snapshot = snapshot;
					this.saveBoard(data);
				},
				onCancel: () => {
					this.saveBoard(data);
				},
				okText: '创建',
				cancelText: '跳过',
			});
		},
		preview() {
			this.previewOpen = true;
			const data = this.$refs.kanboardEditor.prepareKanboardData()
				.attribute;
			this.$router.push({
				name: 'big-data-new-preview',
				params: { data },
			});
		},
	},
	watch: {
		previewOpen(value) {
			if (value) {
				this.$nextTick(() => {
					document
						.querySelector('.preview-wrapper')
						.requestFullscreen();
				});
			} else {
				document.fullscreenElement && document.exitFullscreen();
			}
		},
	},
	mounted() {
		document.title = '新增 - 数据看板';
		/**
		 * @description 用于外部npm 传入直接一个空白画布
		 */
		this.templateConfig = {
			size: undefined,
			templateId: undefined,
		};
	},
};
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
