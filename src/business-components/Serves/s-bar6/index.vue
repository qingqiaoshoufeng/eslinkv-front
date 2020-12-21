<template>
	<div class="widget-part" :style="styles" v-if="data">
		<div class="chart" :id="id"/>
    <div class="legend">
      <div class="legend-item">
        <div class="color border" :style="{borderColor: config.config.color1}"></div>
        <div class="label">{{ config.config.desc1 }}</div>
      </div>
      <div class="legend-item">
        <div class="color" :style="{backgroundColor: config.config.color2}"></div>
        <div class="label">{{ config.config.desc2 }}</div>
      </div>
      <div class="legend-item">
        <div class="color" :style="{backgroundColor: config.config.color3}"></div>
        <div class="label">{{ config.config.desc3 }}</div>
      </div>
    </div>
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
					a: 50,
					b: 40,
					c: 10
				},
				{
					x: '06月',
					a: 23,
					b: 18,
					c: 5
				},
				{
					x: '07月',
					a: 52,
					b: 42,
					c: 10
				},
				{
					x: '08月',
					a: 15,
					b: 11,
					c: 4
				},
				{
					x: '08月',
					a: 38,
					b: 26,
					c: 12
				},
				{
					x: '10月',
					a: 51,
					b: 35,
					c: 16
				},
			])
		},
		config: {
			color1: '#00DDFF',
			color2: '#00FFCF',
			color3: '#E5615B',
			desc1: '申请数量',
			desc2: '审核通过',
			desc3: '审核未通过',
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
  .legend {
    position: absolute;
    top: 4px;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    .legend-item {
      display: flex;
      align-items: center;
      margin-left: 16px;
      .color {
        width: 16px;
        height: 8px;
        &.border {
          border: 1px solid #ccc;
        }
      }
      .label {
        font-size: 16px;
        margin-left: 4px;
        color: #FFFFFF;
      }
    }
  }
</style>

