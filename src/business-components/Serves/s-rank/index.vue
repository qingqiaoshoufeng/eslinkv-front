<template>
	<div class="widget-part" :style="styles" v-if="data">
		<ul>
      <li v-for="(k, i) in data">
        <img class="rank-icon" src="./img/rank1.svg" v-if="i === 0">
        <img class="rank-icon" src="./img/rank2.svg" v-else-if="i === 1">
        <img class="rank-icon" src="./img/rank3.svg" v-else-if="i === 2">
        <div class="rank" v-else>{{ i + 1 }}</div>
        <div class="txt">{{ k.name }}</div>
        <div class="num font-num">{{ k.num.toLocaleString() }}m³</div>
        <img class="arrow" src="./img/arrow-up.svg" v-if="k.isUp"/>
        <img class="arrow" src="./img/arrow-down.svg" v-else/>
      </li>
    </ul>
	</div>
</template>
<script>
import mixins from '../../mixins';
import { getInput } from '../../../../lib';

const config = {
	animation: true
};
const value = {
	api: {
		data: JSON.stringify([
      {
        name: '康生医药制造',
        num: '1659',
        isUp: true
      },
      {
        name: '钛力德金属加工有限公司',
        num: '1232',
        isUp: true
      },
      {
        name: '耐火材料厂',
        num: '985',
        isUp: false
      },
      {
        name: '同盛食品有限公司',
        num: '857',
        isUp: true
      },
      {
        name: '余明机械制造有限公司',
        num: '783',
        isUp: true
      }
    ])
	}
};
export default {
	mixins: [mixins],
	created() {
		this.configSource = this.parseConfigSource(config);
		this.configValue = this.parseConfigValue(config, value);
	},
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
      width: 80px;
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

