<template>
  <div class="table">
    <ul class="title">
      <li></li>
      <li>隐患排行</li>
      <li>设备类型</li>
      <li>数量(件)</li>
      <li>已处理(件)</li>
      <li>未处理(件)</li>
    </ul>
    <div class="content" v-if="data">
      <vue-seamless-scroll
          :data="data || []"
          class="content-warp"
          :class-option="classOption"
      >
        <ul
            class="content-row"
            v-for="(item, index) in data"
            :key="index"
        >
          <li class="font-num">0{{ index + 1 }}</li>
          <li>{{ item.name }}</li>
          <li>{{ item.type }}</li>
          <li>{{ item.total }}</li>
          <li>{{ item.handled }}</li>
          <li>{{ item.unhandled }}</li>
        </ul>
      </vue-seamless-scroll>
    </div>
  </div>
</template>
<script>
import VueSeamLess from 'vue-seamless-scroll';

export default {
  components: {
    VueSeamLess,
  },
  props: ['data'],
  computed: {
    classOption() {
      return {
        step: 0.2, // 数值越大速度滚动越快
        limitMoveNum: this.data?.length, // 开始无缝滚动的数据量
        hoverStop: true, // 是否开启鼠标悬停stop
        direction: 1, // 0向下 1向上 2向左 3向右
        openWatch: true, // 开启数据实时监控刷新dom
        singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
        singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
        waitTime: 1000, // 单步运动停止的时间(默认值1000ms)
      };
    },
  }
};
</script>
<style lang="scss" scoped>
.table {
  flex: none;
  width: 100%;
  .title {
    width: 100%;
    height: 32px;
    background: rgba(23, 123, 255, 0.2);
    display: flex;
    align-items: center;
    box-sizing: border-box;
    & > li {
      font-size: 18px;
      color: #00CBF4;
      text-align: left;
      margin-right: 24px;
      flex: none;
      &:nth-child(1) {
        width: 24px;
        margin-right: 8px;
      }
      &:nth-child(2) {
        width: 128px;
      }
      &:nth-child(3) {
        width: 128px;
      }
      &:nth-child(4) {
        width: 84px;
      }
      &:nth-child(5) {
        width: 84px;
      }
      &:nth-child(6) {
        width: 84px;
      }
    }
  }
  .content {
    height: 155px;

    .content-warp {
      height: 155px;
      overflow: hidden;
    }
    .content-row {
      height: 24px;
      display: flex;
      align-items: center;
      box-sizing: border-box;
      margin-top: 8px;
      &:nth-child(1)>li:nth-child(1){background: #FF7217;}
      &:nth-child(2)>li:nth-child(1){background: #0057A9;}
      &:nth-child(3)>li:nth-child(1){background: #0057A9;}
      & > li {
        font-size: 18px;
        color: #fff;
        text-align: left;
        margin-right: 24px;
        flex: none;
        &:nth-child(1) {
          width: 24px;
          height: 24px;
          text-align: center;
          line-height: 24px;
          background: rgba(255, 255, 255, 0.2);
          margin-right: 8px;
        }
        &:nth-child(2) {
          width: 128px;
        }
        &:nth-child(3) {
          width: 128px;
        }
        &:nth-child(4) {
          width: 84px;
        }
        &:nth-child(5) {
          width: 84px;
          color: #00FFCF;
        }
        &:nth-child(6) {
          width: 84px;
          color: #FF7217;
        }
      }
    }
  }
}
</style>

