<template>
  <div :style="gridsStyle" :class="gridsClass" @dblclick.stop="active('grids')" @contextmenu.stop.prevent>
    <div
      v-for="(grid, index) in grids"
      :key="grid.id"
      :style="`
        margin-${isRow ? 'left' : 'top'}: ${gap}px;
        ${gridStyle[index]}
      `"
      :class="[`grid-${grid.id}`, { active: [dropOverId, activeGridId].includes(grid.id) }, { setting: activeConfigGridId === grid.id }]"
      class="grid"
      @dragenter="handleDragEnter(grid.id)"
      @dragleave="dropOverId = null"
      @dragover.prevent
      @drop.stop="handleDrop($event, grid)"
      @dblclick.stop="active('grid', grid)"
    >
      <template v-for="child in grid.children">
        <parts
          v-if="child.type !== 'layout-grid'"
          :key="child.id"
          :ref="child.id"
          :type="child.type"
          :config="child.config"
          :class="[`widget-${child.id}`, { active: activeGridId === child.id }, { locked: child.config.widget.locked }]"
          :widget-info="`${child.config.widget.id} ${child.config.widget.name || ''}`"
          :draggable="!readonly"
          :readonly="readonly"
          v-on="$listeners"
          @widget-config-update="(data) => $emit('widget-config-update', { data, widget: child })"
          @dblclick.native="!readonly && (() => !child.config.widget.locked && $event.stopPropagation())"
          @click.native.stop="active('grid-widget', child)"
          @contextmenu.native.stop="handleContextMenu($event, child)"
          @mousemove.native.stop
          @dragstart.native.stop="dragstart($event, child, grid.id)"
        ></parts>
        <grid-item
          v-else
          :key="child.id"
          :draggable="!readonly"
          :readonly="readonly"
          :dragging="draggingId === child.id"
          v-bind="child"
          v-on="$listeners"
          @drop-enter-child="dropOverId = null"
          @mousemove.native.stop
          @dragstart.native.stop="dragstart($event, child, grid.id)"
          @dragend.native.stop="draggingId = null"
        />
      </template>
    </div>
    <div v-if="!readonly" class="grid-action">
      <div class="copy" title="复制" @click.stop="handleGridCopy"><Icon type="md-copy" /></div>
      <div class="delete" title="删除" @click.stop="handleGridsDelete"><Icon type="md-close" /></div>
    </div>
  </div>
</template>

<script>
import parts from '../../widgets/parts'
import gridItem from "./grid.vue"
import styleParser from '../../widgets/parts/lib/style-parser'
export default {
  name: 'grid-item',
  components: {
    gridItem,
    parts
  },
  props: {
    id: {
      type: String
    },
    chainedId: {
      type: String
    },
    grids: {
      type: Array,
      default: () => []
    },
    gap: {
      type: Number,
      default: 0
    },
    direction: {
      type: String,
      default: 'row'
    },
    config: {
      type: Object,
      default: null
    },
    readonly: {
      type: Boolean,
      default: false
    },
    dragging: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      dropOverId: null,
      isActive: false,
      activeType: 'grids',
      activeGridId: null,
      activeConfigGridId: null,
      deletingGridId: null,
      draggingId: null,
      time: Date.now()
    }
  },
  computed: {
    isRow () {
      return this.direction == 'row'
    },
    gridsStyle () {
      return `
        padding: ${this.getPadding()};
        ${this.isRow ? 'height' : 'width'}: ${this.gap * 2 + 25}px;
        ${styleParser(this.config, this.time)}
      `
    },
    gridStyle () {
      const ratio = this.config.ratio
      const isRow = this.isRow
      return this.grids.map((grid, index) => {
        const config = grid.config
        const margin = config.margin
        const ratioSize = `${ratio[index] / this.radios * 100}%`
        const marginSize = margin.detail[isRow ? 'left' : 'top'] || margin.value
        const unit = margin.detail[isRow ? 'leftUnit' : 'topUnit'] || margin.unit
        const size = `${isRow ? 'width' : 'height'}: calc(${ratioSize} - ${marginSize || this.gap}${unit || 'px'});`
        return `${size}${styleParser(config, this.time)}`
      })
    },
    gridsClass () {
      const { id, direction, isActive, activeConfigGridId, deletingGridId, dragging } = this
      const classes = [`layout-grid-${direction}`, `layout-grid-${id}`]
      isActive && classes.push('active')
      activeConfigGridId === id && classes.push('setting')
      deletingGridId === id && classes.push('deleting')
      dragging && classes.push('dragging')
      return classes
    },
    radios () {
      return this.config.ratio.reduce((a, b) => a + b, 0)
    }
  },
  methods: {
    getPadding () {
      const gap = this.gap
      const padding = `${gap}px ${gap}px ${gap}px`
      return this.isRow ? padding + ' 0' : '0 ' + padding
    },
    handleDragEnter (id) {
      if (this.readonly) return
      this.dropOverId = id
      this.$emit('drop-enter-child')
    },
    handleDrop (event, { chainedId, id }) {
      if (this.readonly) {
        event.preventDefault()
        return
      }
      this.dropOverId = null
      const widgetConfig = event.dataTransfer.getData('widget-config')
      if (widgetConfig) {
        this.$emit('embed-widget-drop', { data: widgetConfig, chainedId, id })
        return
      }
      const gridItem = event.dataTransfer.getData('grid-item')
      if (gridItem) {
        this.$emit('grid-drag-move', { data: gridItem, chainedId, id })
        return
      }
      const data = event.dataTransfer.getData('layout-grid')
      if (data) {
        this.$emit('embed-drop', { data, chainedId })
      }
    },
    handleContextMenu (event, data) {
      if (this.readonly) return
      this.$emit('contextmenu', { isGridWidget: true, event, data })
    },
    active (type, item) {
      if (this.readonly) return
      const isGrid = ['grids', 'grid'].includes(type)
      const { id, chainedId, config } = item || this
      if (!isGrid && config.widget && config.widget.locked) return
      this.activeConfigGridId = isGrid ? id : null
      if (this.activeType === type && this.activeGridId === id || !config) return
      this.isActive = true
      this.activeType = type
      this.activeGridId = id
      this.$emit('update-config', { config, type: isGrid ? type : item.type, chainedId, id })
    },
    deActive (e) {
      const classPath = e.path.map(ele => ele.className).join(',')
      const excludeClass = [
        'config-panel-wrapper',
        'color-input-pop'
      ]
      if (excludeClass.findIndex(c => classPath.indexOf(c) > -1) > -1) return
      this.isActive = false
      this.activeGridId = null
      this.activeType = 'grids'
      this.activeConfigGridId = null
      this.deletingGridId = null
      this.draggingId = null
    },
    dragstart (e, data, fromId) {
      if (this.readonly) {
        e.preventDefault()
        return
      }
      this.draggingId = data.id
      e.dataTransfer.setData('grid-item', JSON.stringify({ data, fromId }))
    },
    handleGridCopy () {
      this.$emit('copy', this.chainedId)
    },
    handleGridsDelete () {
      this.deletingGridId = this.id
      this.$emit('delete', this.chainedId)
    }
  },
  watch: {
    isActive (value) {
      this.$emit('active-change', value)
    }
  },
  mounted () {
    document.addEventListener('click', this.deActive)
    this.$once('hook:beforeDestroy', () => {
      document.removeEventListener('click', this.deActive)
    })
  }
}
</script>

<style lang="scss" scoped>
  .layout-grid-row,
  .layout-grid-col {
    position: relative;
    outline: rgba(218, 105, 218, 0.2) 1px dashed;
    outline-offset: -1px;
    display: flex;
    .grid {
      outline: #13e60033 1px dashed;
      outline-offset: -1px;
      flex-grow: 0;
      flex-shrink: 0;
      &.active,
      &:hover {
        outline-color: #13e600;
      }
      &:after {
        content: '';
        display: table;
      }
    }
    &:hover {
      outline-color: #e600e6;
      background-color: rgba(0, 0, 0, 0.1);
      & > .grid-action {
        display: flex;
      }
    }
    .grid-action {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      justify-content: space-between;
      display: none;
      font-size: 17px;
      font-family: monospace;
      z-index: 5;
      .delete,
      .copy {
        width: 16px;
        height: 16px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: white;
        border-radius: 2px;
        opacity: 0.5;
        cursor: pointer;
        &:hover {
          opacity: 1;
        }
      }
    }
    &.active {
      cursor: move;
    }
    /deep/ {
      .widget-part:not(.widget-preset-slot) {
        outline: rgba(209, 255, 3, 0.5) 1px dashed;
        outline-offset: -1px;
        &.active {
          outline: rgb(255, 196, 3) 1px dashed;
          cursor: move;
        }
        &:after,
        &:before {
          font-size: 12px;
          line-height: 1;
          font-weight: normal;
          position: absolute;
          letter-spacing: 0;
          font-family: initial;
          text-indent: initial;
          text-decoration: initial;
          white-space: nowrap;
          left: 0;
          top: -14px;
          content: attr(widget-info);
          color: #a9a979;
        }
        &.locked:after {
          left: unset;
          right: -3px;
          content: '\1F512';
          opacity: 0.5;
        }
        &.preview {
          &:after,
          &:before {
            display: none;
          }
        }
        &.locked:hover {
          &:after {
            opacity: 1;
          }
        }
        &.locked,
        &.preview {
          outline: none;
          pointer-events: auto !important;
        }
      }
    }
  }
  .setting,
  .deleting {
    outline-style: solid !important;
    box-shadow: #00000050 0 0 0 3px inset, #ffffff50 0 0 0 5px inset;
    &.deleting {
      outline-color: red;
    }
    & > * {
      opacity: 0.5 !important;
    }
    .grid-action {
      display: flex;
    }
  }
  .dragging {
    & > * {
      opacity: 0.5;
      pointer-events: none;
    }
  }
  .layout-grid-row {
    width: 100%;
    .grid {
      height: 100%;
    }
  }
  .layout-grid-col {
    float: left;
    height: 100%;
    flex-direction: column;
    .grid {
      width: 100%;
    }
  }
</style>
