<template>
  <div v-if="switcher && switcher.showSwitcher" :class="{ absolute: switcher.switcherPosition !== 'title' }" class="switcher slide-switch" @click.stop>
    <ul
      v-if="switchMode"
      :style="`justify-content: ${switcher.align}`"
      :class="[`align-${switcher.switcherPosition}`, { 'dot-mode': dotMode }]"
      class="slide-switch-ul"
    >
      <li
        v-for="slide in slides"
        :key="slide.id"
        :class="{ 'dot-mode': dotMode, active: slide.id === activeId }"
        :style="{
          'background-color': switcher.backgroundColor,
          color: switcher.color,
          '--background-color': switcher.backgroundColor,
          '--active-background-color': switcher.activeBackgroundColor,
          '--active-color': switcher.activeColor,
        }"
        class="slide-button"
        @click="$emit('toggle', slide.id)"
        @mousedown.stop
        @mouseup.stop
      >
        <span class="switch-text">{{ slide.title || '未命名' }}</span>
      </li>
    </ul>
    <dropdown
      v-if="dropdownMode"
      :options="options"
      :backgroundColor="switcher.backgroundColor"
      :activeBackgroundColor="switcher.activeBackgroundColor"
      :value="activeId"
      class="dropdown-switch"
      @input="handleDropdownToggle"
    />
  </div>
</template>
<script>
import dropdown from './dropdown.vue'
export default {
  name: 'switcher',
  components: {
    dropdown
  },
  props: {
    switcher: {
      type: Object,
      default: null
    },
    activeId: {
      type: String,
      default: null
    },
    slides: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    handleDropdownToggle (id) {
      this.$emit('toggle', id)
    }
  },
  computed: {
    dropdownMode () {
      const switcher = this.switcher
      return switcher.switcherMode === 'dropdown'
    },
    switchMode () {
      const switcher = this.switcher
      return switcher.switcherMode === 'button'
    },
    dotMode () {
      const switcher = this.switcher
      return switcher.switcherMode === 'button' && !switcher.showText
    },
    options () {
      return this.slides.map(({ title, id }) => {
        return {
          label: title,
          value: id
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .slide-switch {
    position: relative;
    width: 100%;
    height: 100%;
    z-index: 2;
    text-align: right;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    pointer-events: none;
    &.absolute {
      position: absolute;
      left: 0;
      top: 0;
      z-index: 2;
    }
    .slide-switch-ul {
      position: absolute;
      padding: 0;
      display: flex;
      flex-grow: 1;
      align-items: center;
      pointer-events: none;
      &.align-title {
        position: relative;
        height: 100%;
      }
      &:not(.dot-mode) {
        padding-right: 0.5em;
      }
      &:not(.aligin-title) {
        padding-right: 0;
      }
    }
    .slide-button {
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.3s cubic-bezier(0.5, -0.5, 0.5, 1.5);
      pointer-events: auto;
      &:not(.dot-mode) {
        height: 20px;
        &:first-child {
          border-radius: 5px 0 0 5px;
        }
        &:last-child {
          border-radius: 0 5px 5px 0;
        }
        .switch-text {
          padding: 0 1em;
        }
      }
      .switch-text {
        padding: 0 12px;
        font-size: 1.4rem;
        font-weight: normal;
      }
      &.dot-mode {
        align-items: flex-start;
        width: 12px !important;
        height: 12px !important;
        border-radius: 50% !important;
        margin-left: 5px;
        border: currentColor 2px solid;
        .switch-text {
          position: relative;
          display: flex;
          padding: 0 12px;
          font-size: 14px;
          height: 20px;
          line-height: 20px;
          background-color: var(--background-color);
          border-radius: 3px;
          opacity: 0;
          transform: translateY(calc(-100% - 5px));
          transition: 0.2s;
          pointer-events: none;
          white-space: nowrap;
          z-index: 99;
          &:before {
            content: '';
            position: absolute;
            bottom: -10px;
            left: 0;
            right: 0;
            margin: auto;
            width: 0;
            height: 0;
            border: transparent 5px solid;
            border-top-color: var(--background-color);
          }
        }
        &:hover {
          .switch-text {
            opacity: 1;
            transform: translateY(calc(-100% - 10px));
          }
        }
        &.active {
          box-shadow: var(--active-color) 0 0 0 1px;
        }
      }
      &.active {
        background-color: var(--active-background-color) !important;
        border-color: var(--active-color) !important;
      }
    }
  }

  .align-top,
  .align-bottom {
    width: 100%;
    height: 30px;
    left: 0;
    .slide-button {
      border-radius: 5px !important;
      margin: 0 4px;
    }
  }
  .align-left,
  .align-right {
    flex-direction: column;
    width: 30px;
    height: 100%;
    top: 0;
    .slide-button {
      border-radius: 5px !important;
      margin: 2px 0;
      width: 20px;
      height: auto !important;
      &:not(.dot-mode) .switch-text {
        width: 100%;
        padding: 8px 3px;
        line-height: 1;
        writing-mode: vertical-lr;
      }
    }
    .dot-mode.slide-button {
      margin: 4px 0;
      align-items: center;
    }
  }
  .align-top {
    top: 0;
  }
  .align-bottom {
    bottom: 0;
  }
  .align-left {
    left: 0;
    .dot-mode.slide-button {
      justify-content: flex-end;
      .switch-text {
        transform: translateX(calc(100% + 5px));
        &:before {
          left: -10px;
          top: 0;
          bottom: 0;
          right: auto;
          border: transparent 5px solid;
          border-right-color: var(--background-color);
        }
      }
      &:hover {
        .switch-text {
          transform: translateX(calc(100% + 10px));
        }
      }
    }
  }
  .align-right {
    right: 0;
    .dot-mode.slide-button {
      justify-content: flex-start;
      .switch-text {
        transform: translateX(calc(-100% - 5px));
        &:before {
          right: -10px;
          top: 0;
          bottom: 0;
          left: auto;
          border: transparent 5px solid;
          border-left-color: var(--background-color);
        }
      }
      &:hover {
        .switch-text {
          transform: translateX(calc(-100% - 10px));
        }
      }
    }
  }
  .dropdown-switch:not(.dropdown) {
    width: 100%;
    height: 100%;
  }
</style>
