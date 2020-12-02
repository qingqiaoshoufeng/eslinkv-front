<template>
	<div class="widget-part" :style="styles" v-if="data">
    <div class="title">{{ config.config.title }}</div>
    <div class="num font-num">{{ data.num }}</div>
	</div>
</template>
<script>
import mixins from '../../mixins';
import {getInput} from "@lib/views/core/widgets/parts/lib/config-tools";

const config = {
  animation: true,
  config: {
    title: true
  },
};
const value = {
	api: {
		data: JSON.stringify({
      num: 0
    })
	},
  config: {
    title: '通讯异常'
  }
}
const configSource = {
  config: {
    fields: {
      title: getInput('title', '标题')
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
  justify-content: space-between;
  background: url("./border.svg") no-repeat;
  background-size: 100% 100%;
  padding: 0 8px;
  .title {
    font-size: 24px;
    line-height: 24px;
    color: #00DDFF;
  }
  .num {
    font-weight: bold;
    font-size: 40px;
    color: #FEFFFF;
  }
}
</style>

