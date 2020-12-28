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
    colors: true,
    unit: true
  },
};
const value = {
	api: {
		data: JSON.stringify([
      {
        name: '低压',
        value: 72
      },
      {
        name: '中压',
        value: 32
      },
      {
        name: '高压',
        value: 12
      },
    ])
	},
  config: {
    colors: ['#00FFCF', '#2194FF', '#E5615B'],
    unit: '件'
  }
}
const configSource = {
  config: {
    fields: {
      colors: getInput('color1', '扇形颜色'),
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
  background: url('/static/images/airfeed/warning.svg') no-repeat center;
  background-size: 64px 64px;
  position: relative;
}

</style>

