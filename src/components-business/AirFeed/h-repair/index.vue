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
	import { config, configSource, value } from './index.component'

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
			
			this.configValue = this.parseConfigValue(value);
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
			color: #fff;
		}

		.num {
			font-weight: bold;
			font-size: 40px;
			line-height: 48px;
			text-align: center;
			color: #00FFCF;
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

