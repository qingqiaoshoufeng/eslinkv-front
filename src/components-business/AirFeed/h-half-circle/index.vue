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
    title: true,
    mainColor: true,
    bgColor: true,
    titleColor: true,
    subTitleColor: true,
    pointerColor: true,
  },
};
const value = {
	api: {
		data: JSON.stringify({
      percent: 30
		})
	},
  config: {
    title: '巡检完成率',
    mainColor: '#00DDFF',
    bgColor: 'rgba(0, 87, 169, 0.5)',
    pointerColor: '#00FFCF',
    titleColor: '#fff',
    subTitleColor: '#00DDFF',
  }
}
const configSource = {
  config: {
    fields: {
      title: getInput('title', '标题'),
      mainColor: getInput('mainColor', '环形主颜色'),
      bgColor: getInput('bgColor', '环形背景色'),
      pointerColor: getInput('pointerColor', '圆点颜色'),
      titleColor: getInput('titleColor', '标题颜色（百分比）'),
      subTitleColor: getInput('subTitleColor', '副标题颜色（文字）'),
    }
  },
}
export default {
	mixins: [mixins],
	methods: {
		setOption(data) {
			this.instance && this.instance.setOption(getOption(this.data.percent, this.config.config))
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
  margin: 0 auto;
}
</style>

