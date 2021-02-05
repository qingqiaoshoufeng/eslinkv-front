<template>
	<div class="layout-wrapper">
		<div class="main-container">
			<core v-if="ready" ref="kanboardEditor" :class="{ screenshot: screenshotCreating }"
				  @kanboard-edited="kanboardEdited = true"/>
			<load-mask :show="screenshotCreating || querying">{{ querying ? '请求看板数据…' : '正在生成快照…' }}</load-mask>
		</div>
		<d-footer :kanboardEdited="kanboardEdited" @previewOpen="previewOpen = true">
<!--			<span slot="left" class="d-footer-title">{{ kanboardName }}</span>-->
<!--			<div slot="right">-->
<!--				<Button type="default" @click="exit">返回</Button>-->
<!--				<Button type="default" @click="preview">预览</Button>-->
<!--				<Button type="primary" @click="editBoard" :loading="loading">保存</Button>-->
<!--				<Button type="default" @click="publishBoard" :loading="loading">发布</Button>-->
<!--				<Button type="default" @click="exportKanboardData" :loading="loading">导出</Button>-->
<!--				<Button type="default" @click="showImportModal" :loading="loading">导入</Button>-->
<!--			</div>-->
		</d-footer>
		<transition name="preview-fade">
			<div v-if="previewOpen" class="preview-wrapper">
				<router-view @close="previewBack"></router-view>
			</div>
		</transition>
	</div>
</template>
<script>
	import core from '../core/index'
	import screenshot from '../mixins/screenshot'
	import funcs from '../mixins/funcs'
	import loadMask from '../../components/load-mask'
	import * as widgetBindManager from '../mixins/widget-bind-manage'
	import dFooter from '../../components/d-footer'
	import {Button, Input, Modal, Form, FormItem} from 'view-design'
	import '@/components-market'
	import platform from '../../store/platform.store'
	import scene from '../../store/scene.store'

	export default {
		name: 'Edit',
		mixins: [screenshot, funcs],
		provide() {
			return {...widgetBindManager, kanboard: this}
		},
		components: {
			Button,
			core,
			Modal,
			loadMask,
			'd-footer': dFooter,
			'i-input': Input, Form, FormItem
		},
		props: {
			data: {
				type: String,
				default: null
			}
		},
		data() {
			return {
				ready: false,
				querying: true,
				previewOpen: false,
				platform: platform.state,
			};
		},
		methods: {
			previewBack() {
				this.previewOpen = false
				this.$router.back()
			},
			renderByDetail(res) {
				const {attribute, name} = res
				document.title = `编辑 - ${name} - 数据看板`
				let value
				if (typeof attribute === 'string') {
					value = JSON.parse(attribute)
				} else {
					value = attribute
				}
				if (value.scene) {
					scene.actions.initScene(value)
				}
				this.querying = false
				platform.actions.initPlatform(value)
				this.$refs.kanboardEditor.refillConfig()
			},
			init() {
				const {params: {id}} = this.$route
				this.querying = true
				this.ready = true
				platform.actions.setId(id)
				this.$api.board.detail({dataBoardId: id}).then(res => {
					this.renderByDetail(res)
				})
			},
		},
		watch: {
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
			this.init()
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
