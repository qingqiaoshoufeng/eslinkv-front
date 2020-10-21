<template>
  <section>
    <div :style="{ transform: `translateY(${vGuideTop}px)` }" class="vue-ruler-ref-dot-h" />
    <div :style="{ transform: `translateX(${hGuideLeft}px)` }" class="vue-ruler-ref-dot-v" />
    <div class="guides-wrapper" :style="guidesWrapperStyle">
      <div
        v-for="item in guides"
        :title="getTitle(item)"
        :style="{
          ...getLineStyle(item),
          transform: `scale(${item.type === 'v' ? 1 / zoom + ', 1' : '1, ' + 1 / zoom})`,
        }"
        :key="item.id"
        :class="[`vue-ruler-ref-line-${item.type}`, { locked: locked, 'no-pointer': zoom !== 1 || contentMove || locked }]"
        :type="item.type"
        :value="item.value"
        class="guide-line"
        @mousedown="$emit('guide-drag', item, $event)"
        @contextmenu="openGuideMenu(item.id, $event)"
      ></div>
    </div>

    <!-- 右键菜单 -->
    <ul v-show="showGuideMenu" class="guide-right-menu" :style="`left: ${menuLeft}px; top:${menuTop - 10}px`">
      <li @click="$emit('guide-remove', removeId)">删除</li>
    </ul>
  </section>
</template>

<script>
export default {
  name: 'guide',
  props: {
    vGuideTop: Number,
    hGuideLeft: Number,
    contentMove: Boolean,
    locked: Boolean,
    left: Number,
    top: Number,
    contentWidth: Number,
    contentHeight: Number,
    scrollLeft: Number,
    scrollTop: Number,
    guides: {
      type: Array,
      default: () => []
    },
    zoom: Number,
    dragTransition: String
  },
  data () {
    return {
      showGuideMenu: false,
      menuLeft: 0,
      menuTop: 0,
      removeId: null
    }
  },
  computed: {
    guidesWrapperStyle () {
      const style = []
      style.push(`width: ${this.contentWidth}px`)
      style.push(`height: ${this.contentHeight}px`)
      style.push(`transform: translate3d(${this.scrollLeft}px, ${this.scrollTop}px, 0) scale(${this.zoom})`)
      this.dragTransition && style.push(`transition: ${this.dragTransition}`)
      return style.join(';')
    }
  },
  methods: {
    getTitle (item) {
      const type = item.type
      return (type === 'h' ? item.top - 18 : item.left - 18) + 'px'
    },
    getLineStyle ({ type, top, left, site }) {
      const style = {}
      type === 'h' && (style.top = `${top - 18}px`)
      type === 'v' && (style.left = `${left - 18}px`)
      site < 0 && (style.opacity = '0')
      return style
    },
    openGuideMenu (id, e) {
      e.preventDefault()
      e.stopPropagation()
      this.removeId = id
      this.showGuideMenu = true
      this.menuLeft = e.clientX
      this.menuTop = e.clientY
    },
    closeGuideMenu () {
      this.showGuideMenu = false
    }
  },
  mounted () {
    document.addEventListener('click', this.closeGuideMenu)
  },
  beforeDestroy () {
    document.removeEventListener('click', this.closeGuideMenu)
  }
}
</script>

<style lang="scss" scoped>
  .guides-wrapper {
    position: absolute;
    top: 18px;
    left: 18px;
    z-index: 3;
    pointer-events: none;
    overflow: visible;
    transition: transform 0.4s;
  }
  .vue-ruler-ref-line-v,
  .vue-ruler-ref-line-h,
  .vue-ruler-ref-dot-h,
  .vue-ruler-ref-dot-v {
    position: absolute;
    left: 0;
    top: 0;
    pointer-events: auto;
  }
  .vue-ruler-ref-line-v,
  .vue-ruler-ref-line-h {
    transform-origin: left top;
    opacity: 0.5;
    &:hover {
      z-index: 2;
      opacity: 1;
    }
    &:before,
    &:after {
      position: absolute;
      background-color: rgba(0, 255, 255, 0.295);
      content: '';
    }
  }

  .vue-ruler-ref-dot-h,
  .vue-ruler-ref-dot-v {
    z-index: 3;
  }

  .vue-ruler-ref-line-h {
    width: 10000%;
    height: 1px;
    left: -9999px;
    background-color: cyan;
    cursor: row-resize;
    &:hover {
      transform: translateY(0) scale(1, 1) !important;
      &:before {
        width: 100%;
        height: 3px;
        bottom: 1px;
      }
      &:after {
        width: 100%;
        height: 3px;
        top: 1px;
      }
    }
  }

  .vue-ruler-ref-line-v {
    width: 1px;
    height: 10000%;
    top: -9999px;
    background-color: cyan;
    cursor: col-resize;
    &:hover {
      transform: translateX(0) scale(1, 1) !important;
      &:before {
        width: 3px;
        height: 100%;
        right: 1px;
      }
      &:after {
        width: 3px;
        height: 100%;
        left: 1px;
      }
    }
  }

  .vue-ruler-ref-dot-h {
    width: 100%;
    height: 0;
    cursor: n-resize;
    border-top: grey 1px dotted;
    top: 0;
  }

  .vue-ruler-ref-dot-v {
    width: 0;
    height: 100%;
    _height: 9999px;
    border-left: grey 1px dotted;
    left: 0;
  }
  .guide-right-menu {
    position: fixed;
    width: auto;
    background-color: #fff;
    font-size: 12px;
    text-align: left;
    z-index: 900;
    transform: translateX(-100%);

    li {
      list-style: none;
      line-height: 20px;
      padding: 0 15px;
      cursor: pointer;
    }

    li:hover {
      background-color: #dcdcdc;
    }
  }
  .locked {
    opacity: 0.1;
  }
  .no-pointer {
    pointer-events: none;
  }
</style>
