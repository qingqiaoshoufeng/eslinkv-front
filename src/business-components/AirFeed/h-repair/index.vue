<template>
	<div class="widget-part" :style="styles" v-if="data">
		<div class="title">{{ config.config.title }}</div>
		<div class="num font-num">{{ data.num }}</div>
		<div class="chart" :id="id"></div>
		<div class="desc">{{ config.config.desc }}</div>
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
			desc: true
		},
	}
	const value = {
		api: {
			data: JSON.stringify({
				num: 59,
				chartData: [
					{
						x: '2020.1',
						y: 30
					},
					{
						x: '2020.2',
						y: 40
					},
					{
						x: '2020.3',
						y: 46
					},
					{
						x: '2020.4',
						y: 55
					},
					{
						x: '2020.5',
						y: 60
					},
					{
						x: '2020.6',
						y: 76
					},
					{
						x: '2020.7',
						y: 90
					}
				]
			})
		},
		config: {
			title: '近7日抢修数量',
			desc: '近7日趋势'
		}
	}
	const configSource = {
		config: {
			fields: {
				title: getInput('title', '标题'),
				desc: getInput('desc', '底下描述')
			}
		},
	}
	export default {
		mixins: [mixins],
		methods: {
			setOption(data) {
				this.instance && this.instance.setOption(getOption(this.data.chartData))
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
	.widget-part {
		padding: 16px 11px;
		background: linear-gradient(180deg, rgba(0, 87, 169, 0) 0%, rgba(0, 87, 169, 0.5) 100%);

		.title {
			height: 48px;
			font-size: 18px;
			line-height: 24px;
			color: #00FFCF;
		}

		.num {
			font-weight: bold;
			font-size: 40px;
			line-height: 48px;
			text-align: center;
			color: #FEFFFF;
			margin: 6px 0 10px;
		}

		.chart {
			width: 140px;
			height: 42px;
			margin: 0 auto;
		}

		.desc {
			font-size: 18px;
			line-height: 24px;
			text-align: center;
			color: rgba(255, 255, 255, 0.75);
			margin-top: 8px;
		}
	}

</style>

