<template lang="pug">
  .home-container
    .layout-wrapper
      d-detail
      .main-container
        .d-editor-box.pos-r.fn-flex
          d-widget-list(ref="widgets" :class="{ 'd-editor-fullscreen': platform.fullscreen }")
          d-editor(ref="kanboardEditor")
        load-mask(:show="querying") {{querying ? '请求模板数据…' : '正在生成快照…'}}
      d-footer
</template>
<script>
	import { loadMask, dFooter, dWidgetList, dEditor, platform, dDetail } from 'eslinkv-npm'

	export default {
		name: 'New',
		provide () {
			return { kanboardEditor: this.$refs.kanboardEditor }
		},
		components: { loadMask, dFooter, dWidgetList, dEditor, dDetail },
		data () {
			return {
				ready: false,
				querying: false,
				platform: platform.state
			}
		},
	}
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
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
		padding: 0 !important;
	}

	.main-container {
		width: 100%;
		height: calc(100% - 92px);
		background-color: #fff;
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
		margin: 13px 0;
		border-bottom: 1px dashed #414141;
		opacity: 0.4;
	}

	#kanban:-webkit-full-screen {
		width: 100%;
		height: 100%;
	}
</style>

