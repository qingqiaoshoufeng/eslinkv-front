<template>
	<div class="widget-part" :style="styles" v-if="data">
    <div class="color"></div>
    <div class="title">{{ config.config.title }}</div>
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
		data: JSON.stringify({})
	},
  config: {
    title: '供气量日趋势'
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
  .color {
    width: 6px;
    height: 28px;
    transform: skewY(30deg);
    background: #00DDFF;
    margin-right: 8px;
  }
  .title {
    font-weight: 600;
    font-size: 24px;
    color: #FFFFFF;
  }
}
</style>

