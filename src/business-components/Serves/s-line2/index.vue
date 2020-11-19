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
    color1: true,
    color2: true,
    lineName1: true,
    lineName2: true,
    unit: true
  },
};
const value = {
	api: {
		data: JSON.stringify({
      xNames: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
      value1: [10, 18, 5, 23, 14, 40, 58, 50, 45, 56, 53, 47, 45, 65, 55, 50],
      value2: [23, 60, 20, 36, 23, 58, 44, 76, 68, 76, 73, 68, 65, 85, 75, 70]
		})
	},
  config: {
	  color1: '#2C99FF',
	  color2: '#E5615B',
    lineName1: '今年',
    lineName2: '去年',
    unit: '单'
  }
}
const configSource = {
  config: {
    fields: {
      color1: getInput('color1', '折线1颜色'),
      color2: getInput('color2', '折线2颜色'),
      lineName1: getInput('lineName1', '折线1名称'),
      lineName2: getInput('lineName2', '折线2名称'),
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
						this.instance = echarts.init(document.getElementById(this.id))
						this.setOption()
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

