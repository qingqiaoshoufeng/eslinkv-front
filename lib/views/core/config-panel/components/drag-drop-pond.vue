<template>
  <ul
    :class="{ 'drag-over': dragOver && !itemDragging }"
    class="drag-drop-pond"
    @dragenter.stop="dragOver = true"
    @dragleave.self="dragOver = false"
    @dragover.prevent.stop
    @drop.stop="handleItemDrop"
    @mousedown.stop
    @mousemove.stop
  >
    <template v-if="items.length">
      <li
        v-for="(item, index) in items"
        :key="item.label"
        :title="item.label"
        draggable="true"
        class="item"
        @dragstart.stop="itemDragStart($event, index, item.value)"
        @dragend="itemDragEnd"
      >
        <div class="label">{{ item.label }}</div>
        <div v-if="showDeleteButton" class="delete-item" @click="deleteItem(index)">&#10761;</div>
      </li>
    </template>
    <li v-else class="item no-item">暂无数据</li>
  </ul>
</template>
<script>
import dragDropBus from './bus'
import isJsonEqual from '../is-json-equal'
export default {
  name: 'drag-drop-pond',
  props: {
    value: {
      type: Array,
      default: () => []
    },
    labelKey: {
      type: String,
      default: 'label'
    },
    valueKey: {
      type: String,
      default: '__self'
    },
    removeOnDragOut: {
      type: Boolean,
      default: true
    },
    showDeleteButton: {
      type: Boolean,
      default: false
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      innerValue: [],
      dragOver: false,
      itemDragging: false
    }
  },
  methods: {
    handleItemDrop (e) {
      this.dragOver = false
      if (this.itemDragging) return
      const data = e.dataTransfer.getData('drag-drop-pond-item')
      if (data) {
        const { min, max } = this
        const { pondId: uid, index, value } = JSON.parse(data)
        const isExisting = this.innerValue.find(item => {
          const labelKey = this.labelKey
          return labelKey !== '__self' ? item[labelKey] === value[labelKey] : item === value
        })
        const reachMax = max && this.innerValue.length >= max
        const reachMin = min && this.innerValue.length <= min
        !isExisting && !reachMax && !reachMin && this.innerValue.push(value)
        !isExisting && reachMax && this.$Message.warning(`最多可放入 ${max} 个项目！`)
        !isExisting && reachMin && this.$Message.warning(`至少应保留 ${min} 个项目！`)
        dragDropBus.$emit('drag-drop-pond-item-dropped', { uid, index })
      }
    },
    itemDragStart (e, index, value) {
      this.itemDragging = true
      e.dataTransfer.setData('drag-drop-pond-item', JSON.stringify({ pondId: this._uid, index, value }))
    },
    itemDragEnd (e) {
      this.itemDragging = false
      this.dragOver = false
    },
    removeItem ({ uid, index }) {
      if (!this.removeOnDragOut || this._uid !== uid) return
      this.innerValue.splice(index, 1)
    },
    deleteItem (index) {
      this.innerValue.splice(index, 1)
    }
  },
  computed: {
    items () {
      const { labelKey, valueKey } = this
      return this.innerValue.map(item => {
        return {
          label: labelKey !== '__self' ? item[labelKey] : item,
          value: valueKey !== '__self' ? item[valueKey] : item
        }
      })
    }
  },
  watch: {
    innerValue: {
      handler: function (value) {
        if (isJsonEqual(value, this.value)) return
        this.$emit('input', value)
      },
      deep: true
    },
    value: {
      handler: function (value) {
        if (!value) return
        this.innerValue = [...value]
      },
      immediate: true,
      deep: true
    }
  },
  mounted () {
    dragDropBus.$on('drag-drop-pond-item-dropped', this.removeItem)
    this.$once('hook:beforeDestroy', () => {
      dragDropBus.$off('drag-drop-pond-item-dropped', this.removeItem)
    })
  }
}
</script>

<style lang="scss" scoped>
  .drag-drop-pond {
    padding: 5px 0 0 5px;
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    background-color: rgba(0, 0, 0, 0.025);
    width: calc(100% - 4em - 7px);
    flex-grow: 0;
    &.drag-over {
      outline: blue 1px solid;
      background-color: rgba(0, 0, 0, 0.1);
      .item {
        pointer-events: none;
      }
    }
    .item {
      white-space: nowrap;
      padding: 5px 8px;
      margin: 0 5px 5px 0;
      border-radius: 3px;
      background-color: white;
      border: 1px solid #e2e2e2;
      font-size: 12px;
      flex-grow: 0;
      flex-shrink: 1;
      max-width: calc(100% - 5px);
      display: flex;
      align-items: center;
      cursor: grab;
      .label {
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .delete-item {
        margin-left: 5px;
        cursor: pointer;
      }
      &:hover {
        background-color: #ecf5ff;
      }
      &.no-item {
        background-color: #e9e9e9;
        cursor: unset;
        font-size: 14px;
        pointer-events: none;
      }
    }
  }
</style>
