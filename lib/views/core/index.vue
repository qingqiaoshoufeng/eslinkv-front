<template>
  <div class="step kanboard-editer-box">
    <widgets v-if="kanboardReady" ref="widgets" :class="{ 'canvas-fullscreen': isFullscreen }" @panel-fixed="handleWidgetsPanelFixed" />
    <kanboard-editor ref="kanboardEditor" @fullscreenchange="handleFullscreenChange" @kanboard-edited="$emit('kanboard-edited')" @kanboard-ready="kanboardReady = true" />
  </div>
</template>
<script>
import widgets from './widgets/widget-list/index'
import kanboardEditor from './kanboard-editor/index'
export default {
  name: 'edit-kanboard',
  provide () {
    return { kanboardEditor: this.$refs.kanboardEditor }
  },
  components: {
    widgets,
    kanboardEditor
  },
  data () {
    return {
      isFullscreen: false,
      kanboardReady: false
    }
  },
  methods: {
    handleWidgetsPanelFixed () {
      this.$refs.kanboardEditor && this.$refs.kanboardEditor.updateSpacing()
    },
    refillConfig (config) {
      if (this.$refs.kanboardEditor) return this.$refs.kanboardEditor.refillConfig(config)
    },
    handleFullscreenChange (status) {
      this.isFullscreen = status
    },
    prepareKanboardData () {
      return this.$refs.kanboardEditor.prepareKanboardData()
    },
    setContentPosition (left = 0, top = 0) {
      this.$refs.kanboardEditor.setContentPosition(left, top)
    }
  }
}
</script>

<style lang="scss" scoped>
  .kanboard-editer-box {
    position: relative;
    display: flex;
    width: 100%;
    height: 100%;
    /deep/ {
      .canvas-fullscreen {
        position: fixed;
      }
      .widgets-panel.fixed + .center {
        width: calc(100% - 428px) !important;
        margin-left: 428px !important;
      }
    }
  }
</style>
