<template>
	<div class="widget-part" :style="styles" v-if="data">
    <div class="item" :class="{active: index === 0}" @click="switchTab(0)">
      <img src="./img/icon1.svg">
      <span>微信</span>
    </div>
    <div class="item" :class="{active: index === 1}" @click="switchTab(1)">
      <img src="./img/icon2.svg">
      <span>微博</span>
    </div>
    <div class="item" :class="{active: index === 2}" @click="switchTab(2)">
      <img src="./img/icon3.svg">
      <span>网站</span>
    </div>
    <div class="item" :class="{active: index === 3}" @click="switchTab(3)">
      <img src="./img/icon4.svg">
      <span>头条</span>
    </div>
    <div class="item" :class="{active: index === 4}" @click="switchTab(4)">
      <img src="./img/icon5.svg">
      <span>抖音</span>
    </div>
	</div>
</template>
<script>
import mixins from '../../mixins';

const config = {
	animation: true
};
const value = {
	api: {
		data: JSON.stringify({}),
	}
};
export default {
	mixins: [mixins],
  data () {
	  return {
	    index: 0
    }
  },
  methods: {
    switchTab (n) {
      this.index = n
    }
  },
	created() {
		this.configSource = this.parseConfigSource(config);
		this.configValue = this.parseConfigValue(config, value);
	},
};
</script>
<style lang="scss" scoped>
.widget-part {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .item {
    width: 198px;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 600;
    font-size: 24px;
    line-height: 24px;
    color: #FFFFFF;
    &.active {
      border-top: 2px solid #00DDFF;
      background: linear-gradient(180deg, rgba(0, 87, 169, 0) 0%, rgba(0, 87, 169, 0.5) 100%);
    }
    >img {
      width: 48px;
      height: 48px;
      margin-right: 16px;
    }
  }
}
</style>

