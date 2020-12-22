<template>
	<div class="widget-part" :style="styles" v-if="data">
    <div class="content">
      <span class="num">{{ data.value | toThousand }}</span>
      <span class="unit">{{ config.config.unit }}</span>
    </div>
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
		data: JSON.stringify({
      value: 7632935
    })
	},
  config: {
    unit: 'm³'
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
.content {
  font-weight: bold;
  font-size: 32px;
  line-height: 32px;
  color: #FFFFFF;
  font-family: font-num;
}
</style>

