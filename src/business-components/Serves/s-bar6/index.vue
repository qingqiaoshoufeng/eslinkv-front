<template>
	<div class="widget-part" :style="styles" v-if="data">
		<div class="chart" :id="id"/>
	</div>
</template>
<script>
	import mixins from '../../mixins';
	import getOption from './options';
	import {getInput} from "@lib";

	const config = {
		animation: true,
		config: {
			color1: true,
			color2: true,
			color3: true,
			desc1: true,
			desc2: true,
			desc3: true,
      unit: true,
		},
	};
	const value = {
		api: {
			data: JSON.stringify([
        {
          x: '05月',
          a: 30,
          b: 40,
          c: 10
        },
        {
          x: '06月',
          a: 15,
          b: 18,
          c: 5
        },
        {
          x: '07月',
          a: 35,
          b: 42,
          c: 10
        },
        {
          x: '08月',
          a: 10,
          b: 11,
          c: 4
        },
        {
          x: '08月',
          a: 25,
          b: 26,
          c: 12
        },
        {
          x: '10月',
          a: 28,
          b: 35,
          c: 16
        },
      ])
		},
		config: {
			color1: '#2194FF',
			color2: '#00FFCF',
			color3: '#E5615B',
			desc1: '申请数量',
			desc2: '审核通过',
			desc3: '待审核',
      unit: '单',
		}
	}
	const configSource = {
		config: {
			fields: {
				color1: getInput('color1', '颜色1'),
				color2: getInput('color2', '颜色2'),
				color3: getInput('color2', '颜色3'),
				desc1: getInput('desc1', '名称1'),
				desc2: getInput('desc2', '名称2'),
				desc3: getInput('desc3', '名称3'),
				unit: getInput('unit', '单位'),
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
		position: relative;
	}
</style>

