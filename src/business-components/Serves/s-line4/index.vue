<template>
	<div class="widget-part" :style="styles" v-if="data">
		<div class="chart" :id="id"/>
	</div>
</template>
<script>
	import mixins from '../../mixins';
	import getOption from './options';
  import {getInput, getBooleanInput} from "@lib/views/core/widgets/parts/lib/config-tools";

	const config = {
		animation: true,
    config: {
		  unit: true,
		  lineColor: true,
      scale: true,
		  isShowXAxis: true
    }
	};
	const value = {
		api: {
			data: JSON.stringify([
        {
          x: '13:00',
          y: 8
        },
        {
          x: '14:00',
          y: 12
        },
        {
          x: '15:00',
          y: 22
        },
        {
          x: '16:00',
          y: 32
        },
        {
          x: '17:00',
          y: 25
        },
        {
          x: '18:00',
          y: 29
        },
        {
          x: '19:00',
          y: 32
        },
        {
          x: '20:00',
          y: 15,
        }
      ])
		},
    config: {
		  unit: 'm³',
      lineColor: '#FFDC45',
      lineStopColor: '',
      scale: false,
      isShowXAxis: false
    }
	}
  const configSource = {
    config: {
      fields: {
        unit: getInput('unit', '单位'),
        lineColor: getInput('lineColor', '线条颜色'),
        lineStopColor: getInput('lineStopColor', '渐变后颜色'),
        isShowXAxis: getBooleanInput('isShowXAxis', '显示横坐标'),
        scale: getBooleanInput('scale', '纵坐标是否以0开始'),
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
			this.configSource = this.parseConfigSource(config);
			this.configValue = this.parseConfigValue(config, value);
		},
	};
</script>
<style lang="scss" scoped>
	.chart {
		width: 100%;
		height: 100%;
		position: relative;
	}
</style>

