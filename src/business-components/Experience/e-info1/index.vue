<template>
	<div class="widget-part" :style="styles" v-if="data">
    <div class="desc">{{ config.config.desc }}</div>
    <div class="num">
      {{ data.num }}
      <div class="unit">{{ config.config.unit }}</div>
    </div>
	</div>
</template>
<script>
import mixins from '../../mixins';
import {getInput} from "@lib/views/core/widgets/parts/lib/config-tools";

const config = {
  animation: true,
  config: {
    desc: true,
    unit: true
  },
};
const value = {
	api: {
		data: JSON.stringify({
      num: 2354
    })
	},
  config: {
    desc: '线路累积接待人数',
    unit: '人'
  }
}
const configSource = {
  config: {
    fields: {
      desc: getInput('desc', '描述'),
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
.widget-part {
  display: flex;
  align-items: center;
  .desc {
    width: 192px;
    font-weight: 500;
    font-size: 24px;
    line-height: 34px;
    color: #66E3FD;
  }
  .num {
    display: flex;
    align-items: baseline;
    font-weight: 600;
    font-size: 48px;
    line-height: 67px;
    color: #FEE607;
    margin-left: 6px;
  }
  .unit {
    font-size: 24px;
    line-height: 34px;
    color: #FFFFFF;
    margin-left: 4px;
  }
}
</style>

