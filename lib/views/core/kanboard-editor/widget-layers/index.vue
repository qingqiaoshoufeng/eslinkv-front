<template>
  <div class="widget-layers" @click.stop @keyup.46.stop @mouseleave="$emit('hover-widget', null)">
    <header class="header" @mousemove.stop>
      小工具清单
      <div>
        <Button size="small" type="default" class="import" @click="$emit('import-widgets')">导入小工具</Button>
        <Select v-model="widgetType" size="small" clearable filterable class="filter" style="width: 200px" placeholder="筛选">
          <Option v-for="item in widgetsTypes" :value="item.type" :key="item.type">{{ item.label }}</Option>
        </Select>
      </div>
    </header>
    <div class="widget-list-wrapper">
      <div class="widget-list">
        <template v-if="filteredWidgets.length">
          <widget v-for="widget in filteredWidgets" :key="widget.id" v-bind="widget">
            <template v-if="widget.isCombinationWidget">
              <widget v-for="widget in widget.children" :key="widget.id" v-bind="widget" />
            </template>
          </widget>
        </template>
        <div v-else class="no-item">空空如也</div>
      </div>
    </div>
  </div>
</template>
<script>
import widget from './widget.vue'
import widgetsTypes from '../../widgets/widget-type-list'
export default {
  name: 'widget-layers',
  components: { widget },
  props: {
    widgets: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      widgetsTypes: Object.keys(widgetsTypes).map(type => {
        return {
          type,
          label: widgetsTypes[type]
        }
      }),
      widgetType: null
    }
  },
  computed: {
    filteredWidgets () {
      if (!this.widgetType) return this.widgets
      return this.widgets.filter(widget => {
        if (!widget.children) return widget.type === this.widgetType
        const children = widget.children.filter(widget => widget.type === this.widgetType)
        if (children.length) {
          widget.children = children
          return true
        }
        return false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .widget-layers {
    position: absolute;
    right: 55px;
    top: 34px;
    bottom: 55px;
    width: 360px;
    background-color: white;
    border-radius: 5px;
    filter: drop-shadow(rgba(0, 0, 0, 0.15) 0 5px 5px);
    overflow: hidden;
    z-index: 3;
    letter-spacing: 0;
    .header {
      width: 100%;
      height: 42px;
      line-height: 42px;
      text-align: center;
      font-weight: bold;
      font-size: 14px;
      flex: 0 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 10px;
      border-bottom: 1px solid #e2e2e2;
      .filter {
        max-width: 120px;
        height: 24px;
        /deep/ .ivu-select-selection {
          min-height: 22px;
        }
      }
      .import{
        border-radius: 3px;
        margin-right: 5px;
      }
    }
    .widget-list-wrapper {
      position: relative;
      width: 100%;
      height: calc(100% - 42px);
      &:before,
      &:after {
        position: absolute;
        content: '';
        width: 100%;
        height: 15px;
        z-index: 2;
      }
      &:before {
        top: 0;
        background: linear-gradient(to bottom, white, transparent);
      }
      &:after {
        bottom: 0;
        background: linear-gradient(to top, white, transparent);
      }
    }
    .widget-list {
      width: 100%;
      height: 100%;
      overflow-x: hidden;
      padding: 15px 10px;
      position: relative;
      z-index: 1;
      user-select: none;
    }
    .no-item {
      line-height: 4;
      text-align: center;
      font-size: 15px;
      opacity: 0.5;
    }
  }
</style>
