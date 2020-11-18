<template>
	<div class="widget-part" :style="styles" v-if="data">
		<div class="chart" :id="id" />
    <div class="dot"></div>
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
    desc1: true,
    desc2: true,
  },
};
const value = {
	api: {
		data: JSON.stringify({
			value1: 534,
      value2: 178
		})
	},
  config: {
    color1: '#00FFCF',
    color2: '#E5615B',
    desc1: '已受理',
    desc2: '已办结',
  }
}
const configSource = {
  config: {
    fields: {
      color1: getInput('color1', '扇形1颜色'),
      color2: getInput('color2', '扇形2颜色'),
      desc1: getInput('desc1', '扇形1名称'),
      desc2: getInput('desc2', '扇形2名称'),
    }
  },
}
export default {
	mixins: [mixins],
	methods: {
		setOption(data) {
			this.instance && this.instance.setOption(getOption(this.data.value1, this.data.value2, this.config.config))
		}
	},
	watch: {
		data: {
			handler(val) {
				if (this.id) {
					const data = { ...val };
					this.$nextTick(() => {
						this.instance = echarts.init(
							document.getElementById(this.id)
						);
						this.setOption(data);
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
  background: url('/static/icons/ellipse-dashed.svg') no-repeat center;
  background-size: 128px 128px;
  position: relative;
}
.dot {
  width: 24px;
  height: 24px;
  background: #687692;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  border-radius: 50%;
  z-index: 1;
}

</style>

