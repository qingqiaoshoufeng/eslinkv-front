<template>
	<div class="widget-part" :style="styles" v-if="data">
		<div class="chart" :id="id" />
	</div>
</template>
<script>
import mixins from '../../mixins';
import getOption from './options';
import {getInput} from "@lib/views/core/widgets/parts/lib/config-tools";

const config = {
  animation: true,
  config: {
    unit: true,
  },
};
const value = {
	api: {
		data: JSON.stringify({
      xAxis: ['5月', '6月', '7月', '8月', '9月', '10月'],
      data: [
        ['5月', '100', 15],
        ['5月', '200', 25],
        ['5月', '300', 32],
        ['5月', '400', 25],
        ['6月', '200', 25]
      ]
		})
	},
  config: {
    unit: '万m³'
  }
}
const configSource = {
  config: {
    fields: {
      unit: getInput('unit', '单位')
    }
  },
}
export default {
	mixins: [mixins],
	methods: {
		setOption(data) {
			this.instance && this.instance.setOption(getOption(this.data, this.config.config))
		}
	},
	watch: {
		data: {
			handler(val) {
				if (this.id) {
					this.$nextTick(() => {
						this.instance = echarts.init(
							document.getElementById(this.id)
						);
						this.setOption();
					});
				}
			},
			deep: true,
			immediate: true,
		},
	},
	created() {
		this.configSource = this.parseConfigSource(config, configSource);
		this.configValue = this.parseConfigValue(config, value);
	},
};
</script>
<style lang="scss" scoped>
.chart {
  width: 100%;
	height: 100%;
}

</style>

