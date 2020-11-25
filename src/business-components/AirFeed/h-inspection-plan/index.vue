<template>
	<div class="widget-part" :style="styles" v-if="data">
    <div class="num font-num">{{ data.value }}</div>
    <div class="num-desc">{{ config.config.desc }}</div>
	</div>
</template>
<script>
import mixins from '../../mixins';
import {getInput} from "@lib/views/core/widgets/parts/lib/config-tools";

const config = {
  animation: true,
  config: {
    desc: true
  },
};
const value = {
	api: {
		data: JSON.stringify({
			value: 320
		})
	},
  config: {
    desc: '计划巡检(件)'
  }
}
const configSource = {
  config: {
    fields: {
      desc: getInput('desc', '描述')
    }
  },
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
.num{
  font-weight: bold;
  font-size: 32px;
  line-height: 32px;
  color: #FFFFFF;
  text-align: left;
  margin-bottom: 8px;
}
.num-desc {
  font-size: 20px;
  line-height: 24px;
  text-align: left;
  color: #00DDFF;
}
</style>

