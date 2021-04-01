<template lang="pug">
  .home-container
    .layout-wrapper
      d-detail
      .main-container(:style="{height: `calc(100% - ${platform.ruler.yRoom}px)`}")
        .d-editor-box.pos-r.fn-flex
          d-widget-list
          d-editor(ref="kanboardEditor")
          d-right-manage
</template>
<script lang="ts">
	import { Vue, Component, Provide } from 'vue-property-decorator'
	import { dWidgetList, dEditor, platform, dDetail, market, dRightManage } from 'eslinkv-sdk'

  @Component({
    components: { dWidgetList, dEditor, dDetail, dRightManage }
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
	}

	::v-deep {
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

