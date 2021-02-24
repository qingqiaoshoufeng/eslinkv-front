<template>
	<div class="widget-part" :style="styles" v-if="data">
    <div class="title">{{ config.config.title }}</div>
    <div class="num font-num" :style="{color: config.config.numColor}">{{ data.num }}</div>
	</div>
</template>
<script>
import mixins from '../../../../lib/mixins';
import { config, value } from './index.component'

export default {
	mixins: [mixins],
	created() {
		this.configValue = this.parseConfigValue(value);
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

