<template>
	<div class="widget-part" :style="styles">
		<div class="chart" :id="id"></div>
	</div>
</template>
<script>
	import mixins from '../../mixins';
	import getOption from './options'
	import {getInput} from '../../../../lib';

	const configSource = {
		config: {
			fields: {
        legend1: getInput('legend1', '折现1名称'),
        legend2: getInput('legend2', '折现2名称'),
        legend3: getInput('legend3', '折现3名称'),
        unit1: getInput('unit1', '左侧y轴单位'),
        unit2: getInput('unit2', '右侧y轴单位')
			}
		}
	}

	const config = {
		animation: true,
		config: {
      legend1: true,
      legend2: true,
      legend3: true,
      unit1: true,
      unit2: true
		}
	}
	const value = {
		api: {
			data: JSON.stringify({
        yValue1: [120, 200, 150, 80, 70, 110, 130],
        yValue2: [130, 400, 170, 100, 100, 110, 130],
        yValue3: [1, 2, 3, 6, 5, 4, 2],
        xValue: ['5月', '6月', '7月', '8月', '9月', '10月', '11月'],
			})
		},
		config: {
      legend1: '供气量',
      legend2: '销气量',
      legend3: '供销差率',
      unit1: '万m³',
      unit2: '%'
		}
	}
	export default {
		mixins: [mixins],
		computed: {},
		methods: {
			setOption() {
				this.instance && this.instance.setOption(getOption(this.data, this.config.config))
			}
		},
		watch: {
			data: {
				handler(val) {
					if (this.id) {
						this.$nextTick(() => {
							this.instance = echarts.init(document.getElementById(this.id))
							this.setOption(val)
						})
					}
				},
				deep: true,
				immediate: true
			}
		},
		created() {
			this.configSource = this.parseConfigSource(config, configSource);
			this.configValue = this.parseConfigValue(config, value);
		}
	}
</script>
<style lang="scss" scoped>
	.chart {
		width: 100%;
		height: 100%;
	}
</style>

