<template lang="pug">
  .home-container
    .layout-wrapper
      d-detail
      .main-container
        .d-editor-box.pos-r.fn-flex
          d-widget-list(ref="widgets" :class="{ 'd-editor-fullscreen': platform.fullscreen }")
          d-editor(ref="kanboardEditor")
      d-footer
</template>
<script lang="ts">
	import { Vue, Component, Provide } from 'vue-property-decorator'
	import { dFooter, dWidgetList, dEditor, platform, dDetail, market } from 'eslinkv-npm'

  @Component({
    components: { dFooter, dWidgetList, dEditor, dDetail }
  })
	export default class New extends Vue {
    @Provide('kanboardEditor') kanboardEditor = this.$refs.kanboardEditor
    platform= platform.state

    mounted () {
      market()
    }
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
				width: calc(100% - 260px) !important;
				margin-left: 260px !important;
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

