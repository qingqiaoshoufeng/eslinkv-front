<template>
	<div class="widget-part" :style="styles" v-if="data">
		<div class="num font-num">{{ data.value }}</div>
    <div class="desc">{{ config.config.desc }}</div>
	</div>
</template>
<script>
import mixins from '../../mixins';
import { config, value } from './index.component'

export default {
	mixins: [mixins],
	created() {
		this.configValue = this.parseConfigValue(config, value);
	},
};
</script>
<style lang="scss" scoped>
.widget-part {
  .num {
    font-weight: bold;
    font-size: 48px;
    line-height: 48px;
    text-align: left;
    color: #FFFFFF;
    padding-left: 18px;
  }
  .desc {
    width: 228px;
    height: 32px;
    line-height: 32px;
    background: linear-gradient(90deg, #004D96 0%, rgba(0, 77, 150, 0.3) 100%);
    border-radius: 16px;
    font-size: 24px;
    color: #00DDFF;
    padding-left: 18px;
    text-align: left;
    margin-top: 4px;
  }
}
</style>

