<template>
  <div
    class="load-mask"
    :style="`background-color: ${backgroundColor}; color: ${color}; font-size: ${fontSize}`"
  >
    <img src="static/images/loading.svg" :width="iconSize"/>
    <slot>{{ text }}</slot>
  </div>
</template>
<script>
  /**
   * @description loading 面板
   *
   * todo
   * 借助 vue transition 动画 集成到该组件中
   * v-if  transition name="fade"
   * 外部 props 控制内部 v-if  v-if外包一层 transition
   *
   */
  export default {
    name: 'load-mask',
    props: {
      backgroundColor: {
        default: 'rgba(0, 0, 0, 0.6)'
      },
      color: {
        default: '#e2e2e2'
      },
      fontSize: {
        default: '1.5em'
      },
      iconSize: {
        default: 48
      },
      text: {
        default: '请稍后…'
      }
    }
  }
</script>
<style lang="scss">
  .load-mask {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    line-height: 3;
    justify-content: center;
    align-items: center;
    z-index: 999999;
  }
</style>
