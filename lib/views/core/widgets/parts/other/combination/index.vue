<template>
  <div
    ref="widget"
    :style="wrapperStyle"
    :class="{
      'slide-mode': isSlideMode,
      'inner-editting': innerEditing,
      'wait-for-init': !ready,
      'combination-locked': config.widget && config.widget.locked,
    }"
    class="widget-combination widget-part"
    @click.stop
    @dblclick.stop.prevent="toggleInnerEdit"
  >
    <div
      v-if="head && head.show"
      :style="`
        background-color: ${head.color};
        background-image: url(${head.url});
        ${styleParser({ font: config.layout.font }, time)}
      `"
      class="combination-title"
    >
      {{ head.title }}
      <switcher-bar
        v-if="isSlideMode && switcher.switcherPosition === 'title'"
        :activeId="currentWidgetId"
        :slides="slides"
        :switcher="switcher"
        @toggle="toggleSlide"
      />
    </div>
    <div
      ref="combinationBody"
      :class="{ 'dragging-in': draggingIn }"
      :style="`--transition-duration: ${mergedConfig.slide ? mergedConfig.slide.duration + 'ms' : '0s'}; ${bodyStyle}`"
      class="combination-body"
      @dragenter.stop.prevent="draggingIn = true"
      @dragleave="draggingIn = false"
      @dragover.prevent
      @drop.stop="handleDrop"
      @mousedown.stop
      @contextmenu.stop
    >
      <div v-if="ready" class="children-wrapper">
        <slot></slot>
      </div>
      <div v-if="!childrenIds.length" class="no-item">{{ isSlideMode ? '将小工具拖入此处创建轮播' : '将小工具拖入此处进行组合' }}</div>
      <switcher-bar
        v-if="isSlideMode && switcher.switcherPosition !== 'title'"
        :activeId="currentWidgetId"
        :slides="slides"
        :switcher="switcher"
        @toggle="toggleSlide"
      />
    </div>
  </div>
</template>

<script>
import styleParser from '../../lib/style-parser'
import widgetMixin from '../../lib/widget-mixin'
import widgetSlider from './widget-slider'
import switcherBar from './switcher-bar'

// 组件参数配置
import { localConfigSource, localConfigValue, configParseMap } from './config-source'

export default {
  name: 'widget-combination',
  label: '组合小工具',
  mixins: [widgetMixin, widgetSlider],
  components: {
    switcherBar
  },
  data () {
    return {
      styleParser,
      innerEditing: false,
      draggingIn: false
    }
  },
  methods: {
    toggleInnerEdit () {
      if (this.config.widget.locked) return
      this.innerEditing = true
    },
    handleDrop (e) {
      this.draggingIn = false
      const widgetConfig = e.dataTransfer.getData('widget-config')
      if (!widgetConfig) {
        if (e.dataTransfer.getData('layout-grid')) {
          this.$Message.warning('组合小工具不支持布局格子!')
        }
        return
      }
      this.innerEditing = true
      this.$emit('combination-drop', {
        target: this.config.widget.id,
        widgetConfig,
        e
      })
      this.toggleToNewSlide()
    },
    closeInnerEdit (e) {
      if (!this.innerEditing) return
      const classPath = e.path.map(ele => ele.className).join(',')
      const excludeClass = [
        'config-panel-wrapper',
        'slide-switch',
        'color-input-pop'
      ]
      if (excludeClass.findIndex(c => classPath.indexOf(c) > -1) > -1) return
      this.innerEditing = false
    }
  },
  computed: {
    childrenIds () {
      const config = this.config.config || {}
      const childIds = config.children ? config.children.list : null
      return childIds ? childIds.split(',') : []
    },
    mergedConfig () {
      if (!this.config.config) return {}
      const font = this.config.layout.font
      const option = { ...this.config.config, font }
      return option
    },
    head () {
      return this.mergedConfig.head
    },
    isWidgetLocked () {
      if (this.rightMenuGrid) return this.rightMenuGrid.config.widget.locked
      const id = this.rightMenuBindWidgetId
      return id && this.widgetsAdded[id] && this.widgetsAdded[id].config.widget.locked
    },
    wrapperStyle () {
      const { font, padding, ...styleSet } = this.config.layout
      return styleParser(styleSet, this.time)
    },
    bodyStyle () {
      const { padding } = this.config.layout
      return styleParser({ padding }, this.time)
    }
  },
  watch: {
    innerEditing (value) {
      this.$emit('inner-editting', value)
      this.config.widget.innerEditing = value
      if (!value) {
        this.childrenIds.forEach(id => {
          this.kanboardEditor.deactivateWidget(id)
        })
      }
    },
    'config.layout.size': {
      handler: function () {
        this.kanboardEditor && this.kanboardEditor.updateView()
      },
      deep: true
    }
  },
  created () {
    this.configSource = this.parseConfigSource(configParseMap, localConfigSource)
    this.configValue = this.parseConfigValue(configParseMap, localConfigValue)
  },
  mounted () {
    document.addEventListener('click', this.closeInnerEdit)
    this.$once('hook:beforeDestroy', () => {
      document.removeEventListener('click', this.closeInnerEdit)
    })
  }
}
</script>

<style lang="scss" scoped>
  .widget-combination {
    display: flex;
    flex-direction: column;
  }
  .combination-body {
    position: relative;
    outline: rgba(255, 255, 255, 0.2) dashed 1px;
    outline-offset: -1px;
    flex-grow: 1;
    z-index: 1;
    cursor: auto;
    .children-wrapper {
      position: relative;
      width: 100%;
      height: 100%;
      z-index: 1;
      /deep/ {
        & > .widget-part {
          position: absolute !important;
        }
        & > .vdr-custom-style {
          pointer-events: none;
          & > .widget-part {
            pointer-events: auto;
          }
        }
      }
    }
    &.dragging-in {
      outline: #13e600 dashed 2px !important;
      outline-offset: 0 !important;
      background-color: rgba(255, 255, 255, 0.1);
    }
  }
  .children-wrapper {
    transition: opacity 0.2s;
    opacity: 1;
  }
  .wait-for-init.combination-body {
    .children-wrapper {
      opacity: 0;
    }
  }
  .slide-mode .combination-body {
    .children-wrapper {
      /deep/ {
        & > .vdr-custom-style,
        & > .widget-part {
          width: 100% !important;
          height: 100% !important;
          top: 0 !important;
          left: 0 !important;
          cursor: pointer;
        }
        .group-item {
          opacity: 1;
          transition: opacity var(--transition-duration);
        }
        .slide-hide {
          opacity: 0 !important;
          pointer-events: none !important;
          & > .widget-part {
            pointer-events: none !important;
          }
        }
      }
    }
  }
  .inner-editting {
    pointer-events: none;
    /deep/ .slide-switch {
      // pointer-events: auto;
    }
    .combination-body {
      outline: #38df0e dashed 2px;
      outline-offset: 0;
      pointer-events: auto;
      .children-wrapper {
        & > .vdr-custom-style {
          pointer-events: auto;
        }
      }
    }
  }
  .combination-locked {
    .combination-body {
      outline: none !important;
    }
    .children-wrapper {
      & > .vdr-custom-style {
        outline: none !important;
      }
    }
  }
  .combination-title {
    position: relative;
    display: flex;
    align-items: center;
    padding: 0 0.5em;
    white-space: nowrap;
    z-index: 2;
  }
  .no-item {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #979797;
    font-size: 15px;
  }
</style>
