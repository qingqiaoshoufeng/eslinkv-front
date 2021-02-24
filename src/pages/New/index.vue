<template lang="pug">
	.home-container
		.layout-wrapper
			.main-container
				.d-editor-box.pos-r.fn-flex
					d-widget-list(ref="widgets" :class="{ 'd-editor-fullscreen': platform.fullscreen }")
					d-editor(ref="kanboardEditor")
				load-mask(:show="querying") {{querying ? '请求模板数据…' : '正在生成快照…'}}
			d-footer
</template>
<script>
	import loadMask from '../../../lib/components/load-mask/index'
	import dFooter from '../../../lib/components/d-footer/index'
	import dWidgetList from '../../../lib/components/d-widget-list/index'
	import dEditor from '../../../lib/components/d-editor/index'
	import platform from '../../../lib/store/platform.store'

	export default {
		name: 'New',
		provide() {
			return {kanboardEditor: this.$refs.kanboardEditor}
		},
		components: {loadMask, dFooter, dWidgetList, dEditor},
		data() {
			return {
				ready: false,
				querying: false,
				platform: platform.state,
			};
		},
		mounted() {
			document.title = '新增 - 数据看板'
		},
	};
</script>

<style lang="scss" scoped>
	.d-editor-box {
		width: 100%;
		height: 100%;

		.d-editor-fullscreen {
			position: fixed;
		}

		/deep/ {

			.widgets-panel.fixed + .center {
				width: calc(100% - 428px) !important;
				margin-left: 428px !important;
			}
		}
	}

	.home-container {
		height: 100%;
		overflow: hidden;
	}

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

