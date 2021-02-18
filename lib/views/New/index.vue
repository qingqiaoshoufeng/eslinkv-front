<template lang="pug">
	.layout-wrapper
		.main-container
			core(ref="kanboardEditor" @querying="status => (querying = status)" @kanboard-edited="kanboardEdited = true")
			load-mask(:show="querying") {{querying ? '请求模板数据…' : '正在生成快照…'}}
</template>
<script>
	import core from '../core/index'
	import funcs from '../mixins/funcs'
	import loadMask from '../../components/load-mask/index'
	import dFooter from '../../components/d-footer/index'
	import * as widgetBindManager from '../mixins/widget-bind-manage'

	export default {
		name: 'New',
		mixins: [funcs],
		provide() {
			return {...widgetBindManager, kanboard: this}
		},
		components: {
			core,
			loadMask,
			'd-footer': dFooter,
		},
		data() {
			return {
				ready: false,
				querying: false,
			};
		},
		mounted() {
			document.title = '新增 - 数据看板'
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
