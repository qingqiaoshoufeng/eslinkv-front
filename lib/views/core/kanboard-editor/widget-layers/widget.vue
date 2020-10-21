<template functional>
  <div
    :class="{ active: props.active, 'combination-widget': props.children }"
    class="widget"
    @dblclick="!props.locked && !props.hide && parent.$emit('active-widget', { id: props.id, type: props.type })"
    @mouseenter="parent.$emit('hover-widget', props.id)"
    @mouseleave="parent.$emit('hover-widget', null)"
  >
    <header class="title-state">
      <div class="left actions">
        <Icon
          :type="`md-eye${props.hide ? '-off' : ''}`"
          :title="!props.hide ? '隐藏' : '显示'"
          :class="{ 'widget-hide': props.hide }"
          class="icon-button header-action"
          @click="parent.$emit('hide-widget', props.id)"
        />
        <Icon
          :type="`md-${props.locked ? '' : 'un'}lock`"
          :title="!props.locked ? '锁定' : '解锁'"
          :class="{ locked: props.locked }"
          class="icon-button header-action"
          @click="parent.$emit('lock-widget', props.id)"
        />
        <Icon type="md-trash" class="icon-button remove header-action" title="删除" @click="parent.$emit('delete-widget', props.id)" />
      </div>
      <div class="widget-type">{{props.typeDes}}</div>
      <div class="right z-index-editor header-action">
        <Icon
          :class="{ disabled: props.zIndex < 1 }"
          class="icon-button"
          type="md-arrow-dropdown-circle"
          title="置底"
          @click="parent.$emit('update-widget-z-index', { id: props.id, value: 'bottom' })"
        />
        <Icon
          :class="{ disabled: props.zIndex < 1 }"
          class="icon-button"
          type="md-remove-circle"
          title="下移一层"
          @click="parent.$emit('update-widget-z-index', { id: props.id, value: -1 })"
        />
        <span class="z-index">{{ props.zIndex }}</span>
        <Icon class="icon-button" type="md-add-circle" title="上移一层" @click="parent.$emit('update-widget-z-index', { id: props.id, value: 1 })" />
        <Icon class="icon-button" type="md-arrow-dropup-circle" title="置顶" @click="parent.$emit('update-widget-z-index', { id: props.id, value: 'top' })" />
      </div>
    </header>
    <div class="info">
      <input
        type="text"
        :value="props.name || '未命名'"
        class="widget-name"
        @change="parent.$emit('update-widget-name', { id: props.id, name: $event.target.value })"
      />
      <span class="widget-id">ID: {{ props.id }}</span>
    </div>
    <div class="children-widgets" @dblclick.stop>
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .widget {
    position: relative;
    line-height: 2;
    background-color: #f6f6f6;
    margin-bottom: 10px;
    outline-offset: 1px;
    border: #e2e2e2 solid 1px;
    letter-spacing: 0;
    &:hover {
      outline: #91c7ff 1px solid;
      & > .title-state {
        opacity: 1;
      }
    }
    &.active {
      outline: #00fde8 2px solid;
    }
    .title-state,
    .info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 10px;
      line-height: 2;
    }
    .info {
      padding: 5px 10px;
      line-height: 1.5;
    }
    .title-state {
      padding: 0 2px;
      height: 24px;
      background-color: white;
      justify-content: space-between;
      opacity: 0.75;
      .header-action {
        padding: 0 3px;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 20px;
        background-color: white;
        &:hover {
          background-color: #e4f1ff;
        }
      }
      .z-index-editor {
        display: flex;
        flex-grow: 0;
        align-items: center;
      }
      .icon-button {
        cursor: pointer;
        font-size: 16px;
        opacity: 0.8;
        transition: 0.2s;
        &:hover {
          opacity: 1;
          color: #57a3f3;
        }
        &.remove:hover {
          color: #ff4444;
        }
        &.widget-hide,
        &.locked {
          color: #969608;
        }
      }
      .z-index {
        padding: 0 3px;
        font-size: 12px;
      }
      .actions {
        display: flex;
        align-items: center;
      }
    }
    .left {
      padding-right: 15px;
    }
    .widget-id {
      opacity: 0.6;
      white-space: nowrap;
    }
    .name {
      flex-grow: 1;
      display: flex;
      justify-content: space-between;
    }
    .widget-name {
      border: none;
      background-color: transparent;
      margin-left: -5px;
      margin-right: 10px;
      padding: 0 10px 0 5px;
      flex-shrink: 1;
      min-width: 0;
      &:focus {
        outline: #d6d6d6 1px solid;
        outline-offset: 2px;
        background-color: white;
      }
    }
    .children-widgets:not(:empty) {
      position: relative;
      padding: 5px 2px 2px 12px;
      background: #e2e2e2;
      border-top: 2px solid #c2c2c2;
      &:before {
        content: '';
        position: absolute;
        top: 0;
        left: 5px;
        width: 0;
        height: calc(100% - 27px);
        border-left: 1px solid #c2c2c2;
      }
      .widget {
        margin-bottom: 5px;
        &:before {
          content: '';
          position: absolute;
          top: 2px;
          left: -7px;
          bottom: 0;
          margin: auto;
          width: 7px;
          height: 0;
          border-top: 1px solid #c2c2c2;
        }
        &:last-child {
          margin-bottom: 0;
        }
        &:hover {
          outline: #d69eff 1px solid;
        }
        &.active {
          outline: #00fde8 2px solid;
        }
      }
    }
  }
</style>
