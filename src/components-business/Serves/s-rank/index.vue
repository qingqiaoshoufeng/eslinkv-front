<template>
	<div class="widget-part" :style="styles" v-if="data">
		<ul @mouseenter="isStop = true" @mouseleave="isStop = false">
      <li v-for="(k, i) in curr" :key="i">
        <img class="rank-icon" src="./img/rank1.svg" v-if="getIndex(i) === 1">
        <img class="rank-icon" src="./img/rank2.svg" v-else-if="getIndex(i) === 2">
        <img class="rank-icon" src="./img/rank3.svg" v-else-if="getIndex(i) === 3">
        <div class="rank" v-else>{{ getIndex(i) }}</div>
        <div class="txt">{{ k.name }}</div>
        <div class="num font-num">{{ k.num | toThousand }}m³</div>
        <img class="arrow" src="/static/icons/arrow-up.svg" v-if="k.isUp"/>
        <img class="arrow" src="/static/icons/arrow-down.svg" v-else/>
      </li>
    </ul>
	</div>
</template>
<script>
import mixins from '../../../../lib/mixins';
import { value } from './index.component'

const SIZE = 5
export default {
	mixins: [mixins],
  data() {
    return {
      timer: null,
      loop: 0,
      isStop: false
    }
  },
  watch: {
    data: {
      handler(val) {
        clearInterval(this.timer)
		  this.loop = 0
        this.timer = setInterval(() => {
          if (this.isStop) return
          if (this.loop === Math.ceil(val.length / SIZE)- 1) {
            this.loop = 0
          } else {
            this.loop++
          }
        }, 2000)
      },
      deep: true,
      immediate: true
    },
  },
  computed: {
    curr () {
      if (!this.data) return []
      return this.data.slice(this.loop * SIZE, (this.loop + 1) * SIZE)
    }
  },
  methods: {
    getIndex (n) {
      return n + 1 + this.loop * SIZE
    }
  },
	created() {
		this.configValue = this.parseConfigValue(value);
	},
  beforeDestroy() {
    clearInterval(this.timer)
    this.timer = null
  }
};
</script>
<style lang="scss" scoped>
.widget-part {
  padding: 8px 0;
  li {
    display: flex;
    align-items: center;
    padding: 0 20px;
    height: 40px;
    &:nth-child(2n+1){
      background: rgba(0, 87, 169, 0.2);
    }
    .txt {
      width: 290px;
      text-align: left;
      font-size: 18px;
      line-height: 24px;
      color: #FFFFFF;
    }
    .rank-icon {
      width: 24px;
      height: 24px;
      margin-right: 16px;
    }
    .rank {
      width: 18px;
      height: 18px;
      font-size: 16px;
      line-height: 16px;
      color: #FFFFFF;
      border-radius: 50%;
      background: #0057A9;
      margin-left: 4px;
      margin-right: 16px;
    }
    .num {
      min-width: 80px;
      font-weight: bold;
      font-size: 24px;
      line-height: 24px;
      text-align: right;
      color: #FFFFFF;
      margin-right: 16px;
    }
  }
}
</style>

