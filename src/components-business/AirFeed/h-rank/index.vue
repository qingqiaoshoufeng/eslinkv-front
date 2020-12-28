<template>
	<div class="widget-part" :style="styles" v-if="data">
    <ul>
      <li class="item" v-for="(k, i) in data">
        <div class="flex">
          <div class="rank font-num">{{ i + 1 }}</div>
          <div class="title">{{ k.name }}</div>
        </div>
        <div class="flex">
          <div class="num font-num">{{ k.value }}</div>
          <div class="unit">{{ config.config.unit }}</div>
        </div>
      </li>
    </ul>
	</div>
</template>
<script>
import mixins from '../../mixins';
import {getInput} from "@lib/views/core/widgets/parts/lib/config-tools";

const config = {
  animation: true,
  config: {
    unit: true
  },
};
const value = {
	api: {
		data: JSON.stringify([
      {
        name: '阀门异常',
        value: 47
      },
      {
        name: '压力异常',
        value: 23
      },
      {
        name: '第三方破坏',
        value: 123
      },
      {
        name: '管道破裂',
        value: 43
      },
      {
        name: '燃气泄露',
        value: 66
      },
      {
        name: '爆管',
        value: 85
      }
    ])
	},
  config: {
    unit: '件'
  }
}
const configSource = {
  config: {
    fields: {
      unit: getInput('unit', '单位')
    }
  }
}
export default {
	mixins: [mixins],
	created() {
		this.configSource = this.parseConfigSource(config, configSource);
		this.configValue = this.parseConfigValue(config, value);
	},
};
</script>
<style lang="scss" scoped>
.item{
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 18px;
  line-height: 24px;
  color: #FFFFFF;
  margin-bottom: 10px;
  .flex {
    display: flex;
    .rank {
      width: 24px;
      height: 24px;
      background: rgba(255, 255, 255, 0.2);
      font-weight: bold;
      color: #FFFFFF;
      margin-right: 8px;
    }
    .num {
      font-weight: bold;
      font-size: 24px;
      color: #00DDFF;
      margin-right: 8px;
    }
  }
  &:nth-child(1) .rank{background: #FF7217!important;}
  &:nth-child(2) .rank{background: #0057A9!important;}
  &:nth-child(3) .rank{background: #0057A9!important;}
}
</style>

