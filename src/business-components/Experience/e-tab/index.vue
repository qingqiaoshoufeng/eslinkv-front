<template>
	<div class="widget-part" :style="styles" v-if="data">
    <div class="item" :class="{active:item.index.indexOf(store.scene.index)!==-1}" @click="switchTab" v-for="item in data?data.value:[]">
      <img src="./img/icon1.svg">
      <span>微信</span>
    </div>
    <div class="item" :class="{active: data.index===index}" @click="switchTab">
      <img src="./img/icon2.svg">
      <span>微博</span>
    </div>
    <div class="item" :class="{active: data.index===index}" @click="switchTab">
      <img src="./img/icon3.svg">
      <span>网站</span>
    </div>
    <div class="item" :class="{active: data.index===index}" @click="switchTab">
      <img src="./img/icon4.svg">
      <span>头条</span>
    </div>
    <div class="item" :class="{active: data.index===index}" @click="switchTab">
      <img src="./img/icon5.svg">
      <span>抖音</span>
    </div>
	</div>
</template>
<script>
import mixins from '../../mixins';
import GoldChart,{store} from '../../../openApi'
const config = {
	animation: true
};
const value = {
	api: {
		data: JSON.stringify({value:[
			{title: '微信', index: ['nn16rowdl5r', 'p2wovclspks'],img:'./img/icon1.svg'},
			{title: '微博', index: ['nn16rowdl5r', 'p2wovclspks'],img:'./img/icon2.svg'},
			{title: '网站', index: ['nn16rowdl5r', 'p2wovclspks'],img:'./img/icon3.svg'},
			{title: '头条', index: ['nn16rowdl5r', 'p2wovclspks'],img:'./img/icon4.svg'},
			{title: '抖音', index: ['nn16rowdl5r', 'p2wovclspks'],img:'./img/icon5.svg'},
		]}),
	}
};
export default {
	mixins: [mixins],
	data() {
		return {
			store
		}
	},
  methods: {
    switchTab (n) {
      this.index!==this.data
		GoldChart.scene.setSceneIndex(index)
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

