<template>
	<div class="widget-part" :style="styles" v-if="data">
		<div class="flex">
      <img src="./img/notion.svg" alt="">
      <div class="row" :style="{transform: `translateY(${(1 - data.length) * 30}px)`}">
        <div class="item" v-for="(k, i) in data" :key="i">
          <marquee-text class="txt">
            {{ k.txt }}
          </marquee-text>
          <div class="time">{{ k.time }}</div>
        </div>
      </div>
    </div>
	</div>
</template>
<script>
import mixins from 'eslink-npm/mixins';
import MarqueeText from 'vue-marquee-text-component'
import { value } from './index.component'

export default {
	mixins: [mixins],
  components: { MarqueeText },
  methods: {
    getMsg () {
      // todo
      this.data.push({
        txt: '李先生上报亲亲家园小区发, 生燃气泄露事故冯方法。',
        time: '13:24:51'
      })
    }
  },
	created() {
		this.configValue = this.parseConfigValue(value);
	},
};
</script>
<style lang="scss" scoped>
.widget-part {
  background: #001F6D;
  border: 1px solid #00DDFF;
  box-sizing: border-box;
  border-radius: 20px;
  overflow: hidden;
  .flex {
    display: flex;
    align-items: center;
    height: 100%;
    padding: 0 8px;
    img {
      width: 21px;
      height: 17px;
      margin-right: 10px;
    }
    .row {
      flex: 1;
      transition: all 0.4s;
      height: 100%;
      .item {
        height: 100%;
        align-items: center;
        display: flex;
      }
    }
    .txt {
      font-size: 18px;
      color: #FFFFFF;
      width: 342px;
      text-align: left;
      overflow: hidden;
    }
    .time{
      flex: 1;
      font-size: 18px;
      color: rgba(255, 255, 255, 0.75);
      text-align: right;
    }
  }
}
</style>

